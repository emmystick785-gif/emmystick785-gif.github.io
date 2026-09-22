

// =====================================================
// EMMYSTICK PORTFOLIO
// Interactive JavaScript
// Matches index.html and style.css
// =====================================================

document.addEventListener("DOMContentLoaded", () => {

    // ================= SELECT ELEMENTS =================

    const preloader = document.getElementById("preloader");
    const header = document.getElementById("header");

    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    const typingText = document.getElementById("typing-text");

    const contactForm = document.getElementById("contact-form");
    const formNote = document.getElementById("form-note");

    const yearElement = document.getElementById("year");

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


    // ================= PRELOADER =================

    function hidePreloader() {
        if (preloader) {
            preloader.classList.add("hide");
        }
    }

    // Hide when the page has finished loading.
    window.addEventListener("load", hidePreloader);

    // Fallback in case the load event has already fired.
    if (document.readyState === "complete") {
        hidePreloader();
    }

    // Prevent the preloader from staying forever.
    setTimeout(hidePreloader, 3000);


    // ================= FOOTER YEAR =================

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    // ================= MOBILE NAVIGATION =================

    function openMenu() {
        navMenu.classList.add("active");
        menuToggle.classList.add("active");

        menuToggle.setAttribute("aria-expanded", "true");
        menuToggle.setAttribute("aria-label", "Close navigation menu");

        document.body.classList.add("menu-open");
    }

    function closeMenu() {
        navMenu.classList.remove("active");
        menuToggle.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");

        document.body.classList.remove("menu-open");
    }

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", () => {

            const isOpen = navMenu.classList.contains("active");

            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }

        });

        // Close menu when a navigation link is clicked.
        navLinks.forEach(link => {
            link.addEventListener("click", closeMenu);
        });

        // Close menu when Escape is pressed.
        document.addEventListener("keydown", event => {

            if (event.key === "Escape") {
                closeMenu();
            }

        });

        // Close menu if screen becomes desktop-sized.
        window.addEventListener("resize", () => {

            if (window.innerWidth > 800) {
                closeMenu();
            }

        });

    }


    // ================= HEADER SCROLL EFFECT =================

    function handleHeaderScroll() {

        if (!header) return;

        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    }

    window.addEventListener("scroll", handleHeaderScroll, {
        passive: true
    });

    handleHeaderScroll();


    // ================= ACTIVE NAVIGATION =================

    const sections = document.querySelectorAll("main section[id]");

    function updateActiveLink() {

        let currentSection = "home";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 150;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionBottom
            ) {
                currentSection = section.id;
            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            const linkTarget = link.getAttribute("href");

            if (linkTarget === `#${currentSection}`) {
                link.classList.add("active");
            }

        });

    }

    window.addEventListener("scroll", updateActiveLink, {
        passive: true
    });

    updateActiveLink();


    // ================= TYPING ANIMATION =================

    if (typingText) {

        const words = [
            "AI Visual Creator",
            "Web Developer in Progress",
            "Creative Thinker",
            "Passionate Drummer"
        ];

        let wordIndex = 0;
        let charIndex = words[0].length;
        let deleting = true;

        if (reduceMotion) {

            typingText.textContent = "AI Visual Creator";

        } else {

            function typeEffect() {

                const currentWord = words[wordIndex];

                if (deleting) {

                    charIndex--;

                } else {

                    charIndex++;

                }

                typingText.textContent = currentWord.substring(
                    0,
                    charIndex
                );

                let delay = deleting ? 45 : 85;

                // Pause after fully typing a word.
                if (!deleting && charIndex === currentWord.length) {

                    deleting = true;
                    delay = 1600;

                }

                // Move to the next word.
                else if (deleting && charIndex === 0) {

                    deleting = false;

                    wordIndex = (wordIndex + 1) % words.length;

                    delay = 350;

                }

                setTimeout(typeEffect, delay);

            }

            // Begin typing after a short pause.
            setTimeout(typeEffect, 1600);

        }

    }


    // ================= SCROLL REVEAL ANIMATIONS =================

    const revealElements = document.querySelectorAll(
        ".section-heading, " +
        ".about-content, " +
        ".info-card, " +
        ".skill-card, " +
        ".project-card, " +
        ".journey-item, " +
        ".contact-info, " +
        ".contact-form"
    );

    // Add animation classes only when JavaScript is available.
    if (!reduceMotion) {

        document.documentElement.classList.add("js-ready");

        revealElements.forEach(element => {
            element.classList.add("reveal");
        });

        if ("IntersectionObserver" in window) {

            const revealObserver = new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(entry => {

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

            revealElements.forEach(element => {
                revealObserver.observe(element);
            });

        } else {

            // Fallback for browsers without IntersectionObserver.
            revealElements.forEach(element => {
                element.classList.add("visible");
            });

        }

    }


    // ================= CONTACT FORM =================

    if (contactForm) {

        contactForm.addEventListener("submit", event => {

            event.preventDefault();

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const subject = document.getElementById("subject").value.trim();
            const message = document.getElementById("message").value.trim();

            // Basic form validation.
            if (!name || !email || !subject || !message) {

                if (formNote) {
                    formNote.textContent =
                        "Please fill in all fields before continuing.";
                }

                return;

            }

            // Prepare the email.
            const emailSubject = encodeURIComponent(subject);

            const emailBody = encodeURIComponent(
                "Hello Emmystick,\n\n" +
                message +
                "\n\nFrom: " + name +
                "\nEmail: " + email
            );

            const mailtoLink =
                "mailto:emmystick785@gmail.com" +
                "?subject=" + emailSubject +
                "&body=" + emailBody;

            if (formNote) {

                formNote.textContent =
                    "Opening your email app to prepare the message...";

            }

            // Open the visitor's default email application.
            window.location.href = mailtoLink;

        });

    }


    // ================= CONSOLE MESSAGE =================

    console.log(
        "%c Welcome to EMMYSTICK Portfolio! ",
        "background: #101727; color: #38d9ff; " +
        "font-size: 16px; font-weight: bold; padding: 10px;"
    );

    console.log(
        "Learning. Building. Growing. 🚀"
    );

});
 
 
            