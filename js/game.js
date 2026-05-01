// ========================================
// hepta-svt - GAME.JS
// نظام اللعبة (ترتيب الحروف، المستويات، النقاط)
// ========================================

let gameState = {
    currentLevel: 0,
    currentQuestion: 0,
    points: 0,
    correctAnswers: 0,
    startTime: null,
    selectedLetters: [],
    availableLetters: [],
    hintedPositions: [],
    currentAnswer: '',
    isChecking: false
};

let timerInterval = null;

function startLevel(levelIndex) {
    gameState = {
        currentLevel: levelIndex,
        currentQuestion: 0,
        points: 0,
        correctAnswers: 0,
        startTime: Date.now(),
        selectedLetters: [],
        availableLetters: [],
        hintedPositions: [],
        currentAnswer: '',
        isChecking: false
    };
    
    document.getElementById('hudLevel').textContent = levelIndex + 1;
    document.getElementById('hudPoints').textContent = '0';
    document.getElementById('gameHud').classList.add('active');
    
    navigateTo('gameScreen');
    loadQuestion();
    startTimer();
}

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
    gameState.availableLetters = shuffleArray(all).map((l, i) => ({ id: i, letter: l, used: false }));
    
    renderEmptySlots(q.answer);
    renderChoices();
}

function renderEmptySlots(answer) {
    const container = document.getElementById('answerSlots');
    container.innerHTML = '';
    container.classList.remove('correct', 'wrong');
    
    for (let i = 0; i < answer.length; i++) {
        const slot = document.createElement('div');
        slot.className = 'empty-slot';
        container.appendChild(slot);
    }
}

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
    slots.forEach(slot => {
        slot.textContent = '';
        slot.classList.remove('filled');
        slot.onclick = null;
    });
    
    gameState.selectedLetters.forEach((id, idx) => {
        const item = gameState.availableLetters.find(l => l.id === id);
        if (slots[idx]) {
            slots[idx].textContent = item.letter;
            slots[idx].classList.add('filled');
            slots[idx].onclick = () => removeLetter(idx);
        }
    });
}

function removeLetter(index) {
    if (gameState.isChecking) return;
    const id = gameState.selectedLetters[index];
    const item = gameState.availableLetters.find(l => l.id === id);
    if (item) item.used = false;
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

function useHint() {
    if (gameState.isChecking) return;
    if (gameState.points < 5) {
        showMessage('💡 تحتاج 5 نقاط للمساعدة!', 'error');
        return;
    }
    gameState.points -= 5;
    document.getElementById('hudPoints').textContent = gameState.points;
    showMessage('🔍 تم كشف حرف! -5 نقاط', 'info');
    // منطق كشف حرف عشوائي (سيُكمل لاحقاً)
}

function skipQuestion() {
    if (gameState.isChecking) return;
    gameState.points = Math.max(0, gameState.points - 10);
    document.getElementById('hudPoints').textContent = gameState.points;
    showMessage('⏭ تم تخطي السؤال -10 نقاط', 'error');
    nextQuestion();
}

function checkAnswer() {
    if (gameState.isChecking) return;
    
    let userAnswer = '';
    document.querySelectorAll('.empty-slot').forEach(slot => userAnswer += slot.textContent);
    const correctAnswer = gameState.currentAnswer.replace(/\s/g, '');
    
    if (userAnswer.toUpperCase() === correctAnswer.toUpperCase()) {
        gameState.isChecking = true;
        gameState.points += 20;
        gameState.correctAnswers++;
        document.getElementById('hudPoints').textContent = gameState.points;
        showMessage('✅ إجابة صحيحة! +20 نقطة', 'success');
        setTimeout(() => nextQuestion(), 1000);
    } else if (userAnswer.length === 0) {
        showMessage('⚠️ لم تختر أي حروف بعد!', 'error');
    } else {
        gameState.isChecking = true;
        showMessage('❌ إجابة خاطئة! حاول مرة أخرى', 'error');
        setTimeout(() => resetLetters(), 1000);
        setTimeout(() => { gameState.isChecking = false; }, 1500);
    }
}

function nextQuestion() {
    gameState.currentQuestion++;
    if (gameState.currentQuestion >= 10) {
        completeLevel();
    } else {
        loadQuestion();
    }
}

function completeLevel() {
    clearInterval(timerInterval);
    const elapsed = Math.floor((Date.now() - gameState.startTime) / 1000);
    const mins = Math.floor(elapsed / 60);
    const secs = elapsed % 60;
    const stars = gameState.points >= 180 ? 3 : gameState.points >= 120 ? 2 : 1;
    
    showMessage(`🏆 أكملت المستوى! النقاط: ${gameState.points} | ${stars} ⭐`, 'success');
    setTimeout(() => backToLevels(), 2000);
}

function backToLevels() {
    document.getElementById('gameHud').classList.remove('active');
    navigateTo('levelsScreen');
}

function startTimer() {
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        if (!gameState.startTime) return;
        const elapsed = Math.floor((Date.now() - gameState.startTime) / 1000);
        const mins = Math.floor(elapsed / 60).toString().padStart(2, '0');
        const secs = (elapsed % 60).toString().padStart(2, '0');
        document.getElementById('hudTimer').textContent = `${mins}:${secs}`;
    }, 1000);
          }
