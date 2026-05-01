// ========================================
// hepta-svt - APP.JS
// التطبيق الرئيسي (تسجيل، تنقل، كاروسيل)
// ========================================

// ---------- 1. تسجيل الدخول ----------
let playerName = '';

function submitName() {
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    
    if (firstName.length < 2 || lastName.length < 2) {
        showMessage('الرجاء إدخال الاسم والنسب (حرفين على الأقل)', 'error');
        return;
    }
    
    playerName = firstName + ' ' + lastName;
    localStorage.setItem('heptaPlayerName', playerName);
    
    document.getElementById('userNameText').textContent = playerName;
    document.getElementById('userNameDisplay').style.display = 'block';
    document.getElementById('nameScreen').classList.remove('active');
    document.getElementById('dashboard').classList.add('active');
    
    showMessage(`👋 مرحباً ${firstName}!`, 'success');
    startCarousel();
}

// التحقق من وجود مستخدم مسجل مسبقاً
const savedName = localStorage.getItem('heptaPlayerName');
if (savedName) {
    playerName = savedName;
    document.getElementById('userNameText').textContent = playerName;
    document.getElementById('userNameDisplay').style.display = 'block';
    document.getElementById('nameScreen').classList.remove('active');
    document.getElementById('dashboard').classList.add('active');
    startCarousel();
}

// ---------- 2. التنقل بين الصفحات ----------
function navigateTo(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    closeSidebar();
    window.scrollTo(0, 0);
}

function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('active');
    document.getElementById('sidebarOverlay').classList.toggle('active');
}

function closeSidebar() {
    document.getElementById('sidebar').classList.remove('active');
    document.getElementById('sidebarOverlay').classList.remove('active');
}

function logout() {
    localStorage.removeItem('heptaPlayerName');
    location.reload();
}

// ---------- 3. الكاروسيل ----------
let carouselTimer = null;
let currentCardIndex = 0;

function showCard(index) {
    const cards = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    if (!cards.length) return;
    
    cards.forEach((card, i) => {
        if (i === index) {
            card.style.opacity = '1';
            card.style.visibility = 'visible';
            card.style.zIndex = '2';
        } else {
            card.style.opacity = '0';
            card.style.visibility = 'hidden';
            card.style.zIndex = '1';
        }
    });
    
    dots.forEach((dot, i) => {
        dot.style.background = i === index ? 'var(--primary)' : 'rgba(255,255,255,0.3)';
        dot.style.transform = i === index ? 'scale(1.3)' : 'scale(1)';
    });
}

function startCarousel() {
    if (carouselTimer) clearInterval(carouselTimer);
    carouselTimer = setInterval(() => {
        currentCardIndex = (currentCardIndex + 1) % 5;
        showCard(currentCardIndex);
    }, 4000);
}

function stopCarousel() {
    if (carouselTimer) {
        clearInterval(carouselTimer);
        carouselTimer = null;
    }
}

function goToCard(index) {
    currentCardIndex = index;
    showCard(currentCardIndex);
    stopCarousel();
    startCarousel();
}

// بدء الكاروسيل إذا كنا في الصفحة الرئيسية
if (document.getElementById('dashboard').classList.contains('active')) {
    startCarousel();
}

// ---------- 4. عرض الصور ----------
function showImage(imagePath, title = 'صورة') {
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.9);z-index:10000;display:flex;align-items:center;justify-content:center;cursor:pointer;';
    overlay.onclick = () => overlay.remove();
    
    const img = document.createElement('img');
    img.src = imagePath;
    img.style.cssText = 'max-width:90%;max-height:90%;border-radius:16px;';
    img.onerror = () => {
        img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"%3E%3Crect x="3" y="3" width="18" height="18" rx="2"/%3E%3Ccircle cx="8.5" cy="8.5" r="1.5"/%3E%3Cpath d="M21 15l-5-4-3 3-4-4-6 6"/%3E%3C/svg%3E';
        img.style.width = '100px';
    };
    
    overlay.appendChild(img);
    document.body.appendChild(overlay);
}

// ربط دوال اللعبة والاختبارات بالـ window
window.startLevel = startLevel;
window.startQuiz = startQuiz;
window.navigateTo = navigateTo;
window.toggleSidebar = toggleSidebar;
window.closeSidebar = closeSidebar;
window.logout = logout;
window.goToCard = goToCard;
window.showImage = showImage;
window.submitName = submitName;
