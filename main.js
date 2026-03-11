// DARK MODE

document.getElementById("themeToggle").onclick = () => {
  document.body.classList.toggle("dark");
};

// GSAP HERO ANIMATION

gsap.from(".hero-text h1", {
  y: 120,
  opacity: 0,
  duration: 1.2,
  ease: "power3.out",
});

gsap.from(".hero-text p", {
  y: 60,
  opacity: 0,
  duration: 1.2,
  delay: 0.3,
  ease: "power3.out",
});

// HERO PARALLAX

const heroImage = document.querySelector(".hero img");

window.addEventListener("scroll", () => {
  const scroll = window.scrollY;

  heroImage.style.transform = `translateY(${scroll * 0.3}px)`;
});

// SMOOTH SCROLL NAVIGATION

document.querySelectorAll("nav a").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));

    target.scrollIntoView({
      behavior: "smooth",
    });
  });
});

// SCROLL REVEAL ANIMATION

const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.2 },
);

sections.forEach((section) => {
  observer.observe(section);
});

// CAROUSEL (INFINITE LOOP)

const carousel = document.getElementById("carousel");
let slides = document.querySelectorAll(".slide");

// duplicate slides for seamless loop
carousel.innerHTML += carousel.innerHTML;
slides = document.querySelectorAll(".slide");

let scrollAmount = 0;
let isPaused = false;

function autoScroll() {
  if (!isPaused) {
    scrollAmount += 0.35;

    if (scrollAmount >= carousel.scrollWidth / 2) {
      scrollAmount = 0;
    }

    carousel.style.transform = `translateX(-${scrollAmount}px)`;
  }

  requestAnimationFrame(autoScroll);
}

autoScroll();

// PAUSE ON HOVER

carousel.addEventListener("mouseenter", () => {
  isPaused = true;
});

carousel.addEventListener("mouseleave", () => {
  isPaused = false;
});

// TOUCH SWIPE WITH MOMENTUM

let startX = 0;
let velocity = 0;

carousel.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
  isPaused = true;
});

carousel.addEventListener("touchmove", (e) => {
  const currentX = e.touches[0].clientX;

  const diff = startX - currentX;

  scrollAmount += diff * 0.5;

  velocity = diff;

  carousel.style.transform = `translateX(-${scrollAmount}px)`;

  startX = currentX;
});

carousel.addEventListener("touchend", () => {
  // momentum swipe
  scrollAmount += velocity * 20;

  isPaused = false;
});

// VIDEO MODAL

const modal = document.getElementById("videoModal");
const player = document.getElementById("videoPlayer");
const close = document.getElementById("closeVideo");

slides.forEach((slide) => {
  slide.addEventListener("click", () => {
    const video = slide.dataset.video;

    if (video) {
      isPaused = true; // stop carousel

      modal.style.display = "flex";

      player.src = video;
      player.play();
    }
  });
});

// CLOSE VIDEO

function closeVideo() {
  modal.style.display = "none";

  player.pause();
  player.src = "";

  isPaused = false; // resume carousel
}

close.onclick = closeVideo;

modal.onclick = (e) => {
  if (e.target === modal) {
    closeVideo();
  }
};

// JOURNEY SCROLL ANIMATION
const steps = document.querySelectorAll(".step");

const stepObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.3 },
);

steps.forEach((step) => {
  stepObserver.observe(step);
});

// Active nav link highlighting
const sectionsNav = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
  let current = "";

  sectionsNav.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.offsetHeight;

    if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

// SHRINK HEADER ON SCROLL
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 80) {
    header.classList.add("shrink");
  } else {
    header.classList.remove("shrink");
  }
});
