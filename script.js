// Data nunții: 5 Septembrie 2026, 19:00
const weddingDate = new Date("Sep 5, 2026 19:00:00").getTime();

const timer = setInterval(function() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    // Calcul zile, ore, minute, secunde
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Afișare în pagină (cu '0' în față pentru numerele < 10)
    document.getElementById("days").innerText = days < 10 ? "0" + days : days;
    document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
    document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
    document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;

    // Oprire timer când data a trecut
    if (distance < 0) {
        clearInterval(timer);
        document.getElementById("countdown").innerHTML = "<div style='color: white; font-size: 1.5rem; font-family: Oswald;'>Let the party begin!</div>";
    }
}, 1000);