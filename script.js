// Așteptăm ca tot HTML-ul să fie încărcat înainte să rulăm scriptul
document.addEventListener('DOMContentLoaded', function() {

    // --- 1. Configurare Carusel (Swiper) ---
    // Verificăm dacă elementul caruselului există în pagină pentru a evita erori
    if (document.querySelector('.mySwiper')) {
        var swiper = new Swiper(".mySwiper", {
            spaceBetween: 0,
            centeredSlides: true,
            speed: 1500,
            effect: "fade",
            fadeEffect: {
                crossFade: true
            },
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            loop: true,
        });
    }

    // --- 2. Configurare Countdown ---
    const weddingDate = new Date("2026-09-05T15:00:00").getTime();
    
    // Verificăm dacă blocul de countdown există
    const countdownElement = document.getElementById("countdown");

    if (countdownElement) {
        const x = setInterval(function() {
            const now = new Date().getTime();
            const distance = weddingDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Funcție de siguranță pentru actualizarea numerelor
            if(document.getElementById("days")) {
                document.getElementById("days").innerHTML = days;
                document.getElementById("hours").innerHTML = hours;
                document.getElementById("minutes").innerHTML = minutes;
                document.getElementById("seconds").innerHTML = seconds;
            }

            if (distance < 0) {
                clearInterval(x);
                countdownElement.innerHTML = "<h2 style='color:#333; padding: 20px;'>Ziua cea mare a sosit!</h2>";
            }
        }, 1000);
    }
});