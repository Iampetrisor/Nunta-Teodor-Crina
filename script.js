// Așteptăm ca tot HTML-ul să fie încărcat înainte să rulăm scriptul principal
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


// --- 3. Generare fisier Calendar (Apple / Outlook) ---
// Aceasta functie sta in afara DOMContentLoaded pentru a putea fi apelata de buton
window.downloadICS = function() {
    // Formatul standard iCalendar. Orele sunt in format UTC.
    // 5 Septembrie 2026, 15:00 ora Romaniei (EEST) = 12:00 UTC
    // Terminare estimata a doua zi la 06:00 RO = 03:00 UTC
    const eventDetails = 
"BEGIN:VCALENDAR\n" +
"VERSION:2.0\n" +
"PRODID:-//Nunta Teodor si Crina//RO\n" +
"BEGIN:VEVENT\n" +
"UID:nunta-teodor-crina-2026\n" +
"DTSTAMP:20260217T120000Z\n" +
"DTSTART:20260905T120000Z\n" +
"DTEND:20260906T030000Z\n" +
"SUMMARY:Nunta Teodor & Crina\n" +
"DESCRIPTION:Vă așteptăm cu drag! Detalii și program pe https://teodorcrina.xyz/\n" +
"LOCATION:Piatra Neamt, Romania\n" +
"END:VEVENT\n" +
"END:VCALENDAR";

    // Cream un fisier invizibil si il descarcam fortat
    const blob = new Blob([eventDetails], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'nunta_teodor_crina.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};