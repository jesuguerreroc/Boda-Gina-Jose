document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. HERO SLIDER (Crossfade) ---
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    const slideInterval = 5000; // 5 segundos

    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    setInterval(nextSlide, slideInterval);

    // --- 2. CONTEO REGRESIVO ---
    const targetDate = new Date("March 21, 2026 17:00:00").getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference < 0) {
            document.getElementById("countdown").innerHTML = "¡Es hoy!";
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = days < 10 ? "0" + days : days;
        document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
        document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
        document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;
    }

    setInterval(updateCountdown, 1000);
    updateCountdown(); // Ejecutar inmediatamente

    // --- 3. ANIMACIONES AL SCROLL (Intersection Observer) ---
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-up');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Solo animar una vez
            }
        });
    }, {
        threshold: 0.15 // Disparar cuando el 15% del elemento sea visible
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // --- 4. RSVP FORMULARIO ---
    const rsvpForm = document.getElementById('rsvpForm');
    
    rsvpForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const btn = rsvpForm.querySelector('button');
        const originalText = btn.innerText;

        // Simulación de envío
        btn.innerText = "Enviando...";
        btn.style.opacity = "0.7";

        setTimeout(() => {
            alert(`¡Gracias ${name}! Hemos recibido tu confirmación para Punta Cana.`);
            rsvpForm.reset();
            btn.innerText = "¡Confirmado!";
            btn.style.backgroundColor = "#d4af37"; // Gold
            
            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.backgroundColor = "";
                btn.style.opacity = "1";
            }, 3000);
        }, 1500);
    });
});

// --- NAVBAR SCROLL EFFECT ---
const navbar = document.getElementById('navbar');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    // Si bajamos más de 100px, mostrar la barra
    if (window.scrollY > 100) {
        navbar.classList.add('visible');
    } else {
        // Si estamos arriba del todo, ocultarla
        navbar.classList.remove('visible');
    }
    
    lastScrollY = window.scrollY;
});

/* --- CAMBIAR COLOR DE FONDO DRESS CODE --- */
function changeBg(color) {
    const section = document.getElementById('dresscode');
    section.style.backgroundColor = color;
    
    // Opcional: Si el color es oscuro, podríamos cambiar el borde de la tarjeta,
    // pero como la tarjeta es blanca, siempre se verá bien.
}