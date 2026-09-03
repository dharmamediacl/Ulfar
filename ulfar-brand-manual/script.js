document.addEventListener("DOMContentLoaded", () => {
  const printButton = document.getElementById("printButton");

  if (printButton) {
    printButton.addEventListener("click", () => {
      window.print();
    });
  }
});
