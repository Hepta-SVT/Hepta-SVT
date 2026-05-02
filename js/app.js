// ========================================
// APP.JS - التطبيق الرئيسي
// ========================================

// ---------- 0. حماية XSS - تنظيف المدخلات ----------
function sanitizeHTML(str) {
    if (typeof str !== 'string') return String(str);
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;');
}

function isValidName(name) {
    return /^[\u0600-\u06FFa-zA-ZÀ-ÿ\s'-]{2,20}$/.test(name);
}

// ---------- 0b. نظام PIN ----------
function hashPIN(pin) {
    const str = pin + 'hepta-svt-2025-salt';
    let hash = 5381;
    for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) + hash) ^ str.charCodeAt(i);
        hash = hash >>> 0;
    }
    return hash.toString(36);
}

function getPINKey(fullName) {
    return 'heptaPIN_' + fullName.toLowerCase().replace(/\s+/g, '_');
}

function savePIN(fullName, pin) {
    localStorage.setItem(getPINKey(fullName), hashPIN(pin));
}

function verifyPIN(fullName, pin) {
    const stored = localStorage.getItem(getPINKey(fullName));
    return stored !== null && stored === hashPIN(pin);
}

function hasPIN(fullName) {
    return localStorage.getItem(getPINKey(fullName)) !== null;
}

// ---------- 1. تتبع Google Sheets ----------
const SHEET_URL = 'https://script.google.com/macros/s/AKfycbxVf8ZqJQ7wQ3Ny9mXzJ8KqP4vH5L6tM2nR/exec';

function sendToSheet(data) {
    try {
        fetch(SHEET_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
    } catch(e) {
        console.log('Tracking error:', e);
    }
}

function trackActivity(section, level = '', result = '') {
    const now = new Date();
    const date = now.toLocaleDateString('ar-MA');
    const time = now.toLocaleTimeString('ar-MA', { hour: '2-digit', minute: '2-digit' });
    sendToSheet({
        name: gameState.playerName || 'Invité',
        date, time, section, level, result
    });
}

// ---------- 2. حفظ واسترجاع البيانات ----------
function loadProgress() {
    const saved = localStorage.getItem('heptaGameProgress');
    if (saved) return JSON.parse(saved);
    return { unlockedLevels: 1, levelStars: {}, bestScores: {} };
}

function saveProgress(progress) {
    localStorage.setItem('heptaGameProgress', JSON.stringify(progress));
}

function loadLeaderboard() {
    const saved = localStorage.getItem('heptaLeaderboard');
    if (saved) return JSON.parse(saved);
    return [];
}

function saveLeaderboard(leaderboard) {
    localStorage.setItem('heptaLeaderboard', JSON.stringify(leaderboard));
}

// ---------- 3. حالة اللعبة ----------
const gameState = {
    playerName: 'Player',
    currentLevel: 0,
    currentQuestion: 0,
    points: 0,
    correctAnswers: 0,
    startTime: 0,
    selectedLetters: [],
    availableLetters: [],
    isChecking: false,
    hintedPositions: [],
    currentAnswer: ''
};

// ---------- 4. شاشة إدخال الاسم ----------
function checkNameInput() {
    const firstName = document.getElementById('firstName').value.trim();
    const lastName  = document.getElementById('lastName').value.trim();
    const btn       = document.getElementById('startBtn');
    const error     = document.getElementById('nameError');
    const pinSection        = document.getElementById('pinSection');
    const pinConfirmSection = document.getElementById('pinConfirmSection');
    const pinLabel  = document.getElementById('pinLabel');
    const pinCode   = document.getElementById('pinCode').value;
    const pinConfirm= document.getElementById('pinConfirm').value;

    error.style.display = 'none';
    error.textContent   = '';
    btn.disabled = true;

    if (!isValidName(firstName) || !isValidName(lastName)) {
        pinSection.style.display = 'none';
        document.getElementById('screenEmoji').textContent = '👋';
        document.getElementById('screenTitle').textContent = 'مرحباً بك!';
        document.getElementById('screenSubtitle').textContent = 'أدخل اسمك الكامل للبدء';
        btn.textContent = 'دخول المنصة 🚀';
        return;
    }

    const fullName    = firstName + ' ' + lastName;
    const returning   = hasPIN(fullName);
    pinSection.style.display = 'block';

    if (returning) {
        // تلميذ موجود → وضع الدخول
        document.getElementById('screenEmoji').textContent    = '🔑';
        document.getElementById('screenTitle').textContent    = 'مرحباً بعودتك!';
        document.getElementById('screenSubtitle').textContent = 'أدخل رمز PIN الخاص بك';
        pinLabel.textContent = `🔐 رمز PIN الخاص بـ ${firstName}`;
        pinConfirmSection.style.display = 'none';
        btn.textContent = 'دخول 🔑';

        if (pinCode.length === 4) {
            if (verifyPIN(fullName, pinCode)) {
                btn.disabled = false;
            } else {
                error.style.display = 'block';
                error.style.cssText += 'background:rgba(239,68,68,0.15);border:1px solid rgba(239,68,68,0.3);color:#ef4444;';
                error.textContent = '❌ رمز PIN غير صحيح، حاول مجدداً';
            }
        }
    } else {
        // تلميذ جديد → وضع التسجيل
        document.getElementById('screenEmoji').textContent    = '👋';
        document.getElementById('screenTitle').textContent    = 'مرحباً بك!';
        document.getElementById('screenSubtitle').textContent = 'أدخل اسمك واختر رمز PIN';
        pinLabel.textContent = '🔐 اختر رمز PIN من 4 أرقام';
        pinConfirmSection.style.display = 'block';
        btn.textContent = 'تسجيل ودخول 🚀';

        if (pinCode.length === 4 && pinConfirm.length === 4) {
            if (pinCode === pinConfirm) {
                btn.disabled = false;
            } else {
                error.style.display = 'block';
                error.style.cssText += 'background:rgba(239,68,68,0.15);border:1px solid rgba(239,68,68,0.3);color:#ef4444;';
                error.textContent = '⚠️ رمزا PIN غير متطابقين، أعد المحاولة';
            }
        }
    }
}

function submitName() {
    const firstName  = document.getElementById('firstName').value.trim();
    const lastName   = document.getElementById('lastName').value.trim();
    const pinCode    = document.getElementById('pinCode').value;
    const pinConfirm = document.getElementById('pinConfirm').value;

    if (!isValidName(firstName) || !isValidName(lastName)) {
        alert('الرجاء إدخال الاسم والنسب بحروف صحيحة فقط');
        return;
    }
    if (pinCode.length !== 4) {
        alert('الرجاء إدخال رمز PIN من 4 أرقام');
        return;
    }

    const fullName  = firstName + ' ' + lastName;
    const returning = hasPIN(fullName);

    if (returning) {
        if (!verifyPIN(fullName, pinCode)) {
            alert('❌ رمز PIN غير صحيح!');
            return;
        }
    } else {
        if (pinCode !== pinConfirm) {
            alert('⚠️ رمزا PIN غير متطابقين!');
            return;
        }
        savePIN(fullName, pinCode);
    }

    gameState.playerName = fullName;
    localStorage.setItem('heptaPlayerName', fullName);

    document.getElementById('userNameText').textContent = fullName;
    document.getElementById('userNameDisplay').style.display = 'block';

    const dashboardNameEl = document.getElementById('dashboardName');
    if (dashboardNameEl) dashboardNameEl.textContent = firstName;

    const overlay = document.getElementById('feedback');
    const safeFirstName = sanitizeHTML(firstName);
    overlay.innerHTML = `
        <div class="feedback-card">
            <div class="feedback-icon">${returning ? '🎉' : '🎊'}</div>
            <div class="feedback-title success">${returning ? 'مرحباً بعودتك' : 'مرحباً'} ${safeFirstName}!</div>
            <div class="feedback-msg">${returning ? 'سعداء بعودتك إلى المنصة 🌟' : 'نتمنى لك تجربة تعليمية ممتعة 🌟'}</div>
        </div>
    `;
    overlay.classList.add('active');

    setTimeout(() => {
        overlay.classList.remove('active');
        navigateTo('dashboard');
        setTimeout(() => initCardRotation(), 200);
    }, 2000);
}

// ---------- 5. DOMContentLoaded ----------
window.addEventListener('DOMContentLoaded', () => {
    const savedName = localStorage.getItem('heptaPlayerName');
    if (savedName) {
        gameState.playerName = savedName;
        document.getElementById('userNameText').textContent = savedName;
        document.getElementById('userNameDisplay').style.display = 'block';

        const firstName = savedName.split(' ')[0];
        const dashboardNameEl = document.getElementById('dashboardName');
        if (dashboardNameEl) dashboardNameEl.textContent = firstName;

        const progress = loadProgress();
        const gameSlideText = document.getElementById('gameSlideText');
        const gameSlideStatus = document.getElementById('gameSlideStatus');

        if (gameSlideText && gameSlideStatus) {
            const highestLevel = progress.unlockedLevels || 1;
            const totalStars = Object.values(progress.levelStars || {}).reduce((a, b) => a + b, 0);

            if (highestLevel > 1 || totalStars > 0) {
                gameSlideText.innerHTML = `🔥 حسّن نتيجتك!<br>المستوى: ${highestLevel} | ⭐ ${totalStars}`;
                gameSlideStatus.textContent = 'واصل اللعب';
            } else {
                gameSlideText.innerHTML = `🎮 ابدأ التحدي!<br>لم تجرب اللعبة بعد؟`;
                gameSlideStatus.textContent = 'ابدأ الآن';
            }
        }

        navigateTo('dashboard');
        setTimeout(() => initCardRotation(), 200);
    }
});

// ---------- 6. الكاروسيل ----------
let currentCardIndex = 0;
let cardRotationTimer;

function showCard(index) {
    const cards = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    if (!cards.length) return;

    cards.forEach((card, i) => {
        if (i === index) {
            card.style.opacity = '1';
            card.style.zIndex = '2';
            card.style.visibility = 'visible';
        } else {
            card.style.opacity = '0';
            card.style.zIndex = '1';
            card.style.visibility = 'hidden';
        }
    });

    dots.forEach((dot, i) => {
        dot.style.background = i === index ? 'var(--primary)' : 'rgba(255,255,255,0.3)';
        dot.style.transform = i === index ? 'scale(1.3)' : 'scale(1)';
    });
}

function nextCard() {
    currentCardIndex = (currentCardIndex + 1) % 5;
    showCard(currentCardIndex);
}

function goToCard(index) {
    currentCardIndex = index;
    showCard(currentCardIndex);
    resetCardTimer();
}

function startCardRotation() {
    cardRotationTimer = setInterval(() => { nextCard(); }, 3000);
}

function stopCardRotation() {
    if (cardRotationTimer) {
        clearInterval(cardRotationTimer);
        cardRotationTimer = null;
    }
}

function resetCardTimer() {
    stopCardRotation();
    startCardRotation();
}

function initCardRotation() {
    const dashboard = document.getElementById('dashboard');
    if (dashboard && dashboard.classList.contains('active')) {
        showCard(0);
        startCardRotation();
    }
}

// ---------- 7. التنقل ----------
function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('active');
    document.getElementById('sidebarOverlay').classList.toggle('active');
}

function closeSidebar() {
    document.getElementById('sidebar').classList.remove('active');
    document.getElementById('sidebarOverlay').classList.remove('active');
}

function navigateTo(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(page).classList.add('active');
    document.getElementById('gameHud').classList.remove('active');
    document.querySelectorAll('.sidebar-item').forEach(item => item.classList.remove('active'));
    closeSidebar();
    window.scrollTo(0, 0);

    if (page === 'levelsScreen') renderLevels();
    if (page === 'knowledgeTests' || page === 'quizRelation') updateQuizLocks();

    if (page === 'dashboard') {
        setTimeout(() => initCardRotation(), 100);
    } else {
        stopCardRotation();
    }
}

// ---------- 8. تسجيل الخروج ----------
function logout() {
    if (confirm('هل تريد تسجيل الخروج؟')) {
        localStorage.removeItem('heptaPlayerName');
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        document.getElementById('gameHud').classList.remove('active');
        document.querySelector('section').classList.add('active');

        // إعادة تعيين النموذج كاملاً
        document.getElementById('firstName').value   = '';
        document.getElementById('lastName').value    = '';
        document.getElementById('pinCode').value     = '';
        document.getElementById('pinConfirm').value  = '';
        document.getElementById('pinSection').style.display        = 'none';
        document.getElementById('pinConfirmSection').style.display = 'none';
        document.getElementById('nameError').style.display         = 'none';
        document.getElementById('startBtn').disabled    = true;
        document.getElementById('startBtn').textContent = 'دخول المنصة 🚀';
        document.getElementById('screenEmoji').textContent    = '👋';
        document.getElementById('screenTitle').textContent    = 'مرحباً بك!';
        document.getElementById('screenSubtitle').textContent = 'أدخل اسمك الكامل للبدء';
        document.getElementById('userNameDisplay').style.display = 'none';

        closeSidebar();
        window.scrollTo(0, 0);
    }
}

// ---------- 9. الدروس ----------
function openLesson(key) {
    const lesson = lessonsData[key];
    document.getElementById('lessonTitle').textContent = lesson.title;
    trackActivity('Résumés', lesson.title, 'Consulté');

    const container = document.getElementById('lessonParagraphs');
    container.innerHTML = '';
    lesson.paragraphs.forEach(p => {
        const card = document.createElement('div');
        card.className = 'card';
        card.onclick = () => showImage(p.image, p.title);
        card.innerHTML = `
            <div class="card-icon">📄</div>
            <h4 class="card-title">${p.title}</h4>
        `;
        container.appendChild(card);
    });
    navigateTo('lessonDetails');
}

function showImage(path) {
    const popup = document.createElement('div');
    popup.className = 'popup active';
    popup.innerHTML = `
        <div class="popup-content">
            <button class="popup-close" onclick="this.parentElement.parentElement.remove()">✖</button>
            <img class="popup-img" src="${path}" onerror="alert('خطأ في تحميل الصورة')">
        </div>
    `;
    document.body.appendChild(popup);
}

// ---------- 10. نظام قفل الاختبارات ----------
function updateQuizLocks() {
    const mediumUnlocked = localStorage.getItem('quiz_medium_unlocked') === 'true';
    const hardUnlocked = localStorage.getItem('quiz_hard_unlocked') === 'true';

    const mediumCard = document.getElementById('mediumQuizCard');
    const mediumLock = document.getElementById('mediumLock');
    const mediumScore = document.getElementById('mediumBestScore');
    if (mediumCard && mediumLock) {
        if (mediumUnlocked) {
            mediumCard.style.opacity = '1';
            mediumCard.style.filter = 'none';
            mediumLock.style.display = 'none';
            const best = localStorage.getItem('quiz_medium_best') || 0;
            if (best > 0) mediumScore.textContent = `أفضل نتيجة: ${best}/30`;
        } else {
            mediumCard.style.opacity = '0.5';
            mediumCard.style.filter = 'grayscale(0.7)';
            mediumLock.style.display = 'block';
            mediumScore.textContent = '';
        }
    }

    const hardCard = document.getElementById('hardQuizCard');
    const hardLock = document.getElementById('hardLock');
    const hardScore = document.getElementById('hardBestScore');
    if (hardCard && hardLock) {
        if (hardUnlocked) {
            hardCard.style.opacity = '1';
            hardCard.style.filter = 'none';
            hardLock.style.display = 'none';
            const best = localStorage.getItem('quiz_hard_best') || 0;
            if (best > 0) hardScore.textContent = `أفضل نتيجة: ${best}/40`;
        } else {
            hardCard.style.opacity = '0.5';
            hardCard.style.filter = 'grayscale(0.7)';
            hardLock.style.display = 'block';
            hardScore.textContent = '';
        }
    }

    const easyScore = document.getElementById('easyBestScore');
    if (easyScore) {
        const best = localStorage.getItem('quiz_easy_best') || 0;
        if (best > 0) easyScore.textContent = `أفضل نتيجة: ${best}/20`;
    }
}

function checkQuizUnlock(level) {
    if (level === 'medium') {
        const unlocked = localStorage.getItem('quiz_medium_unlocked') === 'true';
        if (unlocked) { startKnowledgeQuiz('medium', 'relation'); }
        else { alert('🔒 المستوى المتوسط مقفل!\n\nأكمل المستوى السهل بنجاح أولاً.\n(15/20 إجابة صحيحة)'); }
    } else if (level === 'hard') {
        const unlocked = localStorage.getItem('quiz_hard_unlocked') === 'true';
        if (unlocked) { startKnowledgeQuiz('hard', 'relation'); }
        else { alert('🔒 المستوى الصعب مقفل!\n\nأكمل المستوى المتوسط بنجاح أولاً.\n(25/30 إجابة صحيحة)'); }
    }
}

// ---------- 11. قسم التمارين ----------
function toggleExerciseSection(section) {
    const content = document.getElementById(section + 'Content');
    const arrow = document.getElementById(section + 'Arrow');
    if (content.style.display === 'none' || content.style.display === '') {
        content.style.display = 'block';
        arrow.style.transform = 'rotate(180deg)';
    } else {
        content.style.display = 'none';
        arrow.style.transform = 'rotate(0deg)';
    }
}

function toggleYearSection(year) {
    const content = document.getElementById('year' + year + 'Content');
    const arrow = document.getElementById('year' + year + 'Arrow');
    if (content.style.display === 'none' || content.style.display === '') {
        content.style.display = 'block';
        arrow.style.transform = 'rotate(180deg)';
    } else {
        content.style.display = 'none';
        arrow.style.transform = 'rotate(0deg)';
    }
}

// ---------- 12. ردود الفعل (مشتركة) ----------
function showFeedback(success, message) {
    const overlay = document.getElementById('feedback');
    if (success) {
        overlay.innerHTML = `
            <div class="feedback-card">
                <div class="feedback-icon">✅</div>
                <div class="feedback-title success">إجابة صحيحة!</div>
                <div class="feedback-msg">${message || 'أحسنت! +20 نقطة 🏅'}</div>
                <button class="btn btn-primary" onclick="nextQuestion()">التالي →</button>
            </div>
        `;
    } else {
        overlay.innerHTML = `
            <div class="feedback-card">
                <div class="feedback-icon">❌</div>
                <div class="feedback-title" style="color:var(--danger);">إجابة خاطئة</div>
                <div class="feedback-msg">${message || 'حاول مرة أخرى'}</div>
                <button class="btn btn-primary" onclick="document.getElementById('feedback').classList.remove('active');">حسناً</button>
            </div>
        `;
    }
    overlay.classList.add('active');
}

// ---------- 13. تنظيف البيانات القديمة (يعمل مرة واحدة) ----------
if (!localStorage.getItem('hepta_reset_done')) {
    localStorage.removeItem('heptaLeaderboard');
    localStorage.removeItem('heptaGameProgress');
    localStorage.removeItem('quiz_medium_unlocked');
    localStorage.removeItem('quiz_hard_unlocked');
    localStorage.setItem('hepta_reset_done', 'true');
}
