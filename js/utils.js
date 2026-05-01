// ========================================
// hepta-svt - UTILS.JS
// دوال مساعدة (خلط، أصوات، تنبيهات)
// ========================================

// دالة خلط عشوائي للمصفوفات
function shuffleArray(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

// دالة عرض تنبيه مؤقت
function showMessage(text, type = 'info') {
    const colors = { success: '#10b981', error: '#ef4444', info: '#6366f1' };
    const msg = document.createElement('div');
    msg.textContent = text;
    msg.style.cssText = `position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:${colors[type]};color:white;padding:12px 24px;border-radius:12px;z-index:10000;font-weight:bold;box-shadow:0 4px 15px rgba(0,0,0,0.3);`;
    document.body.appendChild(msg);
    setTimeout(() => msg.remove(), 2500);
}

// نطق الكلمات (اختياري)
function speakText(text, lang = 'fr-FR') {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang;
        utterance.rate = 0.9;
        speechSynthesis.cancel();
        speechSynthesis.speak(utterance);
    }
}
