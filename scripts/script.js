/****************************************************
  Particles Configuration
****************************************************/
particlesJS("particles-js", {
  particles: {
    number: { value: 100, density: { enable: true, value_area: 1000 } },
    color: { value: ["#aa73ff", "#f8c210", "#83d238", "#33b1f8"] },
    shape: {
      type: "circle",
      stroke: { width: 0, color: "#fff" },
      polygon: { nb_sides: 5 }
    },
    opacity: { value: 0.6, random: false },
    size: { value: 2, random: true },
    line_linked: {
      enable: true,
      distance: 120,
      color: "#ffffff",
      opacity: 0.4,
      width: 1
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: true, mode: "grab" },
      onclick: { enable: false },
      resize: true
    },
    modes: {
      grab: { distance: 140, line_linked: { opacity: 1 } },
      bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
      repulse: { distance: 200, duration: 0.4 },
      push: { particles_nb: 4 },
      remove: { particles_nb: 2 }
    }
  },
  retina_detect: true
});

/****************************************************
  Modal Handling
****************************************************/
function openModal(name, role, details, image) {
  const modal = document.getElementById("team-modal");
  document.getElementById("team-modal-name").innerText = name;
  document.getElementById("team-modal-role").innerText = role;
  document.getElementById("team-modal-details").innerHTML = details;
  document.getElementById("team-modal-image").src = image;
  modal.style.display = "flex";
}

function closeModal() {
  const modal = document.getElementById("team-modal");
  modal.style.display = "none";
}

window.onclick = function (event) {
  const modal = document.getElementById("team-modal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

/****************************************************
  Fade-In Sections on Scroll
****************************************************/
const fadeSections = document.querySelectorAll(".fade-section");
window.addEventListener("scroll", () => {
  fadeSections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      section.classList.add("visible");
    }
  });
});

/****************************************************
  AOS Initialization
****************************************************/
document.addEventListener("DOMContentLoaded", function () {
  AOS.init({
    once: true,
    offset: 120,
    duration: 800
  });
  
  transformDropdownsForMobile(); // Flatten submenus for mobile
  setupNavItemClick();          // Close hamburger on nav item click
});

/****************************************************
  Sticky Navbar on Scroll
****************************************************/
document.addEventListener("scroll", function () {
  const hero = document.querySelector(".hero-banner");
  const nav = document.querySelector(".site-navigation");
  if (!hero || !nav) return;
  const heroBottom = hero.getBoundingClientRect().bottom;
  if (heroBottom <= 0) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
});

/****************************************************
  Hamburger Menu for Mobile
****************************************************/
const hamburger = document.getElementById("hamburger-menu");
const navLinks = document.getElementById("nav-links");
const closeNavButton = document.getElementById("close-nav");
const mainNavList = document.getElementById("main-nav-list");

// Function to disable scrolling
function disableScroll() {
  document.body.style.overflow = "hidden";
  document.documentElement.style.overflow = "hidden";
}

// Function to enable scrolling
function enableScroll() {
  document.body.style.overflow = "auto";
  document.documentElement.style.overflow = "auto";
}

// Open menu and disable scrolling
hamburger.addEventListener("click", () => {
  navLinks.classList.add("show-links");
  mainNavList.classList.add("show-menu");
  disableScroll();
});

// Close menu and re-enable scrolling
closeNavButton.addEventListener("click", () => {
  navLinks.classList.remove("show-links");
  mainNavList.classList.remove("show-menu");
  enableScroll();
});

// Close menu when clicking outside and re-enable scrolling
document.addEventListener("click", (event) => {
  if (!navLinks.contains(event.target) && !hamburger.contains(event.target)) {
    navLinks.classList.remove("show-links");
    mainNavList.classList.remove("show-menu");
    enableScroll();
  }
});

/****************************************************
  PART 1: Store Original HTML
****************************************************/
let originalNavHTML = ""; // Will store the original <ul> content
let navFlattened = false; // Track if we are currently flattened

document.addEventListener("DOMContentLoaded", function () {
  // Once the DOM is loaded, store the original nav HTML
  const mainNavList = document.getElementById("main-nav-list");
  if (mainNavList) {
    originalNavHTML = mainNavList.innerHTML; 
  }
  
  // Now run your usual initializations
  AOS.init({ once: true, offset: 120, duration: 800 });
  transformDropdownsOnResize(); // Check initial size, flatten or revert as needed
  setupHamburgerClose();        // e.g., close overlay on item click, etc.
});

/****************************************************
  PART 2: Flatten/Revert on Resize
****************************************************/
window.addEventListener("resize", transformDropdownsOnResize);

function transformDropdownsOnResize() {
  const width = window.innerWidth || document.documentElement.clientWidth;
  
  // If width <= 768 and not already flattened
  if (width <= 768 && !navFlattened) {
    flattenDropdowns();
  }
  // If width > 768 and we are flattened
  else if (width > 768 && navFlattened) {
    revertDropdowns();
  }
}

/****************************************************
  Flatten "About" & "Research" on Mobile
****************************************************/
function flattenDropdowns() {
  const mainNavList = document.getElementById("main-nav-list");
  if (!mainNavList) return;
  
  const navAbout = document.getElementById("nav-about");
  const navResearch = document.getElementById("nav-research");
  
  // Flatten "About"
  if (navAbout) {
    const aboutSub = document.getElementById("about-sub");
    if (aboutSub) {
      const subItems = aboutSub.querySelectorAll("li");
      mainNavList.removeChild(navAbout);
      subItems.forEach(subItem => {
        subItem.classList.add("nav-item");
        mainNavList.appendChild(subItem.cloneNode(true));
      });
    }
  }

  // Flatten "Research"
  if (navResearch) {
    const researchSub = document.getElementById("research-sub");
    if (researchSub) {
      const subItems = researchSub.querySelectorAll("li");
      mainNavList.removeChild(navResearch);
      subItems.forEach(subItem => {
        subItem.classList.add("nav-item");
        mainNavList.appendChild(subItem.cloneNode(true));
      });
    }
  }
  
  navFlattened = true;
}

/****************************************************
  Revert to Original Nav
****************************************************/
function revertDropdowns() {
  const mainNavList = document.getElementById("main-nav-list");
  if (!mainNavList || !originalNavHTML) return;
  
  // Simply restore the nav to the original HTML
  mainNavList.innerHTML = originalNavHTML;
  navFlattened = false;
}

/****************************************************
  PART 3: Additional Logic
  e.g., hamburger close on nav item click
****************************************************/
function setupHamburgerClose() {
  const navLinks = document.getElementById("nav-links");
  const mainNavList = document.getElementById("main-nav-list");
  
  // If a user clicks a link, close hamburger
  const navItems = document.querySelectorAll("#main-nav-list li a");
  navItems.forEach(item => {
    item.addEventListener("click", () => {
      navLinks.classList.remove("show-links");
      mainNavList.classList.remove("show-menu");
    });
  });
}

/****************************************************
  The rest of your code (particles, modal, etc.)
****************************************************/
// e.g., your Particles, Fade-In, Sticky Nav, etc.
/****************************************************/
// For clarity, I've left out your existing code here.
// Make sure to integrate your existing logic (particles config, modal code, etc.)
// around these lines so everything coexists properly.

/********************************
   CAROUSEL FOR EVENTS PAGE
*********************************/
document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.carousel-slide');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const carouselContainer = document.querySelector('.carousel-container');

  let currentSlide = 0; // index of the current slide

  function showSlide(index) {
    // Slide by updating the container's transform property
    carouselContainer.style.transform = 'translateX(-' + index * 100 + '%)';
  }

  // Next Slide
  nextBtn.addEventListener('click', () => {
    currentSlide++;
    if (currentSlide >= slides.length) {
      currentSlide = 0; // wrap around to first slide
    }
    showSlide(currentSlide);
  });

  // Previous Slide
  prevBtn.addEventListener('click', () => {
    currentSlide--;
    if (currentSlide < 0) {
      currentSlide = slides.length - 1; // wrap around to last slide
    }
    showSlide(currentSlide);
  });

  // Initialize the first slide
  showSlide(currentSlide);
});

function showPopup(message) {
  const popup = document.createElement("div");
  popup.className = "popup-message";
  popup.innerHTML = `<p>${message}</p>`;

  document.body.appendChild(popup);

  setTimeout(() => {
      popup.classList.add("show");
  }, 100);

  setTimeout(() => {
      popup.classList.remove("show");
      setTimeout(() => {
          popup.remove();
      }, 500);
  }, 10000);
}

// Function to get query parameter from URL
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

document.addEventListener("DOMContentLoaded", function () {
  const message = getQueryParam("msg");
  if (message) {
      showPopup(decodeURIComponent(message));

      // Remove the query parameter from the URL after displaying
      const newUrl = window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
  }
});

