
// บังคับให้หน้าเว็บโหลดกลับไปที่จุดบนสุดเสมอ (ปิดการจำตำแหน่งเดิมของเบราว์เซอร์)
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

// โค้ดอื่นๆ ของพี่คิวต่อจากตรงนี้...


// 1. ลูกเล่น Typing Effect พิมพ์ข้อความอัตโนมัติ (ใส่ทักษะของคุณเข้าไปครบถ้วน)
const typingText = document.querySelector(".typing-text");
const phrases = [
    "IT Support Specialist", 
    "Web Developer (PHP/JS)", 
    "Database Manager", 
    "Graphic Designer"
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function type() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50; 
    } else {
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100; 
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typeSpeed = 2500; // หยุดพักให้อ่าน 2.5 วินาที
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
}
document.addEventListener("DOMContentLoaded", type);

// 2. ระบบ Navbar มือถือ
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = hamburger.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.querySelector('i').classList.add('fa-bars');
        hamburger.querySelector('i').classList.remove('fa-times');
    });
});

// 3. ระบบ Dark Mode (โหมดกลางคืน)
const themeBtn = document.getElementById('theme-toggle');
const body = document.body;

if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    themeBtn.innerHTML = '<i class="fas fa-sun" style="color: #FFD700;"></i>';
}

themeBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    let theme = 'light';
    if (body.classList.contains('dark-mode')) {
        theme = 'dark';
        themeBtn.innerHTML = '<i class="fas fa-sun" style="color: #FFD700;"></i>';
    } else {
        themeBtn.innerHTML = '<i class="fas fa-moon"></i>';
    }
    localStorage.setItem('theme', theme);
});

// 4. แอนิเมชันตอนเลื่อนหน้าจอ (Scroll Reveal)
function reveal() {
    // ✅ แก้ไขชื่อคลาสให้ตรงกับ HTML (.reveal-apple)
    const reveals = document.querySelectorAll('.reveal-apple'); 
    const windowHeight = window.innerHeight;
    
    reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 120; // ระยะที่เริ่มแสดงผล

        if (elementTop < windowHeight - elementVisible) {
            // ✅ แก้ไขชื่อคลาสให้ตรงกับ CSS (.is-visible)
            element.classList.add('is-visible'); 
        }
    });
}
window.addEventListener('scroll', reveal);
window.addEventListener('load', reveal);

// 5. ระบบ 3D Card (VanillaTilt)
if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
        max: 12,
        speed: 300,
        glare: true,
        "max-glare": 0.15,
        perspective: 1000,
        scale: 1.03
    });
}
// 6. ระบบเปิด-ปิด Pop-up Resume
function openResumeModal() {
    document.getElementById('resumeModal').classList.add('show');
    // ป้องกันไม่ให้หน้าเว็บด้านหลังเลื่อนได้ตอนเปิด Pop-up
    document.body.style.overflow = 'hidden'; 
}

function closeResumeModal() {
    document.getElementById('resumeModal').classList.remove('show');
    // คืนค่าให้หน้าเว็บเลื่อนได้ปกติ
    document.body.style.overflow = 'auto'; 
}

// ปิด Pop-up อัตโนมัติเมื่อคลิกพื้นที่ว่างด้านนอกกล่อง
window.addEventListener('click', function(event) {
    const modal = document.getElementById('resumeModal');
    if (event.target === modal) {
        closeResumeModal();
    }
});
