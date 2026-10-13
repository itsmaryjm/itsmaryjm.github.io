const navbar = document.querySelector(".custom-navbar");
const navCollapse = document.querySelector(".navbar-collapse");
const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
const navSections = [...navLinks]
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);
const revealItems = document.querySelectorAll(".reveal");

const updateNavbarShadow = () => {
  navbar.classList.toggle("is-scrolled", window.scrollY > 12);
};

const updateActiveNavLink = () => {
  const activationPoint = window.scrollY + navbar.offsetHeight + 1;
  let activeSection = navSections[0];

  navSections.forEach((section) => {
    if (section.getBoundingClientRect().top + window.scrollY <= activationPoint) {
      activeSection = section;
    }
  });

  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${activeSection.id}`;
    link.classList.toggle("active", isActive);

    if (isActive) {
      link.setAttribute("aria-current", "location");
    } else {
      link.removeAttribute("aria-current");
    }
  });
};

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18,
  }
);

revealItems.forEach((item) => revealObserver.observe(item));

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (navCollapse.classList.contains("show")) {
      bootstrap.Collapse.getOrCreateInstance(navCollapse).hide();
    }
  });
});

window.addEventListener("scroll", updateNavbarShadow);
window.addEventListener("scroll", updateActiveNavLink, { passive: true });
window.addEventListener("resize", updateActiveNavLink);
window.addEventListener("hashchange", updateActiveNavLink);
window.addEventListener("pageshow", updateActiveNavLink);
updateNavbarShadow();
updateActiveNavLink();
