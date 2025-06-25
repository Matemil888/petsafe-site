document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("pet-form");
  const previewContainer = document.getElementById("preview-container");
  const pets = [];

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("pet-name").value.trim();
    const breed = document.getElementById("pet-breed").value.trim();
    const contact = document.getElementById("owner-contact").value.trim();
    const photo = document.getElementById("photo-url").value.trim();

    const pet = { name, breed, contact, photo };
    pets.push(pet);

    renderPets();
    form.reset();
  });

  function renderPets() {
    previewContainer.innerHTML = "";

    pets.forEach((pet, index) => {
      const qrData = `Имя: ${pet.name}\nПорода: ${pet.breed}\nКонтакт: ${pet.contact}`;
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(qrData)}`;

      const card = document.createElement("div");
      card.className = "preview";
      card.innerHTML = `
        <h3>Питомец #${index + 1}</h3>
        ${pet.photo ? `<img src="${pet.photo}" alt="Фото питомца" />` : ""}
        <p><strong>Имя:</strong> ${pet.name}</p>
        <p><strong>Порода:</strong> ${pet.breed}</p>
        <p><strong>Контакт:</strong> ${pet.contact}</p>
        <div class="qr-placeholder"><img src="${qrUrl}" width="100" height="100" /></div>
      `;
      previewContainer.appendChild(card);
    });
  }

  const contactForm = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    formStatus.textContent = "Спасибо! Мы свяжемся с вами.";
    formStatus.style.color = "green";
    contactForm.reset();
    setTimeout(() => formStatus.textContent = "", 4000);
		
  });
});

