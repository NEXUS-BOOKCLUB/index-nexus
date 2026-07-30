/* ==========================================================
   NEXUS BOOK CLUB
   SCRIPT.JS
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    console.log("Welcome to Nexus Book Club!");

    /* ==========================================
       Smooth Active Navigation
    ========================================== */

    const links = document.querySelectorAll("nav a");

    links.forEach(link => {

        link.addEventListener("click", () => {

            links.forEach(item => item.classList.remove("active"));

            link.classList.add("active");

        });

    });

    /* ==========================================
       Scroll Animation
    ========================================== */

    const sections = document.querySelectorAll("section");

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    }, {
        threshold: 0.15
    });

    sections.forEach(section => {

        observer.observe(section);

    });

});/* ==========================================
   SCROLL ANIMATIONS
========================================== */

section{

    opacity:0;

    transform:translateY(50px);

    transition:all .8s ease;

}

section.show{

    opacity:1;

    transform:translateY(0);

}

.hero{

    opacity:1;

    transform:none;

}