const contactForm = document.querySelector("#contact-form");
const interestField = document.querySelector("#interest");
const consultationField = document.querySelector("#consultation");
const formStatus = document.querySelector("#form-status");
const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector(".site-nav");
const menuLabel = menuButton.querySelector(".sr-only");

document.querySelector("#year").textContent = new Date().getFullYear();

const interestOptions = Array.from(interestField.options).map((option) => option.value);

document.querySelectorAll(".cta-link").forEach((link) => {
  link.addEventListener("click", () => {
    const requestedInterest = link.dataset.interest;
    if (interestOptions.includes(requestedInterest)) {
      interestField.value = requestedInterest;
    } else if (requestedInterest === "Hablar con Germán González") {
      interestField.value = "Información general";
      consultationField.value = "Me gustaría hablar con Germán González sobre una posible formación.";
    }
    formStatus.textContent = "Cuéntanos los detalles y prepararemos tu consulta para enviarla por correo.";
    formStatus.className = "form-status";
  });
});

menuButton.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("is-open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuLabel.textContent = isOpen ? "Cerrar menú" : "Abrir menú";
  document.body.classList.toggle("menu-open", isOpen);
});

navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navigation.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuLabel.textContent = "Abrir menú";
    document.body.classList.remove("menu-open");
  });
});

const programmeTabs = Array.from(document.querySelectorAll("[data-programme-tab]"));
const programmePanels = Array.from(document.querySelectorAll("[data-programme-panel]"));

function showProgramme(programme, focusTab = false) {
  programmeTabs.forEach((tab) => {
    const isSelected = tab.dataset.programmeTab === programme;
    tab.setAttribute("aria-selected", String(isSelected));
    tab.tabIndex = isSelected ? 0 : -1;
    if (isSelected && focusTab) tab.focus();
  });

  programmePanels.forEach((panel) => {
    panel.hidden = panel.dataset.programmePanel !== programme;
  });
}

programmeTabs.forEach((tab, index) => {
  tab.addEventListener("click", () => showProgramme(tab.dataset.programmeTab));
  tab.addEventListener("keydown", (event) => {
    if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const nextIndex = event.key === "Home" ? 0 : event.key === "End" ? programmeTabs.length - 1 : (index + (event.key === "ArrowRight" ? 1 : -1) + programmeTabs.length) % programmeTabs.length;
    showProgramme(programmeTabs[nextIndex].dataset.programmeTab, true);
  });
});

document.querySelectorAll("[data-programme-open]").forEach((link) => {
  link.addEventListener("click", () => showProgramme(link.dataset.programmeOpen));
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!contactForm.checkValidity()) {
    contactForm.reportValidity();
    formStatus.textContent = "Revisa los campos obligatorios antes de continuar.";
    formStatus.className = "form-status is-error";
    return;
  }

  const formData = new FormData(contactForm);
  const details = [
    `Nombre: ${formData.get("nombre")} ${formData.get("apellidos")}`,
    `Centro o entidad: ${formData.get("centro")}`,
    `Puesto: ${formData.get("puesto")}`,
    `Correo: ${formData.get("email")}`,
    `Teléfono: ${formData.get("telefono")}`,
    `Consulta: ${formData.get("interes")}`,
    `Fecha aproximada: ${formData.get("fecha") || "Por definir"}`,
    "", "Mensaje:", formData.get("consulta") || "Sin detalles adicionales."
  ].join("\n");
  const subject = `Consulta web Network Aware - ${formData.get("interes")}`;
  window.location.href = `mailto:info.network.aware@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(details)}`;
  formStatus.textContent = "Abriendo tu aplicación de correo con la consulta preparada…";
  formStatus.className = "form-status is-success";
});
