// ========================================
// QUIZ.JS - نظام الاختبارات المعرفية
// ========================================

let quizQuestions = [];
let quizIndex = 0;
let quizCorrect = 0;
let quizWrong = 0;
let quizAnswered = false;
let currentQuizLevel = 'easy';
let currentQuizTopic = 'relation';
let matchingConnections = {};

// ---------- 1. بدء الاختبار ----------
function startKnowledgeQuiz(level, topic = 'relation') {
    currentQuizLevel = level;
    currentQuizTopic = topic;

    const data = (topic === 'immunology') ? immunologyQuizData : quizData;
    quizQuestions = [...data[level]];

    // خلط الأسئلة
    for (let i = quizQuestions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [quizQuestions[i], quizQuestions[j]] = [quizQuestions[j], quizQuestions[i]];
    }

    quizIndex = 0;
    quizCorrect = 0;
    quizWrong = 0;

    navigateTo('quizScreen');
    loadQuizQuestion();
}

// ---------- 2. تحميل السؤال ----------
function loadQuizQuestion() {
    quizAnswered = false;
    matchingConnections = {};

    const q = quizQuestions[quizIndex];
    const total = quizQuestions.length;

    document.getElementById('quizProgress').textContent = `${quizIndex + 1}/${total}`;
    document.getElementById('quizCorrect').textContent = quizCorrect;
    document.getElementById('quizWrong').textContent = quizWrong;
    document.getElementById('quizQuestion').textContent = q.question;

    const container = document.getElementById('quizOptions');
    container.innerHTML = '';
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.gap = '15px';

    // نوع السؤال: QCM أو بدون نوع (سهل)
    if (!q.type || q.type === 'QCM') {
        q.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.textContent = opt;
            btn.onclick = () => checkQuizAnswer(opt, q.answer, btn);
            btn.style.cssText = 'width:100%;padding:18px 25px;background:rgba(255,255,255,0.05);border:2px solid rgba(255,255,255,0.1);border-radius:12px;color:white;font-size:16px;font-weight:600;cursor:pointer;transition:0.3s;text-align:center;font-family:Cairo,sans-serif;';
            btn.onmouseover = () => { if (!quizAnswered) { btn.style.background = 'rgba(99,102,241,0.2)'; btn.style.borderColor = 'var(--primary)'; }};
            btn.onmouseout = () => { if (!quizAnswered) { btn.style.background = 'rgba(255,255,255,0.05)'; btn.style.borderColor = 'rgba(255,255,255,0.1)'; }};
            container.appendChild(btn);
        });
    }
    // نوع السؤال: TrueFalse
    else if (q.type === 'TrueFalse') {
        ['Vrai', 'Faux'].forEach(opt => {
            const btn = document.createElement('button');
            btn.textContent = opt;
            const answerValue = (opt === 'Vrai') ? true : false;
            btn.onclick = () => checkQuizAnswer(answerValue, q.answer, btn);
            btn.style.cssText = 'width:100%;padding:18px 25px;background:rgba(255,255,255,0.05);border:2px solid rgba(255,255,255,0.1);border-radius:12px;color:white;font-size:16px;font-weight:600;cursor:pointer;transition:0.3s;text-align:center;font-family:Cairo,sans-serif;';
            btn.onmouseover = () => { if (!quizAnswered) { btn.style.background = 'rgba(99,102,241,0.2)'; btn.style.borderColor = 'var(--primary)'; }};
            btn.onmouseout = () => { if (!quizAnswered) { btn.style.background = 'rgba(255,255,255,0.05)'; btn.style.borderColor = 'rgba(255,255,255,0.1)'; }};
            container.appendChild(btn);
        });
    }
    // نوع السؤال: Matching (صل بسهم)
    else if (q.type === 'Matching') {
        container.style.display = 'grid';
        container.style.gridTemplateColumns = '1fr 1fr';
        container.style.gap = '15px';

        q.left.forEach(item => {
            const div = document.createElement('div');
            div.textContent = item;
            div.dataset.left = item;
            div.style.cssText = 'padding:15px;background:rgba(59,130,246,0.1);border:2px solid rgba(59,130,246,0.3);border-radius:12px;cursor:pointer;font-weight:600;text-align:center;transition:0.3s;';
            div.onclick = () => selectMatchingItem(div, 'left');
            container.appendChild(div);
        });

        q.right.forEach(item => {
            const div = document.createElement('div');
            div.textContent = item;
            div.dataset.right = item;
            div.className = 'drop-zone';
            div.style.cssText = 'padding:15px;background:rgba(16,185,129,0.1);border:2px solid rgba(16,185,129,0.3);border-radius:12px;cursor:pointer;font-weight:600;text-align:center;transition:0.3s;';
            div.onclick = () => selectMatchingItem(div, 'right');
            container.appendChild(div);
        });

        const submitBtn = document.createElement('button');
        submitBtn.textContent = '✓ تحقق من التطابق';
        submitBtn.className = 'btn btn-primary';
        submitBtn.style.cssText = 'grid-column:1/-1;margin-top:10px;padding:16px;font-size:17px;';
        submitBtn.addEventListener('click', () => {
            if (!quizAnswered) checkMatchingAnswer(q.pairs);
        });
        submitBtn.disabled = true;
        container.appendChild(submitBtn);

        const instruction = document.createElement('div');
        instruction.style.cssText = 'grid-column:1/-1;text-align:center;color:rgba(255,255,255,0.6);font-size:14px;margin-top:15px;padding:12px;background:rgba(99,102,241,0.1);border:1px solid rgba(99,102,241,0.2);border-radius:10px;';
        instruction.innerHTML = '💡 <strong>الطريقة:</strong> اضغط على عنصر من اليسار ثم اضغط على العنصر المناسب في اليمين';
        container.appendChild(instruction);
    }
    // نوع السؤال: Ordering (رتّب)
    else if (q.type === 'Ordering') {
        let orderingSequence = [];
        const items = q.items || q.steps;
        const correctOrder = q.correctOrder || q.steps;

        container.style.display = 'flex';
        container.style.flexDirection = 'column';
        container.style.gap = '12px';

        const shuffledItems = [...items].sort(() => Math.random() - 0.5);

        shuffledItems.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.dataset.item = item;
            itemDiv.className = 'ordering-item';
            itemDiv.style.cssText = 'display:flex;align-items:center;gap:15px;padding:18px 20px;background:rgba(255,255,255,0.05);border:2px solid rgba(255,255,255,0.1);border-radius:12px;cursor:pointer;transition:0.3s;';

            const numberBadge = document.createElement('div');
            numberBadge.className = 'order-number';
            numberBadge.style.cssText = 'min-width:40px;height:40px;display:none;align-items:center;justify-content:center;background:linear-gradient(135deg,#6366f1,#8b5cf6);border-radius:50%;color:white;font-size:20px;font-weight:700;';

            const itemText = document.createElement('span');
            itemText.textContent = item;
            itemText.style.cssText = 'flex:1;color:white;font-size:16px;font-weight:600;';

            function updateOrderNumbers() {
                document.querySelectorAll('.ordering-item').forEach(div => {
                    const divItem = div.dataset.item;
                    const idx = orderingSequence.indexOf(divItem);
                    const badge = div.querySelector('.order-number');
                    if (idx !== -1) {
                        badge.textContent = idx + 1;
                        badge.style.display = 'flex';
                        div.style.background = 'rgba(99,102,241,0.15)';
                        div.style.borderColor = '#6366f1';
                    } else {
                        badge.style.display = 'none';
                        div.style.background = 'rgba(255,255,255,0.05)';
                        div.style.borderColor = 'rgba(255,255,255,0.1)';
                    }
                });
            }

            itemDiv.onclick = () => {
                const currentIndex = orderingSequence.indexOf(item);
                if (currentIndex !== -1) {
                    orderingSequence.splice(currentIndex, 1);
                    updateOrderNumbers();
                } else {
                    orderingSequence.push(item);
                    const orderNum = orderingSequence.length;
                    numberBadge.textContent = orderNum;
                    numberBadge.style.display = 'flex';
                    itemDiv.style.background = 'rgba(99,102,241,0.15)';
                    itemDiv.style.borderColor = '#6366f1';
                }
                const submitBtn = document.getElementById('orderingSubmitBtn');
                if (submitBtn) {
                    if (orderingSequence.length === items.length) {
                        submitBtn.disabled = false;
                        submitBtn.style.opacity = '1';
                        submitBtn.style.cursor = 'pointer';
                        submitBtn.style.background = 'linear-gradient(135deg, #6366f1, #8b5cf6)';
                    } else {
                        submitBtn.disabled = true;
                        submitBtn.style.opacity = '0.5';
                        submitBtn.style.cursor = 'not-allowed';
                        submitBtn.style.background = 'rgba(99,102,241,0.3)';
                    }
                }
            };

            itemDiv.appendChild(numberBadge);
            itemDiv.appendChild(itemText);
            container.appendChild(itemDiv);
        });

        const submitBtn = document.createElement('button');
        submitBtn.id = 'orderingSubmitBtn';
        submitBtn.textContent = '✓ تحقق من الترتيب';
        submitBtn.className = 'btn btn-primary';
        submitBtn.style.cssText = 'margin-top:20px;padding:18px;font-size:18px;font-weight:700;opacity:0.5;background:rgba(99,102,241,0.3);cursor:not-allowed;border:none;color:white;border-radius:12px;transition:0.3s;';
        submitBtn.disabled = true;
        submitBtn.addEventListener('click', function() {
            if (!this.disabled && !quizAnswered) checkOrderingAnswer(correctOrder, orderingSequence);
        });
        container.appendChild(submitBtn);

        const instruction = document.createElement('div');
        instruction.style.cssText = 'text-align:center;color:rgba(255,255,255,0.6);font-size:14px;margin-top:10px;padding:12px;background:rgba(99,102,241,0.1);border:1px solid rgba(99,102,241,0.2);border-radius:10px;';
        instruction.innerHTML = '💡 <strong>الطريقة:</strong> اضغط على العناصر بالترتيب الصحيح (1، 2، 3...)';
        container.appendChild(instruction);
    }
    // نوع السؤال: Labeling (أسماء)
    else if (q.type === 'Labeling') {
        container.style.display = 'flex';
        container.style.flexDirection = 'column';
        container.style.gap = '15px';

        q.elements.forEach((element, index) => {
            const labelDiv = document.createElement('div');
            labelDiv.style.cssText = 'display:flex;flex-direction:column;gap:8px;';

            const label = document.createElement('label');
            label.textContent = `${index + 1}. Élément ${index + 1} :`;
            label.style.cssText = 'color:rgba(255,255,255,0.7);font-size:14px;';

            const input = document.createElement('input');
            input.type = 'text';
            input.placeholder = 'Votre réponse...';
            input.dataset.index = index;
            input.style.cssText = 'padding:12px 18px;background:rgba(255,255,255,0.05);border:2px solid rgba(255,255,255,0.1);border-radius:10px;color:white;font-size:16px;font-family:Cairo,sans-serif;';

            labelDiv.appendChild(label);
            labelDiv.appendChild(input);
            container.appendChild(labelDiv);
        });

        const submitBtn = document.createElement('button');
        submitBtn.textContent = 'تأكيد الإجابات';
        submitBtn.className = 'btn btn-primary';
        submitBtn.style.cssText = 'margin-top:20px;padding:16px;font-size:17px;';
        submitBtn.onclick = () => checkLabelingAnswer(q.elements, q.keywords);
        container.appendChild(submitBtn);
    }
    // نوع السؤال: Mention (اذكر)
    else if (q.type === 'Mention') {
        container.style.display = 'flex';
        container.style.flexDirection = 'column';
        container.style.gap = '15px';

        const textarea = document.createElement('textarea');
        textarea.placeholder = 'اكتب إجابتك هنا... (افصل بين العناصر بفاصلة)';
        textarea.rows = 4;
        textarea.style.cssText = 'padding:15px 20px;background:rgba(255,255,255,0.05);border:2px solid rgba(255,255,255,0.1);border-radius:12px;color:white;font-size:16px;font-family:Cairo,sans-serif;resize:vertical;';
        container.appendChild(textarea);

        const hint = document.createElement('div');
        hint.textContent = `💡 Conseil : Écrivez ${q.requiredCount} éléments séparés par des virgules`;
        hint.style.cssText = 'color:rgba(255,255,255,0.5);font-size:13px;font-style:italic;';
        container.appendChild(hint);

        const submitBtn = document.createElement('button');
        submitBtn.textContent = 'تأكيد الإجابة';
        submitBtn.className = 'btn btn-primary';
        submitBtn.style.cssText = 'margin-top:15px;padding:16px;font-size:17px;';
        submitBtn.onclick = () => checkMentionAnswer(textarea.value, q.keywords, q.requiredCount);
        container.appendChild(submitBtn);
    }
    // نوع السؤال: DirectQuestion (سؤال مباشر)
    else if (q.type === 'DirectQuestion') {
        container.style.display = 'flex';
        container.style.flexDirection = 'column';
        container.style.gap = '15px';

        const textarea = document.createElement('textarea');
        textarea.placeholder = 'اكتب إجابتك هنا...';
        textarea.rows = 6;
        textarea.style.cssText = 'padding:15px 20px;background:rgba(255,255,255,0.05);border:2px solid rgba(255,255,255,0.1);border-radius:12px;color:white;font-size:16px;font-family:Cairo,sans-serif;resize:vertical;line-height:1.6;';
        container.appendChild(textarea);

        const hint = document.createElement('div');
        hint.textContent = '💡 Conseil : Répondez de manière complète en utilisant les termes appropriés';
        hint.style.cssText = 'color:rgba(255,255,255,0.5);font-size:13px;font-style:italic;';
        container.appendChild(hint);

        const submitBtn = document.createElement('button');
        submitBtn.textContent = 'تأكيد الإجابة';
        submitBtn.className = 'btn btn-primary';
        submitBtn.style.cssText = 'margin-top:15px;padding:16px;font-size:17px;';
        submitBtn.onclick = () => checkDirectQuestionAnswer(textarea.value, q.keywords, q.requiredKeywords);
        container.appendChild(submitBtn);
    }

    document.getElementById('quizFeedback').style.display = 'none';
    document.getElementById('quizNextBtn').style.display = 'none';
}

// ---------- 3. فحص الإجابات ----------
let selectedMatchingLeft = null;
let selectedMatchingRight = null;

function selectMatchingItem(element, side) {
    if (quizAnswered) return;
    if (side === 'left') {
        if (selectedMatchingLeft) {
            selectedMatchingLeft.style.borderColor = 'rgba(59,130,246,0.3)';
            selectedMatchingLeft.style.transform = 'scale(1)';
        }
        selectedMatchingLeft = element;
        element.style.borderColor = 'rgba(59,130,246,1)';
        element.style.transform = 'scale(1.05)';
        if (selectedMatchingRight) createMatchingConnection();
    } else {
        if (selectedMatchingRight) {
            selectedMatchingRight.style.borderColor = 'rgba(16,185,129,0.3)';
            selectedMatchingRight.style.transform = 'scale(1)';
        }
        selectedMatchingRight = element;
        element.style.borderColor = 'rgba(16,185,129,1)';
        element.style.transform = 'scale(1.05)';
        if (selectedMatchingLeft) createMatchingConnection();
    }
}

function createMatchingConnection() {
    const leftKey = selectedMatchingLeft.dataset.left;
    const rightValue = selectedMatchingRight.dataset.right;
    matchingConnections[leftKey] = rightValue;
    selectedMatchingLeft.innerHTML = `${selectedMatchingLeft.textContent.replace(' ➡️','')} ➡️`;
    selectedMatchingRight.style.opacity = '0.6';
    selectedMatchingLeft.style.borderColor = 'rgba(59,130,246,0.3)';
    selectedMatchingLeft.style.transform = 'scale(1)';
    selectedMatchingRight.style.borderColor = 'rgba(16,185,129,0.3)';
    selectedMatchingRight.style.transform = 'scale(1)';
    selectedMatchingLeft = null;
    selectedMatchingRight = null;

    // تفعيل زر التحقق
    const container = document.getElementById('quizOptions');
    const submitBtn = container.querySelector('.btn-primary');
    if (submitBtn) submitBtn.disabled = false;
}

function checkMatchingAnswer(correctPairs) {
    if (quizAnswered) return;
    quizAnswered = true;

    let allCorrect = true;
    for (const [left, correctRight] of Object.entries(correctPairs)) {
        if (matchingConnections[left] !== correctRight) { allCorrect = false; break; }
    }

    const container = document.getElementById('quizOptions');
    const dropZones = container.querySelectorAll('.drop-zone');
    dropZones.forEach(zone => {
        const rightValue = zone.dataset.right;
        let connectedLeft = null;
        for (const [left, right] of Object.entries(matchingConnections)) {
            if (right === rightValue) { connectedLeft = left; break; }
        }
        if (connectedLeft) {
            const isCorrect = correctPairs[connectedLeft] === rightValue;
            zone.style.background = isCorrect ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)';
            zone.style.borderColor = isCorrect ? '#10b981' : '#ef4444';
            zone.style.borderWidth = '3px';
        }
    });

    if (allCorrect) {
        quizCorrect++;
        document.getElementById('quizCorrect').textContent = quizCorrect;
        setTimeout(() => showQuizPopup(true, 'إجابة صحيحة'), 500);
    } else {
        quizWrong++;
        document.getElementById('quizWrong').textContent = quizWrong;
        setTimeout(() => showQuizPopup(false, 'إجابة خاطئة'), 2000);
    }
}

function checkQuizAnswer(selected, correct, btn) {
    if (quizAnswered) return;
    quizAnswered = true;
    const isCorrect = selected === correct;

    document.querySelectorAll('#quizOptions button').forEach(opt => {
        opt.style.cursor = 'not-allowed';
        opt.disabled = true;
    });

    if (isCorrect) {
        btn.style.background = 'rgba(16,185,129,0.2)';
        btn.style.borderColor = 'var(--success)';
        btn.innerHTML = '✅ ' + btn.textContent.replace('✅ ', '');
        quizCorrect++;
        document.getElementById('quizCorrect').textContent = quizCorrect;
        setTimeout(() => showQuizPopup(true, 'إجابة صحيحة'), 500);
    } else {
        btn.style.background = 'rgba(239,68,68,0.2)';
        btn.style.borderColor = 'var(--danger)';
        btn.innerHTML = '❌ ' + btn.textContent.replace('❌ ', '');
        document.querySelectorAll('#quizOptions button').forEach(opt => {
            const text = opt.textContent.replace('✅ ', '').replace('❌ ', '');
            if (text === correct || opt.textContent === correct) {
                opt.style.background = 'rgba(16,185,129,0.2)';
                opt.style.borderColor = 'var(--success)';
                opt.innerHTML = '✅ ' + text;
            }
        });
        quizWrong++;
        document.getElementById('quizWrong').textContent = quizWrong;
        setTimeout(() => showQuizPopup(false, 'إجابة خاطئة'), 2000);
    }
    document.getElementById('quizNextBtn').style.display = 'none';
}

function checkOrderingAnswer(correctOrder, userOrder) {
    if (quizAnswered) return;
    quizAnswered = true;

    let allCorrect = userOrder.length === correctOrder.length;
    if (allCorrect) {
        for (let i = 0; i < correctOrder.length; i++) {
            if (userOrder[i] !== correctOrder[i]) { allCorrect = false; break; }
        }
    }

    document.querySelectorAll('.ordering-item').forEach(itemDiv => {
        const item = itemDiv.dataset.item;
        const userIndex = userOrder.indexOf(item);
        const correctIndex = correctOrder.indexOf(item);
        const badge = itemDiv.querySelector('.order-number');

        if (userIndex === correctIndex && userIndex !== -1) {
            itemDiv.style.background = 'rgba(16,185,129,0.2)';
            itemDiv.style.borderColor = '#10b981';
            badge.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        } else {
            itemDiv.style.background = 'rgba(239,68,68,0.2)';
            itemDiv.style.borderColor = '#ef4444';
            badge.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
            if (correctIndex !== -1) {
                badge.textContent = (userIndex + 1) + ' → ' + (correctIndex + 1);
                badge.style.fontSize = '14px';
                badge.style.minWidth = '60px';
            }
        }
        itemDiv.style.cursor = 'not-allowed';
        itemDiv.onclick = null;
    });

    if (allCorrect) {
        quizCorrect++;
        document.getElementById('quizCorrect').textContent = quizCorrect;
        setTimeout(() => showQuizPopup(true, 'إجابة صحيحة'), 500);
    } else {
        quizWrong++;
        document.getElementById('quizWrong').textContent = quizWrong;
        setTimeout(() => showQuizPopup(false, 'إجابة خاطئة'), 2000);
    }
}

function checkLabelingAnswer(correctElements, keywords) {
    quizAnswered = true;
    const inputs = document.getElementById('quizOptions').querySelectorAll('input[type="text"]');
    let correctCount = 0;

    inputs.forEach((input, index) => {
        const userAnswer = input.value.toLowerCase().trim();
        const correctAnswer = correctElements[index].toLowerCase();
        const keyParts = correctAnswer.split(/[\s(),.-]+/).filter(p => p.length > 2);
        const matchedParts = keyParts.filter(part => userAnswer.includes(part));
        const matchedKeywords = keywords.filter(kw => userAnswer.includes(kw.toLowerCase()));
        const isCorrect = matchedParts.length >= Math.ceil(keyParts.length / 2) || matchedKeywords.length > 0;

        if (isCorrect) {
            correctCount++;
            input.style.background = 'rgba(16,185,129,0.2)';
            input.style.borderColor = 'var(--success)';
            input.value = `✅ ${input.value}`;
        } else {
            input.style.background = 'rgba(239,68,68,0.2)';
            input.style.borderColor = 'var(--danger)';
            input.value = `❌ ${input.value} → ${correctElements[index]}`;
        }
        input.disabled = true;
    });

    const allCorrect = correctCount === correctElements.length;
    if (allCorrect) {
        quizCorrect++;
        document.getElementById('quizCorrect').textContent = quizCorrect;
        showFeedback(true, `جميع الإجابات صحيحة! (${correctCount}/${correctElements.length})`);
    } else {
        quizWrong++;
        document.getElementById('quizWrong').textContent = quizWrong;
        showFeedback(false, `${correctCount}/${correctElements.length} صحيحة. الإجابات الصحيحة معروضة`);
    }
    document.getElementById('quizNextBtn').style.display = 'block';
}

function checkMentionAnswer(userAnswer, keywords, requiredCount) {
    quizAnswered = true;
    const normalizedAnswer = userAnswer.toLowerCase().trim();
    const foundKeywords = keywords.filter(kw => normalizedAnswer.includes(kw.toLowerCase()));
    const isCorrect = foundKeywords.length >= requiredCount;

    if (isCorrect) {
        quizCorrect++;
        document.getElementById('quizCorrect').textContent = quizCorrect;
        showFeedback(true, `وجدنا ${foundKeywords.length} عناصر صحيحة! (${foundKeywords.join(', ')})`);
    } else {
        quizWrong++;
        document.getElementById('quizWrong').textContent = quizWrong;
        showFeedback(false, `وجدنا ${foundKeywords.length}/${requiredCount} فقط. من الكلمات الصحيحة: ${keywords.slice(0, requiredCount).join(', ')}`);
    }
    document.getElementById('quizNextBtn').style.display = 'block';
}

function checkDirectQuestionAnswer(userAnswer, keywords, requiredKeywords) {
    quizAnswered = true;
    const normalizedAnswer = userAnswer.toLowerCase().trim();
    const foundKeywords = keywords.filter(kw => normalizedAnswer.includes(kw.toLowerCase()));
    const isCorrect = foundKeywords.length >= requiredKeywords;

    if (isCorrect) {
        quizCorrect++;
        document.getElementById('quizCorrect').textContent = quizCorrect;
        showFeedback(true, `إجابة جيدة! وجدنا ${foundKeywords.length} مفاهيم أساسية صحيحة`);
    } else {
        quizWrong++;
        document.getElementById('quizWrong').textContent = quizWrong;
        showFeedback(false, `الإجابة تحتاج المزيد من التفاصيل. يجب ذكر مفاهيم مثل: ${keywords.slice(0, requiredKeywords).join(', ')}`);
    }
    document.getElementById('quizNextBtn').style.display = 'block';
}

// ---------- 4. التقدم في الاختبار ----------
function showQuizPopup(isCorrect, title) {
    const overlay = document.createElement('div');
    overlay.id = 'quizPopupOverlay';
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.7);backdrop-filter:blur(5px);display:flex;align-items:center;justify-content:center;z-index:10000;';

    const popup = document.createElement('div');
    const borderColor = isCorrect ? '#10b981' : '#ef4444';
    const icon = isCorrect ? '✅' : '❌';
    popup.style.cssText = `background:linear-gradient(135deg,rgba(15,23,42,0.98),rgba(30,41,59,0.98));border:2px solid ${borderColor};border-radius:20px;padding:35px 45px;max-width:400px;width:90%;text-align:center;animation:popIn 0.4s cubic-bezier(0.68,-0.55,0.265,1.55);`;
    popup.innerHTML = `
        <div style="font-size:60px;margin-bottom:15px;">${icon}</div>
        <div style="font-size:24px;font-weight:700;color:white;margin-bottom:25px;">${title}</div>
        <button onclick="closeQuizPopup()" class="btn btn-primary" style="width:100%;padding:16px;font-size:18px;font-weight:700;">التالي →</button>
    `;

    overlay.appendChild(popup);
    document.body.appendChild(overlay);
}

function closeQuizPopup() {
    const overlay = document.getElementById('quizPopupOverlay');
    if (overlay) overlay.remove();
    nextQuizQuestion();
}

function nextQuizQuestion() {
    quizIndex++;
    if (quizIndex >= quizQuestions.length) { finishQuiz(); }
    else { loadQuizQuestion(); }
}

function finishQuiz() {
    const totalQuestions = quizQuestions.length;
    let requiredScore, nextLevel, nextLevelName;

    if (currentQuizLevel === 'easy') {
        requiredScore = 15; nextLevel = 'medium'; nextLevelName = 'المستوى المتوسط';
    } else if (currentQuizLevel === 'medium') {
        requiredScore = 25; nextLevel = 'hard'; nextLevelName = 'المستوى الصعب';
    } else {
        requiredScore = 35; nextLevel = null; nextLevelName = null;
    }

    const passed = quizCorrect >= requiredScore;
    const savedScore = localStorage.getItem(`quiz_${currentQuizLevel}_best`) || 0;
    if (quizCorrect > savedScore) localStorage.setItem(`quiz_${currentQuizLevel}_best`, quizCorrect);
    if (passed && nextLevel) localStorage.setItem(`quiz_${nextLevel}_unlocked`, 'true');

    trackActivity('Tests de connaissances', currentQuizLevel, `${quizCorrect}/${totalQuestions} - ${passed ? 'Réussi' : 'Échoué'}`);
    showQuizResultPopup(passed, quizCorrect, totalQuestions, requiredScore, nextLevel, nextLevelName);
}

function showQuizResultPopup(passed, correct, total, required, nextLevel, nextLevelName) {
    const overlay = document.createElement('div');
    overlay.id = 'quizResultOverlay';
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.85);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;z-index:10000;';

    const card = document.createElement('div');
    card.style.cssText = `background:linear-gradient(135deg,rgba(15,23,42,0.98),rgba(30,41,59,0.98));border:2px solid ${passed ? '#10b981' : '#ef4444'};border-radius:24px;padding:45px;max-width:450px;width:90%;text-align:center;`;

    if (passed) {
        const message = nextLevel ? `🎉 تم فتح ${nextLevelName}!` : '🏆 أكملت جميع المستويات!';
        card.innerHTML = `
            <div style="font-size:80px;margin-bottom:20px;">✅</div>
            <div style="font-size:32px;font-weight:800;color:#10b981;margin-bottom:15px;">نجحت!</div>
            <div style="font-size:20px;color:white;margin-bottom:10px;">النتيجة: ${correct}/${total}</div>
            <div style="font-size:16px;color:rgba(255,255,255,0.7);margin-bottom:30px;">${message}</div>
            <button onclick="closeQuizResult()" class="btn btn-primary" style="width:100%;padding:18px;font-size:18px;font-weight:700;">العودة للاختبارات</button>
        `;
    } else {
        card.innerHTML = `
            <div style="font-size:80px;margin-bottom:20px;">😞</div>
            <div style="font-size:32px;font-weight:800;color:#ef4444;margin-bottom:15px;">للأسف!</div>
            <div style="font-size:20px;color:white;margin-bottom:10px;">النتيجة: ${correct}/${total}</div>
            <div style="font-size:16px;color:rgba(255,255,255,0.7);margin-bottom:30px;">تحتاج ${required}+ للنجاح</div>
            <button onclick="retryQuiz()" class="btn btn-primary" style="width:100%;padding:18px;font-size:18px;font-weight:700;margin-bottom:12px;">🔄 حاول مرة أخرى</button>
            <button onclick="closeQuizResult()" class="btn" style="width:100%;padding:18px;font-size:16px;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);color:white;border-radius:12px;">العودة</button>
        `;
    }

    overlay.appendChild(card);
    document.body.appendChild(overlay);
}

function closeQuizResult() {
    const overlay = document.getElementById('quizResultOverlay');
    if (overlay) overlay.remove();
    navigateTo('quizRelation');
}

function retryQuiz() {
    const overlay = document.getElementById('quizResultOverlay');
    if (overlay) overlay.remove();
    startKnowledgeQuiz(currentQuizLevel, currentQuizTopic);
}
