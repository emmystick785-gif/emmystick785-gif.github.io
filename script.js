
// =====================================
// EMMYSTICK PROFESSIONAL PORTFOLIO
// Interactive JavaScript
// =====================================

document.addEventListener("DOMContentLoaded", function () {

    // MOBILE NAVIGATION MENU
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", function () {
            navLinks.classList.toggle("active");

            const isOpen = navLinks.classList.contains("active");

            menuToggle.setAttribute("aria-expanded", isOpen);
            menuToggle.innerHTML = isOpen ? "&times;" : "&#9776;";
        });

        // Close menu after clicking a navigation link
        navLinks.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", function () {
                navLinks.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.innerHTML = "&#9776;";
            });

        });
    }

    // SCROLL REVEAL ANIMATION
    const revealElements = document.querySelectorAll(
        "section, .skill-card, .project-card, .about-card"
    );

    revealElements.forEach(function (element) {
        element.classList.add("reveal");
    });

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    observer.unobserve(entry.target);
                }

            });

        }, {
            threshold: 0.12
        });

        revealElements.forEach(function (element) {
            observer.observe(element);
        });

    } else {
        revealElements.forEach(function (element) {
            element.classList.add("show");
        });
    }

    // ACTIVE NAVIGATION LINK
    const sections = document.querySelectorAll("section[id]");
    const navItems = document.querySelectorAll(".nav-links a");

    function updateActiveLink() {

        let currentSection = "";

        sections.forEach(function (section) {

            const sectionTop = section.offsetTop - 150;

            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute("id");
            }

        });

        navItems.forEach(function (link) {

            link.classList.remove("active");

            if (
                link.getAttribute("href") === "#" + currentSection
            ) {
                link.classList.add("active");
            }

        });
    }

    window.addEventListener("scroll", updateActiveLink);
    updateActiveLink();

    // CURRENT YEAR IN FOOTER
    const yearElement = document.querySelector("#year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // CONTACT FORM VALIDATION
    const contactForm = document.querySelector(".contact-form");

    if (contactForm) {

        contactForm.addEventListener("submit", function (event) {

            event.preventDefault();

            if (!contactForm.checkValidity()) {
                contactForm.reportValidity();
                return;
            }

            const name = contactForm.querySelector(
                '[name="name"], #name'
            );

            const email = contactForm.querySelector(
                '[name="email"], #email'
            );

            const message = contactForm.querySelector(
                '[name="message"], #message'
            );

            if (!name || !email || !message) {
                alert("Please check your contact form fields.");
                return;
            }

            // Open the visitor's email application
            const subject = encodeURIComponent(
                "Portfolio Contact from " + name.value.trim()
            );

            const body = encodeURIComponent(
                "Name: " + name.value.trim() +
                "\nEmail: " + email.value.trim() +
                "\n\nMessage:\n" + message.value.trim()
            );

            const mailtoLink =
                "mailto:emmystick785@gmail.com" +
                "?subject=" + subject +
                "&body=" + body;

            window.location.href = mailtoLink;
        });
    }

    // BACK TO TOP BUTTON
    const backToTop = document.querySelector("#backToTop");

    if (backToTop) {

        window.addEventListener("scroll", function () {
            backToTop.style.display =
                window.scrollY > 400 ? "block" : "none";
        });

        backToTop.addEventListener("click", function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

});
