// ========================================
// GAME.JS - اللعبة التعليمية
// ========================================

let timerInterval;

// ---------- 1. عرض المستويات ----------
function renderLevels() {
    const progress = loadProgress();
    const container = document.getElementById('levelsGrid');
    container.innerHTML = '';

    levelsData.forEach((_, index) => {
        const levelNum = index + 1;
        const isUnlocked = levelNum <= progress.unlockedLevels;
        const stars = progress.levelStars[levelNum] || 0;

        const card = document.createElement('div');
        card.className = `level-card ${isUnlocked ? '' : 'locked'}`;

        if (isUnlocked) {
            card.onclick = () => startLevel(index);
        } else {
            card.onclick = () => {
                alert(`🔒 المستوى ${levelNum} مقفل!\n\nأكمل المستوى ${levelNum - 1} أولاً لفتح هذا المستوى.`);
            };
        }

        card.innerHTML = `
            ${!isUnlocked ? '<div class="level-lock">🔒</div>' : ''}
            <div class="level-number">${levelNum}</div>
            <div class="level-label">المستوى ${levelNum}</div>
            ${stars > 0 ? `<div class="level-stars">${'⭐'.repeat(stars)}</div>` : ''}
            ${!isUnlocked ? '<div style="font-size:12px;color:rgba(255,255,255,0.5);margin-top:8px;">مقفل</div>' : ''}
        `;
        container.appendChild(card);
    });
}

// ---------- 2. بدء المستوى ----------
function startLevel(levelIndex) {
    gameState.currentLevel = levelIndex;
    gameState.currentQuestion = 0;
    gameState.points = 0;
    gameState.correctAnswers = 0;
    gameState.startTime = Date.now();

    document.getElementById('hudLevel').textContent = levelIndex + 1;
    document.getElementById('hudPoints').textContent = '0';

    trackActivity('Jeux éducatifs', `Niveau ${levelIndex + 1}`, 'Démarré');

    navigateTo('gameScreen');
    document.getElementById('gameHud').classList.add('active');

    loadQuestion();
    startTimer();
}

// ---------- 3. المؤقت ----------
function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - gameState.startTime) / 1000);
        const mins = Math.floor(elapsed / 60).toString().padStart(2, '0');
        const secs = (elapsed % 60).toString().padStart(2, '0');
        document.getElementById('hudTimer').textContent = `${mins}:${secs}`;
    }, 1000);
}

// ---------- 4. تحميل السؤال ----------
function loadQuestion() {
    const level = levelsData[gameState.currentLevel];
    const q = level[gameState.currentQuestion];

    gameState.isChecking = false;
    gameState.selectedLetters = [];
    gameState.hintedPositions = [];
    gameState.currentAnswer = q.answer;

    document.getElementById('hudQuestion').textContent = `${gameState.currentQuestion + 1}/10`;
    document.getElementById('clueText').textContent = q.clue;

    const lettersOnly = q.answer.replace(/\s/g, '');
    const all = [...lettersOnly.split(''), ...q.extra];
    gameState.availableLetters = shuffle(all).map((l, i) => ({ id: i, letter: l, used: false }));

    renderEmptySlots(q.answer);
    renderChoices();
}

function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

// ---------- 5. عرض خانات الإجابة ----------
function renderEmptySlots(answer) {
    const container = document.getElementById('answerSlots');
    container.innerHTML = '';
    container.classList.remove('correct', 'wrong');

    const words = answer.split(' ');

    if (words.length > 1) {
        container.style.flexDirection = 'column';
        container.style.gap = '10px';
        words.forEach(word => {
            const row = document.createElement('div');
            row.style.display = 'flex';
            row.style.gap = '6px';
            row.style.justifyContent = 'center';
            row.style.flexWrap = 'nowrap';
            for (let i = 0; i < word.length; i++) {
                const slot = document.createElement('div');
                slot.className = 'empty-slot';
                row.appendChild(slot);
            }
            container.appendChild(row);
        });
    } else {
        container.style.flexDirection = 'row';
        container.style.gap = '6px';
        for (let i = 0; i < answer.length; i++) {
            const slot = document.createElement('div');
            slot.className = 'empty-slot';
            container.appendChild(slot);
        }
    }
}

// ---------- 6. عرض الحروف ----------
function renderChoices() {
    const container = document.getElementById('letterChoices');
    container.innerHTML = '';
    gameState.availableLetters.forEach(item => {
        const btn = document.createElement('button');
        btn.className = 'letter-btn';
        btn.textContent = item.letter;
        btn.disabled = item.used;
        btn.onclick = () => selectLetter(item.id);
        container.appendChild(btn);
    });
}

function selectLetter(id) {
    if (gameState.isChecking) return;
    const item = gameState.availableLetters.find(l => l.id === id);
    if (!item || item.used) return;
    item.used = true;
    gameState.selectedLetters.push(id);
    updateAnswerSlots();
    renderChoices();
}

function updateAnswerSlots() {
    const slots = document.querySelectorAll('.empty-slot');
    const answerNoSpaces = gameState.currentAnswer.replace(/\s/g, '');

    slots.forEach((slot, i) => {
        slot.classList.remove('filled');
        slot.textContent = '';
        slot.onclick = null;

        if (gameState.hintedPositions.includes(i)) {
            slot.textContent = answerNoSpaces[i];
            slot.classList.add('hint');
        }
    });

    gameState.selectedLetters.forEach((id, index) => {
        const availableSlots = Array.from(slots).filter((s, i) => !gameState.hintedPositions.includes(i));
        if (availableSlots[index]) {
            const item = gameState.availableLetters.find(l => l.id === id);
            availableSlots[index].textContent = item.letter;
            availableSlots[index].classList.add('filled');
            availableSlots[index].onclick = () => removeLetter(index);
        }
    });
}

function removeLetter(index) {
    if (gameState.isChecking) return;
    const id = gameState.selectedLetters[index];
    const item = gameState.availableLetters.find(l => l.id === id);
    if (!item) return;
    item.used = false;
    gameState.selectedLetters.splice(index, 1);
    updateAnswerSlots();
    renderChoices();
}

function resetLetters() {
    if (gameState.isChecking) return;
    gameState.selectedLetters = [];
    gameState.availableLetters.forEach(l => l.used = false);
    updateAnswerSlots();
    renderChoices();
}

// ---------- 7. المساعدة والتخطي ----------
function useHint() {
    if (gameState.isChecking) return;
    if (gameState.points <= 0) {
        alert('تحتاج على الأقل 5 نقاط للحصول على مساعدة!');
        return;
    }

    const answerNoSpaces = gameState.currentAnswer.replace(/\s/g, '');
    const slots = Array.from(document.querySelectorAll('.empty-slot'));
    const unhinted = slots.map((s, i) => i).filter(i => !gameState.hintedPositions.includes(i));

    if (unhinted.length === 0) { alert('جميع الحروف مكشوفة!'); return; }

    const pos = unhinted[0];
    gameState.hintedPositions.push(pos);
    gameState.points -= 5;
    document.getElementById('hudPoints').textContent = gameState.points;
    updateAnswerSlots();
    playSound('hint');
}

function skipQuestion() {
    if (gameState.isChecking) return;
    gameState.points -= 10;
    document.getElementById('hudPoints').textContent = gameState.points;
    playSound('skip');
    nextQuestion();
}

// ---------- 8. التحقق من الإجابة ----------
function checkAnswer() {
    if (gameState.isChecking) return;

    let userAnswer = '';
    document.querySelectorAll('.empty-slot').forEach(slot => userAnswer += slot.textContent);

    const answerSlots = document.getElementById('answerSlots');
    const correctAnswer = gameState.currentAnswer.replace(/\s/g, '');

    if (userAnswer.toUpperCase() === correctAnswer.toUpperCase()) {
        gameState.isChecking = true;
        answerSlots.classList.add('correct');
        gameState.points += 20;
        gameState.correctAnswers++;
        document.getElementById('hudPoints').textContent = gameState.points;
        playSound('success');
        setTimeout(() => showFeedback(true), 800);
    } else if (userAnswer.length === 0) {
        answerSlots.style.borderColor = 'var(--accent)';
        setTimeout(() => answerSlots.style.borderColor = '', 600);
    } else {
        gameState.isChecking = true;
        answerSlots.classList.add('wrong');
        playSound('error');
        setTimeout(() => {
            answerSlots.classList.remove('wrong');
            resetLetters();
            gameState.isChecking = false;
        }, 800);
    }
}

// ---------- 9. التقدم ----------
function nextQuestion() {
    document.getElementById('feedback').classList.remove('active');
    gameState.currentQuestion++;
    if (gameState.currentQuestion >= 10) { completeLevel(); }
    else { loadQuestion(); }
}

function completeLevel() {
    clearInterval(timerInterval);

    const elapsed = Math.floor((Date.now() - gameState.startTime) / 1000);
    const mins = Math.floor(elapsed / 60);
    const secs = elapsed % 60;
    const stars = gameState.points >= 180 ? 3 : gameState.points >= 120 ? 2 : 1;
    const allCorrect = gameState.correctAnswers === 10;

    const progress = loadProgress();
    progress.levelStars[gameState.currentLevel + 1] = Math.max(stars, progress.levelStars[gameState.currentLevel + 1] || 0);
    if (allCorrect) progress.unlockedLevels = Math.max(progress.unlockedLevels, gameState.currentLevel + 2);
    saveProgress(progress);

    trackActivity('Jeux éducatifs', `Niveau ${gameState.currentLevel + 1}`,
        `${gameState.correctAnswers}/10 - ${gameState.points}pts - ${mins}:${secs.toString().padStart(2,'0')}`);

    const leaderboard = loadLeaderboard();
    leaderboard.push({
        name: gameState.playerName,
        level: gameState.currentLevel + 1,
        points: gameState.points,
        time: elapsed,
        date: Date.now()
    });
    leaderboard.sort((a, b) => b.points !== a.points ? b.points - a.points : a.time - b.time);
    saveLeaderboard(leaderboard.slice(0, 100));

    const overlay = document.getElementById('feedback');

    if (allCorrect) {
        overlay.innerHTML = `
            <div class="feedback-card level-complete">
                <div class="feedback-icon">🏆</div>
                <div class="level-complete-title">مبروك! ${gameState.correctAnswers}/10 ✅</div>
                <div style="font-size:18px;color:#10b981;margin-bottom:20px;font-weight:700;">🎉 إجابات صحيحة 100%</div>
                <div class="level-stats">
                    <div class="stat-row"><span class="stat-label">النقاط النهائية</span><span class="stat-value">${gameState.points}</span></div>
                    <div class="stat-row"><span class="stat-label">الوقت المستغرق</span><span class="stat-value">${mins}:${secs.toString().padStart(2,'0')}</span></div>
                    <div class="stat-row"><span class="stat-label">التقييم</span><span class="stat-value">${'⭐'.repeat(stars)}</span></div>
                </div>
                <div style="background:rgba(16,185,129,0.1);border:2px solid rgba(16,185,129,0.3);border-radius:12px;padding:15px;margin:20px 0;text-align:center;">
                    <div style="font-size:16px;color:#10b981;font-weight:700;">✨ المستوى ${gameState.currentLevel + 2} مفتوح الآن!</div>
                </div>
                <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;">
                    <button class="btn btn-primary" onclick="backToLevels()">اختر مستوى آخر</button>
                    <button class="btn btn-ghost" onclick="showLeaderboard()">🏆 المتصدرين</button>
                </div>
            </div>
        `;
    } else {
        overlay.innerHTML = `
            <div class="feedback-card level-complete">
                <div class="feedback-icon">😞</div>
                <div class="level-complete-title">حاول مرة أخرى</div>
                <div style="font-size:18px;color:#f59e0b;margin-bottom:20px;font-weight:700;">📊 ${gameState.correctAnswers}/10 إجابات صحيحة</div>
                <div class="level-stats">
                    <div class="stat-row"><span class="stat-label">النقاط النهائية</span><span class="stat-value">${gameState.points}</span></div>
                    <div class="stat-row"><span class="stat-label">الوقت المستغرق</span><span class="stat-value">${mins}:${secs.toString().padStart(2,'0')}</span></div>
                    <div class="stat-row"><span class="stat-label">التقييم</span><span class="stat-value">${'⭐'.repeat(stars)}</span></div>
                </div>
                <div style="background:rgba(239,68,68,0.1);border:2px solid rgba(239,68,68,0.3);border-radius:12px;padding:15px;margin:20px 0;text-align:center;">
                    <div style="font-size:16px;color:#ef4444;font-weight:700;">❌ المستوى التالي مقفل</div>
                    <div style="font-size:14px;color:rgba(255,255,255,0.7);margin-top:8px;">أجب على جميع الأسئلة بشكل صحيح لفتح المستوى التالي</div>
                </div>
                <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;">
                    <button class="btn btn-primary" onclick="startLevel(${gameState.currentLevel})">🔄 أعد المحاولة</button>
                    <button class="btn btn-ghost" onclick="backToLevels()">العودة</button>
                </div>
            </div>
        `;
    }
    overlay.classList.add('active');
}

function backToLevels() {
    document.getElementById('feedback').classList.remove('active');
    navigateTo('levelsScreen');
}

// ---------- 10. لائحة المتصدرين ----------
function showLeaderboard() {
    const leaderboard = loadLeaderboard();
    const list = document.getElementById('leaderboardList');
    list.innerHTML = '';

    if (leaderboard.length === 0) {
        list.innerHTML = '<div style="text-align:center;padding:40px;color:var(--gray);">لا توجد نتائج بعد<br><span style="font-size:14px;opacity:0.7;">كن أول من يسجل نتيجة!</span></div>';
    } else {
        const byLevel = {};
        leaderboard.forEach(entry => {
            if (!byLevel[entry.level]) byLevel[entry.level] = [];
            byLevel[entry.level].push(entry);
        });

        Object.keys(byLevel).forEach(level => {
            byLevel[level].sort((a, b) => b.points !== a.points ? b.points - a.points : a.time - b.time);
        });

        const header = document.createElement('div');
        header.style.cssText = 'text-align:center;padding:15px;background:rgba(99,102,241,0.1);border-radius:12px;margin-bottom:20px;';
        header.innerHTML = '<div style="font-size:14px;color:rgba(255,255,255,0.7);">الترتيب: أعلى نقاط ← أقل وقت</div>';
        list.appendChild(header);

        Object.keys(byLevel).sort((a, b) => parseInt(a) - parseInt(b)).forEach(level => {
            const levelTitle = document.createElement('div');
            levelTitle.style.cssText = 'font-size:18px;font-weight:700;color:var(--primary);margin:25px 0 15px;padding:12px;background:rgba(99,102,241,0.1);border-radius:10px;text-align:center;';
            levelTitle.textContent = `🎮 المستوى ${level}`;
            list.appendChild(levelTitle);

            byLevel[level].slice(0, 10).forEach((entry, i) => {
                const mins = Math.floor(entry.time / 60);
                const secs = entry.time % 60;
                const row = document.createElement('div');
                row.className = 'leaderboard-row';
                row.style.cssText = i < 3 ? 'background:rgba(255,215,0,0.1);border:2px solid rgba(255,215,0,0.3);' : '';
                row.innerHTML = `
                    <div class="leaderboard-rank" style="font-size:${i === 0 ? '24px' : '18px'};">${i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : (i + 1)}</div>
                    <div class="leaderboard-name">${sanitizeHTML(entry.name)}</div>
                    <div class="leaderboard-score">${parseInt(entry.points) || 0} نقطة</div>
                    <div class="leaderboard-time">${mins}:${secs.toString().padStart(2,'0')}</div>
                `;
                list.appendChild(row);
            });
        });
    }
    navigateTo('leaderboardScreen');
}

// ---------- 11. المؤثرات الصوتية ----------
let audioCtx = null;

function getAudioCtx() {
    if (!audioCtx) {
        try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch(e) {}
    }
    return audioCtx;
}

function playSound(type) {
    try {
        const ctx = getAudioCtx();
        if (!ctx) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        if (type === 'success') {
            osc.frequency.setValueAtTime(523, ctx.currentTime);
            osc.frequency.setValueAtTime(659, ctx.currentTime + 0.1);
            osc.frequency.setValueAtTime(784, ctx.currentTime + 0.2);
            gain.gain.setValueAtTime(0.3, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
            osc.start(ctx.currentTime);
            osc.stop(ctx.currentTime + 0.5);
        } else if (type === 'error') {
            osc.frequency.setValueAtTime(200, ctx.currentTime);
            osc.frequency.setValueAtTime(150, ctx.currentTime + 0.2);
            gain.gain.setValueAtTime(0.3, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
            osc.start(ctx.currentTime);
            osc.stop(ctx.currentTime + 0.4);
        } else if (type === 'hint' || type === 'skip') {
            osc.frequency.setValueAtTime(400, ctx.currentTime);
            gain.gain.setValueAtTime(0.2, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
            osc.start(ctx.currentTime);
            osc.stop(ctx.currentTime + 0.2);
        }
    } catch(e) {
        console.log('Sound error:', e);
    }
}
