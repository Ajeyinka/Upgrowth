const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 50);
});

const toggleButton = document.getElementById("toggle_button");
const navbarLinks = document.querySelector(".nav-list");
const menuBars = document.querySelectorAll(".bar");

toggleButton.addEventListener("click", () => {
  toggleButton.classList.toggle("active");
  navbarLinks.classList.toggle("active");

  menuBars.forEach((bar) => bar.classList.toggle("active"));
});

const items = document.querySelectorAll(".accordion button");

function toggleAccordion() {
  const itemToggle = this.getAttribute("aria-expanded");

  for (i = 0; i < items.length; i++) {
    items[i].setAttribute("aria-expanded", "false");
  }

  if (itemToggle == "false") {
    this.setAttribute("aria-expanded", "true");
  }
}

items.forEach((item) => item.addEventListener("click", toggleAccordion));

const counters = document.querySelectorAll(".metric h2");

const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const counter = entry.target;
      const target = +counter.dataset.target;
      const prefix = counter.dataset.prefix || "";
      const suffix = counter.dataset.suffix || "";

      let current = 0;
      const duration = 2000;
      const frameRate = 60;
      const totalFrames = duration / (1000 / frameRate);
      const increment = target / totalFrames;

      function updateCounter() {
        current += increment;

        if (current >= target) {
          current = target;
        }

        counter.textContent =
          prefix + Math.floor(current).toLocaleString() + suffix;

        if (current < target) {
          requestAnimationFrame(updateCounter);
        }
      }

      updateCounter();
      observer.unobserve(counter);
    });
  },
  {
    threshold: 0.5,
  },
);

counters.forEach((counter) => observer.observe(counter));
