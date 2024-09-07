"use client";

let typewriterTimeout;
let isTyping = false;
let currentPhrase = "";
let charIndex = 0;
let phraseIndex = 0;
let currentCategory = "";
let typewriterText;
let isBackspacing = false;

const typewriterContent = {
  education: [
    "Learning never stops... until I go to sleep.",
    "Countless, countless, all-nighters and so many p-sets.",
    "Damn, I kind of miss college.",
    "If you want to know, my hardest class is probably automatic control systems. ",
  ],
  projects: [
    "Built a 1965 Honda Motorcycle with my Professor!",
    "Maybe I should have majored in Web Development?? Nahhh",
    "I kind of dropped the bike after riding it for the first time. Sorry Glenn!",
    "KOA Admissions is still under development. Hold your horses!",
  ],
  skills: [
    "This site is built using plain HTML, CSS, and JS btw!",
    "Taking Andrew Ng's ML course for fun",
    "I can throw a football pretty far. That's my favorite skill ngl",
    "Learning React and NextJS because I've become super interested in Web Development",
    "Plan on learning and using python more. I'm interested in ML and AI!",
  ],
  hobbies: [
    "I once threw a football with a friend from college for three straight hours. Shoutout to Arthava!",
    "Check out my spotify for great song recommendations.",
    "Yeah, I have 7,000 like songs on Spotify. Glad you noticed",
    "Huge Gym Bro. What's your bench? Oh, and I never skip Leg Day",
  ],
};
function startTypewriter(category) {
  stopTypewriter();
  charIndex = 0;
  phraseIndex = 0;
  currentCategory = category;
  currentPhrase = typewriterContent[currentCategory][phraseIndex];
  typewriterText.textContent = "";
  isTyping = true;
  typeWriter();
}

function stopTypewriter() {
  isTyping = false;
  clearTimeout(typewriterTimeout);
}

function typeWriter() {
  if (!isTyping) return;

  if (!isBackspacing && charIndex < currentPhrase.length) {
    typewriterText.textContent += currentPhrase.charAt(charIndex);
    charIndex++;
    typewriterTimeout = setTimeout(typeWriter, 50); // Typing speed
  } else if (!isBackspacing && charIndex === currentPhrase.length) {
    // Pause at the end of the phrase before backspacing
    typewriterTimeout = setTimeout(() => {
      isBackspacing = true;
      typeWriter();
    }, 10000); // Pause for 2 seconds before backspacing
  } else if (isBackspacing && charIndex > 0) {
    typewriterText.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
    typewriterTimeout = setTimeout(typeWriter, 25); // Backspacing speed (faster than typing)
  } else if (isBackspacing && charIndex === 0) {
    isBackspacing = false;
    // Move to next phrase or loop back to first
    phraseIndex = (phraseIndex + 1) % typewriterContent[currentCategory].length;
    currentPhrase = typewriterContent[currentCategory][phraseIndex];
    typewriterTimeout = setTimeout(typeWriter, 500); // Pause briefly before typing new phrase
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const heroTypewriter = document.getElementById("hero-typewriter");
  typewriterText = document.getElementById("typewriter-text");
  const buttons = document.querySelectorAll(".dropdown-btn");
  const contents = document.querySelectorAll(".dropdown-content");
  const sidebar = document.getElementById("sidebar");
  const mainContent = document.getElementById("main-content");

  // Hero typewriter effect
  const heroPhrase = "Hey There, Glad You Found Me.";
  let heroIndex = 0;

  function typeHero() {
    if (heroIndex < heroPhrase.length) {
      heroTypewriter.textContent += heroPhrase.charAt(heroIndex);
      heroIndex++;
      setTimeout(typeHero, 100);
    }
  }

  typeHero();

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.getAttribute("data-target");

      buttons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      contents.forEach((content) => {
        if (content.id === target) {
          content.classList.add("active");
        } else {
          content.classList.remove("active");
        }
      });

      startTypewriter(target);

      // Scroll to the target section
      const section = document.getElementById(target);
      section.scrollIntoView({ behavior: "smooth" });
    });
  });

  // Sidebar functionality
  document.addEventListener("mousemove", (event) => {
    if (event.clientX < 20) {
      sidebar.classList.add("show");
      mainContent.classList.add("sidebar-open");
    }
  });

  sidebar.addEventListener("mouseleave", () => {
    sidebar.classList.remove("show");
    mainContent.classList.remove("sidebar-open");
  });

  // Display sidebar when scrolling down
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      sidebar.classList.add("show");
      mainContent.classList.add("sidebar-open");
    } else {
      sidebar.classList.remove("show");
      mainContent.classList.remove("sidebar-open");
    }
  });

  // Animated scroll-down arrow
  const scrollDownArrow = document.querySelector(".scroll-down");
  scrollDownArrow.addEventListener("click", (e) => {
    e.preventDefault();
    const mainContent = document.getElementById("main-content");
    mainContent.scrollIntoView({ behavior: "smooth" });
  });
});
