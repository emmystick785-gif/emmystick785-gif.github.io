/* =========================================
   EMMYSTICK PORTFOLIO
   Interactive JavaScript
========================================= */

"use strict";

document.addEventListener("DOMContentLoaded", () => {

    // =====================================
    // PAGE LOADER
    // =====================================

    const pageLoader = document.getElementById("pageLoader");

    function hideLoader() {
        if (pageLoader) {
            pageLoader.classList.add("loaded");
        }
    }

    window.addEventListener("load", hideLoader);

    // Fallback in case some external assets load slowly
    setTimeout(hideLoader, 2500);


    // =====================================
    // MOBILE NAVIGATION
    // =====================================

    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");
    const navLinks = document.querySelectorAll(".nav-link");
    const menuIcon = menuToggle?.querySelector("i");

    function openMenu() {
        navMenu.classList.add("active");
        menuToggle.setAttribute("aria-expanded", "true");
        menuToggle.setAttribute("aria-label", "Close navigation menu");
        document.body.classList.add("menu-open");

        if (menuIcon) {
            menuIcon.classList.replace("fa-bars", "fa-xmark");
        }
    }

    function closeMenu() {
        navMenu.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
        document.body.classList.remove("menu-open");

        if (menuIcon) {
            menuIcon.classList.replace("fa-xmark", "fa-bars");
        }
    }

    menuToggle?.addEventListener("click", () => {
        const isOpen = navMenu.classList.contains("active");

        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // Close menu when a navigation link is clicked
    navLinks.forEach(link => {
        link.addEventListener("click", closeMenu);
    });

    // Close menu when clicking outside it
    document.addEventListener("click", event => {
        if (
            navMenu?.classList.contains("active") &&
            !navMenu.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {
            closeMenu();
        }
    });

    // Close menu with Escape key
    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            closeMenu();
        }
    });

    // Close mobile navigation when returning to desktop
    window.addEventListener("resize", () => {
        if (window.innerWidth > 760) {
            closeMenu();
        }
    });


    // =====================================
    // STICKY HEADER
    // =====================================

    const header = document.getElementById("header");

    function updateHeader() {
        if (window.scrollY > 40) {
            header?.classList.add("scrolled");
        } else {
            header?.classList.remove("scrolled");
        }
    }

    window.addEventListener("scroll", updateHeader, {
        passive: true
    });

    updateHeader();


    // =====================================
    // SCROLL PROGRESS BAR
    // =====================================

    const scrollProgress = document.getElementById("scrollProgress");

    function updateScrollProgress() {
        const scrollableHeight =
            document.documentElement.scrollHeight - window.innerHeight;

        const progress = scrollableHeight > 0
            ? (window.scrollY / scrollableHeight) * 100
            : 0;

        if (scrollProgress) {
            scrollProgress.style.width = `${progress}%`;
        }
    }

    window.addEventListener("scroll", updateScrollProgress, {
        passive: true
    });

    updateScrollProgress();


    // =====================================
    // TYPING ANIMATION
    // =====================================

    const typingText = document.getElementById("typingText");

    const roles = [
        "Aspiring Web Developer",
        "AI Visual Creator",
        "Creative Thinker",
        "Drummer"
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeEffect() {
        if (!typingText) return;

        const currentRole = roles[roleIndex];

        if (deleting) {
            charIndex--;
        } else {
            charIndex++;
        }

        typingText.textContent = currentRole.substring(0, charIndex);

        let speed = deleting ? 45 : 85;

        if (!deleting && charIndex === currentRole.length) {
            deleting = true;
            speed = 1500;
        } else if (deleting && charIndex === 0) {
            deleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            speed = 400;
        }

        setTimeout(typeEffect, speed);
    }

    if (typingText) {
        typeEffect();
    }


    // =====================================
    // SCROLL REVEAL ANIMATIONS
    // =====================================

    const revealElements = document.querySelectorAll(".reveal");

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if ("IntersectionObserver" in window && !prefersReducedMotion) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");

                        // Animate each element only once
                        observer.unobserve(entry.target);
                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -35px 0px"
            }
        );

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });

    } else {

        revealElements.forEach(element => {
            element.classList.add("visible");
        });

    }


    // =====================================
    // STAGGERED CARD ANIMATIONS
    // =====================================

    const cardGroups = [
        ".skills-grid",
        ".projects-grid",
        ".journey-grid"
    ];

    cardGroups.forEach(selector => {

        const cards = document.querySelectorAll(
            `${selector} .reveal`
        );

        cards.forEach((card, index) => {
            card.style.transitionDelay = `${(index % 3) * 100}ms`;
        });

    });


    // =====================================
    // ACTIVE NAVIGATION ON SCROLL
    // =====================================

    const sections = document.querySelectorAll("main section[id]");

    if ("IntersectionObserver" in window) {

        const sectionObserver = new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        const currentId = entry.target.id;

                        navLinks.forEach(link => {

                            const linkTarget = link.getAttribute("href");

                            link.classList.toggle(
                                "active",
                                linkTarget === `#${currentId}`
                            );

                        });

                    }

                });

            },
            {
                rootMargin: "-30% 0px -60% 0px",
                threshold: 0
            }
        );

        sections.forEach(section => {
            sectionObserver.observe(section);
        });

    }


    // =====================================
    // BACK TO TOP BUTTON
    // =====================================

    const backTop = document.getElementById("backTop");

    function toggleBackTop() {
        if (window.scrollY > 500) {
            backTop?.classList.add("visible");
        } else {
            backTop?.classList.remove("visible");
        }
    }

    window.addEventListener("scroll", toggleBackTop, {
        passive: true
    });

    backTop?.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: prefersReducedMotion ? "auto" : "smooth"
        });
    });

    toggleBackTop();


    // =====================================
    // PROFILE IMAGE FALLBACK
    // =====================================

    const profileImage = document.getElementById("profileImage");
    const imageFallback = document.getElementById("imageFallback");

    function handleProfileImage() {

        if (!profileImage || !imageFallback) return;

        if (profileImage.complete && profileImage.naturalWidth === 0) {

            profileImage.style.display = "none";
            imageFallback.style.display = "flex";

        } else {

            profileImage.addEventListener("error", () => {
                profileImage.style.display = "none";
                imageFallback.style.display = "flex";
            });

            profileImage.addEventListener("load", () => {
                profileImage.style.display = "block";
                imageFallback.style.display = "none";
            });

        }

    }

    handleProfileImage();


    // =====================================
    // CONTACT FORM
    // Opens the user's email application
    // =====================================

    const contactForm = document.getElementById("contactForm");

    contactForm?.addEventListener("submit", event => {

        event.preventDefault();

        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !subject || !message) {
            alert("Please fill in all fields before sending.");
            return;
        }

        const recipient = "emmystick785@gmail.com";

        const emailSubject = encodeURIComponent(
            `${subject} — From ${name}`
        );

        const emailBody = encodeURIComponent(
            `Hello Emmystick,\n\n` +
            `${message}\n\n` +
            `From: ${name}\n` +
            `Email: ${email}`
        );

        const mailtoLink =
            `mailto:${recipient}?subject=${emailSubject}&body=${emailBody}`;

        window.location.href = mailtoLink;

    });


    // =====================================
    // CURRENT YEAR IN FOOTER
    // =====================================

    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    // =====================================
    // EXTERNAL LINKS SECURITY
    // =====================================

    document.querySelectorAll('a[target="_blank"]').forEach(link => {
        link.setAttribute("rel", "noopener noreferrer");
    });


    // =====================================
    // CONSOLE BRANDING
    // =====================================

    console.log(
        "%c EMMYSTICK ",
        "background: linear-gradient(135deg,#4385ff,#9b6dff); color: white; font-size: 20px; font-weight: bold; padding: 10px;"
    );

    console.log(
        "%cLearning. Building. Creating.",
        "color: #6da2ff; font-size: 13px;"
    );

});
