
/* =========================================
   EMMYSTICK PORTFOLIO — JAVASCRIPT
   Interactive Website Functionality
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

    // ---------- SELECT ELEMENTS ----------

    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");
    const backToTop = document.querySelector(".back-to-top");
    const header = document.querySelector(".header");
    const revealElements = document.querySelectorAll(".reveal");
    const sections = document.querySelectorAll("section[id]");


    // ---------- MOBILE NAVIGATION ----------

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", () => {
            const isOpen = navMenu.classList.toggle("active");

            menuToggle.classList.toggle("active", isOpen);

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            // Change menu icon
            const icon = menuToggle.querySelector("i");

            if (icon) {
                icon.classList.toggle("fa-bars", !isOpen);
                icon.classList.toggle("fa-xmark", isOpen);
            }
        });

        // Close menu after clicking a navigation link
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("active");
                menuToggle.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                const icon = menuToggle.querySelector("i");

                if (icon) {
                    icon.classList.add("fa-bars");
                    icon.classList.remove("fa-xmark");
                }
            });
        });

        // Close menu when clicking outside it
        document.addEventListener("click", event => {
            if (
                navMenu.classList.contains("active") &&
                !navMenu.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {
                navMenu.classList.remove("active");
                menuToggle.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                const icon = menuToggle.querySelector("i");

                if (icon) {
                    icon.classList.add("fa-bars");
                    icon.classList.remove("fa-xmark");
                }
            }
        });
    }


    // ---------- HEADER SCROLL EFFECT ----------

    function handleHeaderScroll() {
        if (!header) return;

        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }


    // ---------- BACK TO TOP BUTTON ----------

    function handleBackToTop() {
        if (!backToTop) return;

        if (window.scrollY > 400) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }
    }

    if (backToTop) {
        backToTop.addEventListener("click", event => {
            event.preventDefault();

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }


    // ---------- SCROLL REVEAL ANIMATIONS ----------

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("active");

                        observer.unobserve(entry.target);
                    }
                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });

    } else {
        // Fallback for older browsers
        revealElements.forEach(element => {
            element.classList.add("active");
        });
    }


    // ---------- ACTIVE NAVIGATION LINK ----------

    function updateActiveNav() {

        let currentSection = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {
                currentSection = section.getAttribute("id");
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


    // ---------- TYPING EFFECT ----------

    const typingElement = document.querySelector(".typing-text");

    if (typingElement) {

        const words = [
            "Aspiring Web Developer",
            "AI Visual Creator",
            "Creative Thinker",
            "Drummer"
        ];

        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeEffect() {

            const currentWord = words[wordIndex];

            if (isDeleting) {
                charIndex--;
            } else {
                charIndex++;
            }

            typingElement.textContent =
                currentWord.substring(0, charIndex);

            let typingSpeed = isDeleting ? 45 : 90;

            // Pause after completing a word
            if (!isDeleting && charIndex === currentWord.length) {
                typingSpeed = 1500;
                isDeleting = true;
            }

            // Move to the next word
            else if (isDeleting && charIndex === 0) {
                isDeleting = false;

                wordIndex = (wordIndex + 1) % words.length;

                typingSpeed = 400;
            }

            setTimeout(typeEffect, typingSpeed);
        }

        typeEffect();
    }


    // ---------- PROJECT CARD INTERACTION ----------

    const projectCards = document.querySelectorAll(".project-card");

    projectCards.forEach(card => {

        card.addEventListener("mouseenter", () => {
            card.classList.add("project-hover");
        });

        card.addEventListener("mouseleave", () => {
            card.classList.remove("project-hover");
        });

    });


    // ---------- CONTACT FORM ----------

    const contactForm = document.querySelector(".contact-form");

    if (contactForm) {

        contactForm.addEventListener("submit", event => {

            event.preventDefault();

            const nameInput = contactForm.querySelector(
                'input[name="name"]'
            );

            const emailInput = contactForm.querySelector(
                'input[name="email"]'
            );

            const messageInput = contactForm.querySelector(
                'textarea[name="message"]'
            );

            // Check that required fields exist
            if (!nameInput || !emailInput || !messageInput) {
                alert(
                    "Please check your contact form field names."
                );
                return;
            }

            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const message = messageInput.value.trim();

            // Basic validation
            if (!name || !email || !message) {
                alert("Please fill in all fields.");
                return;
            }

            // Email format validation
            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(email)) {
                alert("Please enter a valid email address.");
                return;
            }

            // Prepare email
            const subject = encodeURIComponent(
                `Portfolio Message from ${name}`
            );

            const body = encodeURIComponent(
                `Name: ${name}\n` +
                `Email: ${email}\n\n` +
                `Message:\n${message}`
            );

            const mailtoLink =
                `mailto:emmystick785@gmail.com` +
                `?subject=${subject}&body=${body}`;

            // Open the visitor's email application
            window.location.href = mailtoLink;

        });
    }


    // ---------- CURRENT YEAR ----------

    const yearElement = document.querySelector("#year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    // ---------- SCROLL EVENT HANDLER ----------

    function handleScroll() {
        handleHeaderScroll();
        handleBackToTop();
        updateActiveNav();
    }

    window.addEventListener("scroll", handleScroll, {
        passive: true
    });


    // ---------- INITIALIZE ----------

    handleScroll();

});

