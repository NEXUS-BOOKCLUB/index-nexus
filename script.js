/* =====================================================
   NEXUS BOOK CLUB
   SCRIPT.JS
   Firebase + Navigation + Animations
===================================================== */

import { db } from "./firebase-config.js";

import {
    ref,
    onValue
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-database.js";


/* =====================================================
   FIREBASE — HOMEPAGE DATA
===================================================== */

const homepageRef = ref(db, "nexus/homepage");

onValue(homepageRef, (snapshot) => {

    const data = snapshot.val();

    if (!data) {
        console.log("No homepage data found.");
        return;
    }

    console.log("Nexus homepage data:", data);


    /* ===========================
       CURRENT BOOK
    =========================== */

    const bookTitle = document.querySelector("#currentBook");

    if (bookTitle && data.currentBook) {
        bookTitle.textContent = data.currentBook;
    }


    /* ===========================
       AUTHOR
    =========================== */

    const author = document.querySelector("#bookAuthor");

    if (author && data.author) {
        author.textContent = data.author;
    }


    /* ===========================
       BOOK COVER
    =========================== */

    const cover = document.querySelector("#bookCover");

    if (cover && data.cover) {
        cover.src = data.cover;
    }


    /* ===========================
       MEMBER COUNT
    =========================== */

    const members = document.querySelector("#memberCount");

    if (members && data.members !== undefined) {
        members.textContent = data.members;
    }


    /* ===========================
       READING PROGRESS
    =========================== */

    const progressText = document.querySelector("#readingProgress");

    const progressBar = document.querySelector("#progressFill");

    if (data.progress !== undefined) {

        const progress = Number(data.progress);

        if (progressText) {
            progressText.textContent = `${progress}%`;
        }

        if (progressBar) {

            progressBar.style.width = "0%";

            setTimeout(() => {

                progressBar.style.transition = "width 1.5s ease";

                progressBar.style.width = `${progress}%`;

            }, 300);
        }
    }


    /* ===========================
       ANNOUNCEMENT
    =========================== */

    const announcement = document.querySelector("#announcement");

    if (announcement && data.announcement) {

        if (typeof data.announcement === "string") {
            announcement.textContent = data.announcement;
        }

        else if (data.announcement.text) {
            announcement.textContent = data.announcement.text;
        }

    }

});


/* =====================================================
   STICKY HEADER SHADOW
===================================================== */

const header = document.querySelector("header");

if (header) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 40) {

            header.style.boxShadow =
                "0 10px 25px rgba(0,0,0,.10)";

        } else {

            header.style.boxShadow = "none";

        }

    });

}


/* =====================================================
   SMOOTH SCROLL
===================================================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        e.preventDefault();

        const target =
            document.querySelector(this.getAttribute("href"));

        if (target) {

            target.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

});


/* =====================================================
   FADE IN ON SCROLL
===================================================== */

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("fade-up");

        }

    });

}, {
    threshold: 0.15
});


document.querySelectorAll(
    ".section-title,.story-content,.story-image," +
    ".about-card,.growth-card,.value-card," +
    ".benefit-card,.book-cover,.book-info,.contact-card"
).forEach(el => {

    observer.observe(el);

});


/* =====================================================
   SCROLL TO TOP BUTTON
===================================================== */

const topButton = document.createElement("button");

topButton.innerHTML = "↑";

topButton.className = "scroll-top";

document.body.appendChild(topButton);

topButton.style.cssText = `
    position:fixed;
    bottom:25px;
    right:25px;
    width:55px;
    height:55px;
    border:none;
    border-radius:50%;
    background:#6F4E37;
    color:#fff;
    font-size:22px;
    cursor:pointer;
    display:none;
    z-index:9999;
    box-shadow:0 10px 25px rgba(0,0,0,.2);
    transition:.3s;
`;


window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        topButton.style.display = "block";

    } else {

        topButton.style.display = "none";

    }

});


topButton.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* =====================================================
   RANDOM BOOK QUOTES
===================================================== */

const quotes = [

    "Today a reader, tomorrow a leader.",

    "A room without books is like a body without a soul.",

    "Books are mirrors: you only see in them what you already have inside you.",

    "Reading is dreaming with open eyes.",

    "The journey of a lifetime begins with the turning of a page."

];


const quoteElement =
    document.querySelector(".quote blockquote");


if (quoteElement) {

    const random =
        Math.floor(Math.random() * quotes.length);

    quoteElement.textContent = quotes[random];

}


/* =====================================================
   FORM SUCCESS POPUP
===================================================== */

const forms = document.querySelectorAll("form");


forms.forEach(form => {

    form.addEventListener("submit", () => {

        localStorage.setItem(
            "nexusSuccess",
            "true"
        );

    });

});


window.addEventListener("load", () => {

    if (
        localStorage.getItem("nexusSuccess")
        === "true"
    ) {

        localStorage.removeItem("nexusSuccess");

        const popup =
            document.createElement("div");

        popup.innerHTML = `

            <div style="
                position:fixed;
                inset:0;
                background:rgba(0,0,0,.45);
                display:flex;
                justify-content:center;
                align-items:center;
                z-index:10000;
            ">

                <div style="
                    background:white;
                    width:90%;
                    max-width:430px;
                    padding:40px;
                    border-radius:22px;
                    text-align:center;
                    box-shadow:0 20px 60px rgba(0,0,0,.25);
                ">

                    <div style="font-size:65px;">
                        🎉
                    </div>

                    <h2 style="
                        margin:15px 0;
                        color:#6F4E37;
                    ">
                        Congratulations!
                    </h2>

                    <p>
                        Your submission has been received successfully.
                    </p>

                    <p>
                        Thank you for becoming part of the Nexus community.
                    </p>

                    <button id="closePopup"
                        style="
                        margin-top:20px;
                        padding:14px 28px;
                        border:none;
                        border-radius:40px;
                        background:#6F4E37;
                        color:white;
                        cursor:pointer;
                        font-size:16px;
                    ">

                        Continue Reading 📚

                    </button>

                </div>

            </div>

        `;

        document.body.appendChild(popup);


        document.getElementById("closePopup")
            .onclick = () => popup.remove();

    }

});