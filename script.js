document.addEventListener('DOMContentLoaded', function() {

    // --- 1. Configurare Carusel (Swiper) ---
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
    const countdownElement = document.getElementById("countdown");

    if (countdownElement) {
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
                countdownElement.innerHTML = "<h2 style='color:#333; padding: 20px;'>Ziua cea mare a sosit!</h2>";
            }
        }, 1000);
    }

    // --- 3. LOGICA SMART OS (Aratam butonul corect in functie de telefon) ---
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const btnGoogle = document.getElementById('btn-google');
    const btnApple = document.getElementById('btn-apple');

    if (/android/i.test(userAgent)) {
        // E pe Android -> Ascundem Apple
        if(btnApple) btnApple.style.display = 'none';
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        // E pe iPhone/iPad -> Ascundem Google
        if(btnGoogle) btnGoogle.style.display = 'none';
    }
    // Daca e pe Laptop/Desktop, raman ambele vizibile.
});

// --- 4. Generare fisier Calendar (Apple / Outlook) ---
window.downloadICS = function() {
    const eventDetails = 
"BEGIN:VCALENDAR\n" +
"VERSION:2.0\n" +
"PRODID:-//Nunta Teodor si Crina//RO\n" +
"CALSCALE:GREGORIAN\n" +
"METHOD:PUBLISH\n" +
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

    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

    if (isIOS) {
        // Fixul SUPREM pentru iPhone (Safari + Chrome). Transformam textul intr-un Data URI
        const uri = 'data:text/calendar;charset=utf-8,' + encodeURIComponent(eventDetails);
        window.location.href = uri;
    } else {
        // Fallback standard pentru PC Outlook
        const blob = new Blob([eventDetails], { type: 'text/calendar;charset=utf-8' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.setAttribute('download', 'nunta_teodor_crina.ics');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
};