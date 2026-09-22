I'm
// ============================================
// EMMYSTICK PORTFOLIO
// Interactive JavaScript
// ============================================

document.addEventListener("DOMContentLoaded", () => {

    // ---------- ELEMENTS ----------

    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");
    const navItems = document.querySelectorAll(".nav-link");

    const themeToggle = document.getElementById("theme-toggle");
    const backToTop = document.getElementById("back-to-top");

    const yearElement = document.getElementById("year");


    // ---------- CURRENT YEAR ----------

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    // ---------- MOBILE NAVIGATION ----------

    function closeMenu() {
        navLinks.classList.remove("open");
        document.body.classList.remove("menu-open");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");

        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    }

    function openMenu() {
        navLinks.classList.add("open");
        document.body.classList.add("menu-open");

        menuToggle.setAttribute("aria-expanded", "true");
        menuToggle.setAttribute("aria-label", "Close navigation menu");

        menuToggle.innerHTML = '<i class="fas fa-xmark"></i>';
    }

    menuToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.contains("open");

        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    });


    // Close menu after selecting a section

    navItems.forEach((link) => {
        link.addEventListener("click", () => {
            closeMenu();
        });
    });


    // Close menu when tapping outside it

    document.addEventListener("click", (event) => {
        const clickedInsideMenu = navLinks.contains(event.target);
        const clickedToggle = menuToggle.contains(event.target);

        if (
            navLinks.classList.contains("open") &&
            !clickedInsideMenu &&
            !clickedToggle
        ) {
            closeMenu();
        }
    });


    // Reset mobile menu when returning to desktop

    window.addEventListener("resize", () => {
        if (window.innerWidth > 760) {
            closeMenu();
        }
    });


    // ---------- DARK / LIGHT THEME ----------

    const savedTheme = localStorage.getItem("emmystick-theme");

    if (savedTheme === "light") {
        document.body.classList.add("light-theme");
    }

    function updateThemeIcon() {
        const isLight = document.body.classList.contains("light-theme");

        themeToggle.innerHTML = isLight
            ? '<i class="fas fa-sun"></i>'
            : '<i class="fas fa-moon"></i>';

        themeToggle.setAttribute(
            "aria-label",
            isLight ? "Switch to dark theme" : "Switch to light theme"
        );
    }

    updateThemeIcon();

    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("light-theme");

        const isLight = document.body.classList.contains("light-theme");

        localStorage.setItem(
            "emmystick-theme",
            isLight ? "light" : "dark"
        );

        updateThemeIcon();
    });


    // ---------- ACTIVE NAVIGATION ----------

    const sections = document.querySelectorAll("main section[id]");

    function updateActiveLink() {

        let currentSection = "home";

        sections.forEach((section) => {

            const sectionTop = section.offsetTop - 150;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionBottom
            ) {
                currentSection = section.id;
            }
        });

        navItems.forEach((link) => {

            const isActive =
                link.getAttribute("href") === `#${currentSection}`;

            link.classList.toggle("active", isActive);
        });
    }


    // ---------- BACK TO TOP ----------

    function handleScroll() {

        updateActiveLink();

        if (window.scrollY > 450) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }
    }

    window.addEventListener("scroll", handleScroll, {
        passive: true
    });

    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });


    // ---------- SCROLL REVEAL ANIMATIONS ----------

    const revealElements = document.querySelectorAll(
        ".section-heading, .about-card, .skill-card, " +
        ".project-card, .contact-wrapper"
    );

    // Add animation styles only when JavaScript is available

    document.body.classList.add("js-ready");

    revealElements.forEach((element) => {
        element.classList.add("reveal");
    });

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);
                    }
                });

            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach((element) => {
            revealObserver.observe(element);
        });

    } else {

        // Fallback for browsers without IntersectionObserver

        revealElements.forEach((element) => {
            element.classList.add("visible");
        });
    }


    // ---------- INITIALIZE ----------

    handleScroll();

});
// ---------- BACK TO TOP BUTTON ----------
const backToTop = document.querySelector("#backToTop");

if (backToTop) {
    backToTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

// ---------- FOOTER YEAR ----------
const yearElement = document.querySelector("#year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// ---------- CONTACT FORM ----------
const contactForm = document.querySelector("#contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.querySelector("#name")?.value.trim();
        const email = document.querySelector("#email")?.value.trim();
        const message = document.querySelector("#message")?.value.trim();

        if (!name || !email || !message) {
            alert("Please fill in all fields.");
            return;
        }

        const subject = encodeURIComponent(
            `Portfolio Contact from ${name}`
        );

        const body = encodeURIComponent(
            `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
        );

        window.location.href =
            `mailto:emmystick785@gmail.com?subject=${subject}&body=${body}`;
    });
}

// ---------- INITIAL PAGE SETUP ----------
handleScroll();

});
 