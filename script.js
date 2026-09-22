
document.addEventListener("DOMContentLoaded", () => {

    // ---------- ELEMENTS ----------
    const header = document.querySelector(".header");
    const menuToggle =
        document.querySelector("#menuToggle") ||
        document.querySelector("#menu-toggle") ||
        document.querySelector("#menu-btn") ||
        document.querySelector(".menu-toggle") ||
        document.querySelector(".menu-btn");

    const navMenu =
        document.querySelector("#navMenu") ||
        document.querySelector("#nav-links") ||
        document.querySelector("#navMenu") ||
        document.querySelector(".nav-menu") ||
        document.querySelector(".nav-links");

    const backTop =
        document.querySelector("#backTop") ||
        document.querySelector("#back-to-top") ||
        document.querySelector(".back-to-top");

    // ---------- CURRENT YEAR ----------
    const year = document.querySelector("#currentYear") ||
                 document.querySelector("#year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }

    // ---------- MOBILE NAVIGATION ----------
    function closeMenu() {
        if (!navMenu) return;

        navMenu.classList.remove("show");

        if (menuToggle) {
            menuToggle.setAttribute("aria-expanded", "false");

            const icon = menuToggle.querySelector("i");
            if (icon) {
                icon.classList.remove("fa-times", "fa-xmark");
                icon.classList.add("fa-bars");
            }
        }
    }

    if (menuToggle && navMenu) {
        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.addEventListener("click", (event) => {
            event.stopPropagation();

            const isOpen = navMenu.classList.toggle("show");

            menuToggle.setAttribute("aria-expanded", String(isOpen));

            const icon = menuToggle.querySelector("i");

            if (icon) {
                icon.classList.toggle("fa-bars", !isOpen);
                icon.classList.toggle("fa-times", isOpen);
                icon.classList.toggle("fa-xmark", isOpen);
            }
        });

        navMenu.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", closeMenu);
        });

        document.addEventListener("click", (event) => {
            if (
                !navMenu.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {
                closeMenu();
            }
        });
    }

    // ---------- STICKY HEADER ----------
    function handleScroll() {
        if (header) {
            header.classList.toggle("scrolled", window.scrollY > 40);
        }

        if (backTop) {
            backTop.classList.toggle("show", window.scrollY > 450);
        }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });

    // ---------- BACK TO TOP ----------
    if (backTop) {
        backTop.addEventListener("click", (event) => {
            event.preventDefault();

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    // ---------- SCROLL REVEAL ----------
    const revealElements = document.querySelectorAll(
        ".section-header, .hero-content, .hero-visual, " +
        ".about-content, .about-image, .skill-card, " +
        ".project-card, .journey-card, .contact-info, " +
        ".contact-form, .stat-card"
    );

    revealElements.forEach(element => {
        element.classList.add("reveal");
    });

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12
        });

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    } else {
        revealElements.forEach(element => {
            element.classList.add("visible");
        });
    }

    // ---------- ACTIVE NAVIGATION ----------
    const sections = document.querySelectorAll("main section[id]");
    const navLinks = document.querySelectorAll(
        ".nav-link, .nav-menu a, .nav-links a"
    );

    if ("IntersectionObserver" in window) {
        const sectionObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                const currentId = entry.target.getAttribute("id");

                navLinks.forEach(link => {
                    const target = link.getAttribute("href");

                    link.classList.toggle(
                        "active",
                        target === `#${currentId}`
                    );
                });
            });
        }, {
            rootMargin: "-30% 0px -60% 0px"
        });

        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }

    // ---------- TYPING EFFECT ----------
    const typingText =
        document.querySelector("#typingText") ||
        document.querySelector(".typing-text");

    if (typingText) {
        const words = [
            "Aspiring Web Developer",
            "AI Visual Creator",
            "Creative Thinker",
            "Drummer"
        ];

        let wordIndex = 0;
        let charIndex = 0;
        let deleting = false;

        function typeEffect() {
            const currentWord = words[wordIndex];

            typingText.textContent = currentWord.substring(0, charIndex);

            if (!deleting) {
                charIndex++;

                if (charIndex > currentWord.length) {
                    deleting = true;
                    setTimeout(typeEffect, 1300);
                    return;
                }
            } else {
                charIndex--;

                if (charIndex < 0) {
                    charIndex = 0;
                    deleting = false;
                    wordIndex = (wordIndex + 1) % words.length;
                }
            }

            setTimeout(typeEffect, deleting ? 45 : 90);
        }

        typeEffect();
    }

    // ---------- CONTACT FORM ----------
    const contactForm = document.querySelector("#contactForm");
    const formStatus = document.querySelector("#formStatus");

    if (contactForm) {
        contactForm.addEventListener("submit", (event) => {
            event.preventDefault();

            if (!contactForm.checkValidity()) {
                contactForm.reportValidity();
                return;
            }

            const name = contactForm.querySelector(
                '[name="name"]'
            )?.value.trim();

            const email = contactForm.querySelector(
                '[name="email"]'
            )?.value.trim();

            const subject = contactForm.querySelector(
                '[name="subject"]'
            )?.value.trim();

            const message = contactForm.querySelector(
                '[name="message"]'
            )?.value.trim();

            if (!name || !email || !subject || !message) {
                if (formStatus) {
                    formStatus.textContent =
                        "Please complete all fields.";
                }
                return;
            }

            const recipient = "emmystick785@gmail.com";

            const mailSubject = encodeURIComponent(subject);

            const mailBody = encodeURIComponent(
                `Hello Emmystick,\n\n${message}\n\n` +
                `From: ${name}\nEmail: ${email}`
            );

            if (formStatus) {
                formStatus.textContent =
                    "Opening your email app...";
            }

            window.location.href =
                `mailto:${recipient}?subject=${mailSubject}&body=${mailBody}`;
        });
    }

    // ---------- SMOOTH INTERNAL LINKS ----------
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", (event) => {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                event.preventDefault();

                targetElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

                history.replaceState(null, "", targetId);
            }
        });
    });

    // ---------- IMAGE FALLBACK ----------
    document.querySelectorAll("img").forEach(img => {
        img.addEventListener("error", () => {
            img.style.opacity = "0.35";
            img.alt = "Image unavailable";
        });
    });

    // ---------- INITIALIZE ----------
    handleScroll();

});
