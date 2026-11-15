// Cada integrante agrega aquí el JavaScript de su sección

document.addEventListener("DOMContentLoaded", () => {

    const buttons = document.querySelectorAll(".hero-btn");

    buttons.forEach((button) => {

        button.addEventListener("click", (event) => {

            event.preventDefault();

            const store = button.dataset.store;

            if (store === "google") {
                alert("Google Play estará disponible próximamente.");
            }

            if (store === "apple") {
                alert("App Store estará disponible próximamente.");
            }

        });

    });

});
