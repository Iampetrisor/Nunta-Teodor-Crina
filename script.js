// --- 1. Configurare Carusel (Swiper) ---
var swiper = new Swiper(".mySwiper", {
    spaceBetween: 0,
    centeredSlides: true,
    speed: 1500, /* Viteza tranziției */
    effect: "fade", /* Efect de crossfade */
    fadeEffect: {
        crossFade: true
    },
    autoplay: {
        delay: 4000, /* Timpul pe ecran */
        disableOnInteraction: false,
    },
    loop: true, /* Se repetă la infinit */
});

// --- 2. Configurare Countdown ---
const weddingDate = new Date("2026-09-05T15:00:00").getTime();

const x = setInterval(function() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if(document.getElementById("days")) {
        document.getElementById("days").innerHTML = days;
        document.getElementById("hours").innerHTML = hours;
        document.getElementById("minutes").innerHTML = minutes;
        document.getElementById("seconds").innerHTML = seconds;
    }

    if (distance < 0) {
        clearInterval(x);
        if(document.getElementById("countdown")) {
            document.getElementById("countdown").innerHTML = "<h2 style='color:#333; padding: 20px;'>Ziua cea mare a sosit!</h2>";
        }
    }
}, 1000);