document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".dropdown-btn");
  const contents = document.querySelectorAll(".dropdown-content");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.getAttribute("data-target");
      contents.forEach((content) => {
        if (content.id === target) {
          content.classList.toggle("active");
        } else {
          content.classList.remove("active");
        }
      });
    });
  });

  // Add smooth scrolling for better user experience
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  football.addEventListener("click", () => {
    football.classList.add("spin");
    setTimeout(() => {
      football.classList.remove("spin");
    }, 1000);
  });
});
