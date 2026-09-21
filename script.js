


// ==============================
// EMMYSTICK PORTFOLIO
// JavaScript
// ==============================


// MOBILE NAVIGATION

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const navItems = document.querySelectorAll(".nav-link");

menuToggle.addEventListener("click", () => {

    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", isOpen);

    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );

    menuToggle.textContent = isOpen ? "✕" : "☰";

});


// CLOSE MENU WHEN A LINK IS CLICKED

navItems.forEach((link) => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("open");

        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

        menuToggle.textContent = "☰";

    });

});


// UPDATE COPYRIGHT YEAR

const yearElement = document.getElementById("year");

yearElement.textContent = new Date().getFullYear();


// SCROLL REVEAL ANIMATION

const revealElements = document.querySelectorAll(".reveal");

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

    revealElements.forEach((element) => {
        element.classList.add("visible");
    });

}


// BACK TO TOP BUTTON

const backToTop = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {

    if (window.scrollY > 450) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

});


// ACTIVE NAVIGATION LINK

const pageSections = document.querySelectorAll("main section[id]");

if ("IntersectionObserver" in window) {

    const sectionObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    const sectionId = entry.target.id;

                    navItems.forEach((link) => {

                        link.classList.toggle(
                            "active",
                            link.getAttribute("href") === `#${sectionId}`
                        );

                    });

                }

            });

        },
        {
            rootMargin: "-25% 0px -60% 0px"
        }
    );

    pageSections.forEach((section) => {
        sectionObserver.observe(section);
    });

}
