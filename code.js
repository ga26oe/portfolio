document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".dropdown-btn");
  const contents = document.querySelectorAll(".dropdown-content");
  const typewriterText = document.getElementById("typewriter-text");
  const football = document.getElementById("football");
  const footballContainer = document.getElementById("football-container");

  const typewriterContent = {
    education: [
      "Learning never stops... until I go to sleep.",
      "Countless, countless, all-nighters and so many p-sets.",
      "Damn, I kind of miss college.",
      "If you want to know, my hardest class is probably automatic control systems. ",
    ],
    projects: [
      "Built a 1965 Honda Motorcycle with my Professor! Ofc I rode it",
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

  let currentPhrase = "";
  let isErasing = false;
  let charIndex = 0;
  let phraseIndex = 0;
  let currentCategory = "";

  function typeWriter() {
    if (!isErasing && charIndex < currentPhrase.length) {
      typewriterText.textContent += currentPhrase.charAt(charIndex);
      charIndex++;
      setTimeout(typeWriter, 200); // Slowed down typing speed
    } else if (!isErasing && charIndex === currentPhrase.length) {
      isErasing = true;
      setTimeout(typeWriter, 2000); // Wait 2 seconds before erasing
    } else if (isErasing && charIndex > 0) {
      typewriterText.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      setTimeout(typeWriter, 50); // Slowed down erasing speed
    } else if (isErasing && charIndex === 0) {
      isErasing = false;
      phraseIndex++;
      if (phraseIndex >= typewriterContent[currentCategory].length) {
        phraseIndex = 0; // Reset to the beginning of the array
      }
      currentPhrase = typewriterContent[currentCategory][phraseIndex];
      setTimeout(typeWriter, 500); // Wait 0.5 seconds before typing new phrase
    }
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.getAttribute("data-target");

      buttons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      contents.forEach((content) => {
        if (content.id === target) {
          content.classList.add("active");
          if (target === "hobbies") {
            footballContainer.style.display = "block";
          }
        } else {
          content.classList.remove("active");
        }
      });

      // Reset typewriter
      typewriterText.textContent = "";
      isErasing = false;
      charIndex = 0;
      phraseIndex = 0;
      currentCategory = target;

      // Start the typewriter effect
      currentPhrase = typewriterContent[currentCategory][phraseIndex];
      typeWriter();
    });
  });
  football.addEventListener("click", () => {
    if (!football.classList.contains("football-spiral")) {
      football.classList.add("football-spiral");

      // Reset the football position after animation ends
      football.addEventListener("animationend", function resetFootball() {
        football.classList.remove("football-spiral");
        football.style.transform = "none";
        football.removeEventListener("animationend", resetFootball);
      });
    }
  });
});
