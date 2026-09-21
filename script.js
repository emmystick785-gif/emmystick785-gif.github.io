
// =====================================
// EMMYSTICK PORTFOLIO
// JAVASCRIPT
// =====================================


// 1. AUTOMATIC COPYRIGHT YEAR

const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


// 2. MOBILE NAVIGATION

const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav-link");


if (menuToggle && navMenu) {

    // Open and close the mobile menu
    menuToggle.addEventListener("click", () => {

        const isOpen = navMenu.classList.toggle("show");

        menuToggle.setAttribute("aria-expanded", isOpen);

        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation" : "Open navigation"
        );

        // Change hamburger icon to close icon
        menuToggle.innerHTML = isOpen
            ? '<i class="fas fa-times"></i>'
            : '<i class="fas fa-bars"></i>';

    });


    // Close menu after clicking a navigation link
    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("show");

            menuToggle.setAttribute("aria-expanded", "false");

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation"
            );

            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';

        });

    });


    // Close menu when clicking outside navigation
    document.addEventListener("click", event => {

        const clickedInsideMenu = navMenu.contains(event.target);
        const clickedToggle = menuToggle.contains(event.target);

        if (!clickedInsideMenu && !clickedToggle) {

            navMenu.classList.remove("show");

            menuToggle.setAttribute("aria-expanded", "false");

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation"
            );

            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }

    });

}


// 3. SCROLL REVEAL ANIMATION

const revealElements = document.querySelectorAll(".reveal");


if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    // Stop observing once revealed
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

    // Fallback for older browsers
    revealElements.forEach(element => {
        element.classList.add("visible");
    });

}


// 4. ACTIVE NAVIGATION ON SCROLL

const pageSections = document.querySelectorAll(
    "main section[id]"
);


function updateActiveLink() {

    let currentSection = "home";

    pageSections.forEach(section => {

        const sectionTop = section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {

            currentSection = section.id;

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") === `#${currentSection}`
        ) {

            link.classList.add("active");

        }

    });

}


// Update active link when scrolling
window.addEventListener("scroll", updateActiveLink, {
    passive: true
});


// Set correct active link on initial page load
updateActiveLink();


// 5. CONSOLE WELCOME MESSAGE

console.log(
    "%cWelcome to Emmystick's Portfolio!",
    "color: #829bff; font-size: 18px; font-weight: bold;"
);

console.log(
    "Learning • Building • Connecting."
);
                                
