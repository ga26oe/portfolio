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
});
