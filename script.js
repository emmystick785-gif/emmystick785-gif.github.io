
/* =========================================
   EMMYSTICK — PORTFOLIO INTERACTIONS
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

  // MOBILE NAVIGATION
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const navItems = document.querySelectorAll(".nav-link");

  function closeMenu() {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  }

  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation" : "Open navigation"
    );
  });

  navItems.forEach(link => {
    link.addEventListener("click", closeMenu);
  });

  // CLOSE MENU WHEN CLICKING OUTSIDE
  document.addEventListener("click", event => {
    if (
      !navLinks.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      closeMenu();
    }
  });

  // UPDATE FOOTER YEAR
  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // SCROLL REVEAL ANIMATIONS
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, observerInstance) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observerInstance.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12
      }
    );

    revealElements.forEach(element => {
      observer.observe(element);
    });

  } else {
    revealElements.forEach(element => {
      element.classList.add("visible");
    });
  }

  // BACK TO TOP BUTTON
  const backToTop = document.getElementById("backToTop");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 450) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
  }, { passive: true });

  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  // ACTIVE NAVIGATION LINK
  const sections = document.querySelectorAll("main section[id]");

  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const currentId = entry.target.id;

            navItems.forEach(link => {
              const isActive =
                link.getAttribute("href") === `#${currentId}`;

              link.classList.toggle("active", isActive);
            });
          }
        });
      },
      {
        rootMargin: "-25% 0px -60% 0px"
      }
    );

    sections.forEach(section => {
      sectionObserver.observe(section);
    });
  }

  // PROFILE IMAGE FALLBACK
  const profileImage = document.querySelector(".profile-image");

  profileImage.addEventListener("error", () => {
    profileImage.style.display = "none";

    const frame = document.querySelector(".image-frame");

    frame.style.minHeight = "300px";
    frame.style.display = "flex";
    frame.style.flexDirection = "column";
    frame.style.justifyContent = "center";
    frame.style.alignItems = "center";

    const message = document.createElement("p");

    message.textContent =
      "Add your profile picture to the repository";

    message.style.color = "#929bb0";
    message.style.padding = "20px";
    message.style.textAlign = "center";

    frame.appendChild(message);
  });

});
     