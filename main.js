/* ================= MOBILE MENU ================= */
function toggleMenu() {
    const nav = document.getElementById("navbar");
    if (nav) nav.classList.toggle("show");
}

/* ================= HERO TYPING LOOP ================= */
const typingElement = document.querySelector(".typing-text");

if (typingElement) {
    const roles = [
        "GIS & WebGIS Specialist",
        "Remote Sensing Analyst",
        "Forest & Wildlife GIS Expert",
        "Geospatial Application Developer"
    ];

    let roleIndex = 0;
    let charIndex = 0;

    function typeRole() {
        if (charIndex < roles[roleIndex].length) {
            typingElement.textContent += roles[roleIndex].charAt(charIndex);
            charIndex++;
            setTimeout(typeRole, 80);
        } else {
            setTimeout(eraseRole, 2000);
        }
    }

    function eraseRole() {
        if (charIndex > 0) {
            typingElement.textContent =
                roles[roleIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(eraseRole, 40);
        } else {
            roleIndex = (roleIndex + 1) % roles.length;
            setTimeout(typeRole, 500);
        }
    }

    typeRole();
}

/* ================= SCROLL + PARALLAX ================= */
const heroBg = document.querySelector(".hero-bg");
const reveals = document.querySelectorAll(".reveal, .timeline-item");

window.addEventListener("scroll", () => {
    const scrolled = window.scrollY;
    const windowHeight = window.innerHeight;

    /* Parallax */
    if (heroBg) {
        heroBg.style.transform =
            `translateY(${scrolled * 0.25}px) scale(1.2)`;
    }

    /* Reveal animation */
    reveals.forEach(el => {
        const top = el.getBoundingClientRect().top;
        if (top < windowHeight - 100) {
            el.classList.add("active");
        }
    });
});

/* ================= VIDEO POPUP ================= */
function openVideo(src) {
    const modal = document.getElementById("videoModal");
    const frame = document.getElementById("videoFrame");

    if (modal && frame) {
        frame.src = src;
        modal.style.display = "flex";
    }
}

function closeVideo() {
    const modal = document.getElementById("videoModal");
    const frame = document.getElementById("videoFrame");

    if (modal && frame) {
        frame.src = "";
        modal.style.display = "none";
    }
}

/* ================= DARK / LIGHT THEME ================= */
function toggleTheme() {
    document.body.classList.toggle("light");
    localStorage.setItem(
        "theme",
        document.body.classList.contains("light") ? "light" : "dark"
    );
}

window.addEventListener("load", () => {
    if (localStorage.getItem("theme") === "light") {
        document.body.classList.add("light");
    }
});

/* ================= PHOTO GALLERY INTERACTION ================= */
const gallery = document.querySelector(".photo-scroll");
const track = document.querySelector(".photo-track");

if (gallery && track) {
    let lastX = 0;

    gallery.addEventListener("mousemove", (e) => {
        const delta = e.clientX - lastX;

        /* Direction */
        if (delta > 0) {
            track.classList.remove("reverse");
        } else if (delta < 0) {
            track.classList.add("reverse");
        }

        /* Speed */
        const speed = Math.min(60, Math.max(15, 60 - Math.abs(delta)));
        track.style.animationDuration = `${speed}s`;

        lastX = e.clientX;
    });
}

/* ================= PHOTO DETAIL + MAP ================= */
let activeLat = null;
let activeLng = null;
let map = null;

function openPhoto(card) {
    document.getElementById("detailTitle").innerText = card.dataset.title;
    document.getElementById("detailDesc").innerText = card.dataset.desc;

    activeLat = card.dataset.lat;
    activeLng = card.dataset.lng;

    document.getElementById("photoDetail").style.display = "block";
    document.getElementById("mapBox").style.display = "none";
}

function showMap() {
    const mapBox = document.getElementById("mapBox");
    mapBox.style.display = "block";

    if (map) map.remove();

    map = L.map("mapBox").setView([activeLat, activeLng], 8);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap"
    }).addTo(map);

    L.marker([activeLat, activeLng])
        .addTo(map)
        .bindPopup("Photo Location")
        .openPopup();
}

/* ================= CATEGORY FILTER ================= */
function filterPhotos(category) {
    document.querySelectorAll(".photo-card").forEach(card => {
        card.style.display =
            category === "all" || card.dataset.category === category
                ? "block"
                : "none";
    });
}
