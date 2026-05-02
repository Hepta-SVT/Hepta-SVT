function useHint() {
    if (gameState.isChecking) return;
    if (gameState.points < 5) {
        showMessage('💡 تحتاج 5 نقاط للمساعدة!', 'error');
        return;
    }
    
    // البحث عن أول حرف فارغ ليس مكشوفاً
    const answerNoSpaces = gameState.currentAnswer.replace(/\s/g, '');
    const slots = document.querySelectorAll('.empty-slot');
    
    let emptyIndex = -1;
    for (let i = 0; i < slots.length; i++) {
        if (!gameState.hintedPositions.includes(i) && slots[i].textContent === '') {
            emptyIndex = i;
            break;
        }
    }
    
    if (emptyIndex === -1) {
        showMessage('✨ جميع الحروف مكشوفة بالفعل!', 'info');
        return;
    }
    
    // كشف الحرف
    const correctLetter = answerNoSpaces[emptyIndex];
    gameState.hintedPositions.push(emptyIndex);
    
    // إضافة الحرف المكشوف إلى slots
    slots[emptyIndex].textContent = correctLetter;
    slots[emptyIndex].style.background = 'rgba(16,185,129,0.2)';
    slots[emptyIndex].style.borderColor = '#10b981';
    
    // خصم النقاط
    gameState.points -= 5;
    document.getElementById('hudPoints').textContent = gameState.points;
    showMessage(`🔍 تم كشف حرف "${correctLetter}" -5 نقاط`, 'info');
}
