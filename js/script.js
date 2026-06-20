const navbar = document.querySelector(".custom-navbar");
const navCollapse = document.querySelector(".navbar-collapse");
const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
const revealItems = document.querySelectorAll(".reveal");

const updateNavbarShadow = () => {
  navbar.classList.toggle("is-scrolled", window.scrollY > 12);
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
updateNavbarShadow();
