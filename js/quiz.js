// ========================================
// hepta-svt - QUIZ.JS
// نظام الاختبارات المعرفية
// ========================================

let currentQuiz = {
    questions: [],
    index: 0,
    correct: 0,
    wrong: 0,
    level: 'easy',
    answered: false
};

function startQuiz(level, topic = 'relation') {
    const source = topic === 'immunology' ? immunologyQuizData : quizData;
    currentQuiz.questions = source[level] || [];
    if (currentQuiz.questions.length === 0) {
        showMessage('🔒 هذا المستوى قيد الإعداد قريباً', 'error');
        return;
    }
    
    currentQuiz.index = 0;
    currentQuiz.correct = 0;
    currentQuiz.wrong = 0;
    currentQuiz.level = level;
    currentQuiz.answered = false;
    
    navigateTo('quizScreen');
    loadQuizQuestion();
}

function loadQuizQuestion() {
    const q = currentQuiz.questions[currentQuiz.index];
    const total = currentQuiz.questions.length;
    
    document.getElementById('quizProgress').textContent = `${currentQuiz.index + 1}/${total}`;
    document.getElementById('quizCorrect').textContent = currentQuiz.correct;
    document.getElementById('quizWrong').textContent = currentQuiz.wrong;
    document.getElementById('quizQuestion').textContent = q.question;
    
    const container = document.getElementById('quizOptions');
    container.innerHTML = '';
    currentQuiz.answered = false;
    
    if (!q.type || q.type === 'QCM') {
        q.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.textContent = opt;
            btn.onclick = () => checkQuizAnswer(opt, q.answer, btn);
            btn.className = 'quiz-option-btn';
            container.appendChild(btn);
        });
    }
    
    document.getElementById('quizFeedback').style.display = 'none';
    document.getElementById('quizNextBtn').style.display = 'none';
}

function checkQuizAnswer(selected, correct, btnElement) {
    if (currentQuiz.answered) return;
    currentQuiz.answered = true;
    
    const isCorrect = selected === correct;
    
    // تعطيل جميع الأزرار
    document.querySelectorAll('.quiz-option-btn').forEach(btn => {
        btn.disabled = true;
        btn.style.opacity = '0.6';
    });
    
    if (isCorrect) {
        btnElement.style.background = 'rgba(16,185,129,0.3)';
        btnElement.style.borderColor = '#10b981';
        currentQuiz.correct++;
        document.getElementById('quizCorrect').textContent = currentQuiz.correct;
        showMessage('✅ إجابة صحيحة!', 'success');
    } else {
        btnElement.style.background = 'rgba(239,68,68,0.3)';
        btnElement.style.borderColor = '#ef4444';
        currentQuiz.wrong++;
        document.getElementById('quizWrong').textContent = currentQuiz.wrong;
        showMessage(`❌ خطأ! الإجابة الصحيحة: ${correct}`, 'error');
    }
    
    setTimeout(() => nextQuizQuestion(), 1500);
}

function nextQuizQuestion() {
    currentQuiz.index++;
    if (currentQuiz.index >= currentQuiz.questions.length) {
        finishQuiz();
    } else {
        loadQuizQuestion();
    }
}

function finishQuiz() {
    const total = currentQuiz.questions.length;
    const passed = currentQuiz.correct >= Math.ceil(total * 0.7);
    
    showMessage(passed ? `🎉 نجحت! ${currentQuiz.correct}/${total}` : `😞 للأسف! ${currentQuiz.correct}/${total}`, passed ? 'success' : 'error');
    
    setTimeout(() => {
        navigateTo('quizRelation');
    }, 2000);
}
