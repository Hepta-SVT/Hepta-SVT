// ========================================
// APP.JS - التطبيق الرئيسي
// ========================================

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
    const lastName = document.getElementById('lastName').value.trim();
    const btn = document.getElementById('startBtn');
    const error = document.getElementById('nameError');

    if (firstName.length >= 2 && lastName.length >= 2) {
        btn.disabled = false;
        const fullName = firstName + ' ' + lastName;
        const leaderboard = loadLeaderboard();
        const exists = leaderboard.some(entry => entry.name.toLowerCase() === fullName.toLowerCase());
        error.style.display = exists ? 'block' : 'none';
    } else {
        btn.disabled = true;
        error.style.display = 'none';
    }
}

function submitName() {
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();

    if (firstName.length < 2 || lastName.length < 2) {
        alert('الرجاء إدخال الاسم والنسب (حرفين على الأقل لكل منهما)');
        return;
    }

    const fullName = firstName + ' ' + lastName;
    const leaderboard = loadLeaderboard();
    const exists = leaderboard.some(entry => entry.name.toLowerCase() === fullName.toLowerCase());

    if (exists) {
        alert('هذا الاسم مسجل بالفعل! الرجاء استخدام اسم آخر');
        return;
    }

    gameState.playerName = fullName;
    localStorage.setItem('heptaPlayerName', fullName);

    document.getElementById('userNameText').textContent = fullName;
    document.getElementById('userNameDisplay').style.display = 'block';

    const dashboardNameEl = document.getElementById('dashboardName');
    if (dashboardNameEl) dashboardNameEl.textContent = firstName;

    const overlay = document.getElementById('feedback');
    overlay.innerHTML = `
        <div class="feedback-card">
            <div class="feedback-icon">🎉</div>
            <div class="feedback-title success">مرحباً ${firstName}!</div>
            <div class="feedback-msg">نتمنى لك تجربة تعليمية ممتعة 🌟</div>
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
        document.getElementById('firstName').value = '';
        document.getElementById('lastName').value = '';
        document.getElementById('startBtn').disabled = true;
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
