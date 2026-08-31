const welcomeButton = document.querySelector("#welcome-button");
const message = document.querySelector("#message");
const year = document.querySelector("#year");

year.textContent = new Date().getFullYear();

welcomeButton.addEventListener("click", () => {
  message.textContent = "¡Bienvenido a Network Aware! Estamos construyendo algo grande.";
});
