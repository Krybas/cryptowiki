document.addEventListener("DOMContentLoaded", () => {
    const modeToggle = document.getElementById("mode");
    const body = document.body;

    const savedMode = localStorage.getItem("theme");
    if (savedMode) {
        body.setAttribute("data-bs-theme", savedMode);
        updateModeText(savedMode);
    }

    modeToggle.addEventListener("click", () => {
        const currentTheme = body.getAttribute("data-bs-theme") || "light";
        const newTheme = currentTheme === "light" ? "dark" : "light";

        body.setAttribute("data-bs-theme", newTheme);
        localStorage.setItem("theme", newTheme);

        updateModeText(newTheme);
    });

    function updateModeText(theme) {
        modeToggle.textContent = theme === "light" ? "🌙 Dark mode" : "☀ Light mode";
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".needs-validation");
    const inputs = form.querySelectorAll("input, textarea");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (form.checkValidity()) {
            const firstName = document.getElementById("fname").value;
            const lastName = document.getElementById("lname").value;
            const date = new Date();
            alert(`Thank you, for submiting ${firstName} ${lastName}! Submitted successfully! \n\nDate: ${date.toISOString().split('T')[0]}`);
            inputs.forEach((input) => {
                input.classList.remove("is-valid");
            });
            form.reset();
        } else {
            event.stopPropagation();
        }
    });

    inputs.forEach((input) => {
        input.addEventListener("input", () => {
            if (input.checkValidity()) {
                input.classList.remove("is-invalid");
                input.classList.add("is-valid");
            } else {
                input.classList.remove("is-valid");
                input.classList.add("is-invalid");
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const textColorInput = document.getElementById('text-color');
    const textSizePercentageInput = document.getElementById('text-size-percentage');
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');

    const originalSizes = Array.from(headings).map((heading) =>
        parseFloat(window.getComputedStyle(heading).fontSize)
    );

    function loadSettings() {
        const savedColor = localStorage.getItem('textColor');
        const savedSizePercentage = localStorage.getItem('textSizePercentage');

        if (savedColor) {
            textColorInput.value = savedColor;
            headings.forEach((heading) => {
                heading.style.color = savedColor;
            });
        }

        if (savedSizePercentage) {
            textSizePercentageInput.value = savedSizePercentage;
            const percentage = parseFloat(savedSizePercentage) / 100;
            headings.forEach((heading, index) => {
                heading.style.fontSize = `${originalSizes[index] * percentage}px`;
            });
        }
    }

    function saveSettings() {
        localStorage.setItem('textColor', textColorInput.value);
        localStorage.setItem('textSizePercentage', textSizePercentageInput.value);
    }

    textColorInput.addEventListener('input', () => {
        headings.forEach((heading) => {
            heading.style.color = textColorInput.value;
        });
        saveSettings();
    });

    textSizePercentageInput.addEventListener('input', () => {
        const percentage = parseFloat(textSizePercentageInput.value) / 100;
        if (!isNaN(percentage)) {
            headings.forEach((heading, index) => {
                heading.style.fontSize = `${originalSizes[index] * percentage}px`;
            });
            saveSettings();
        }
    });

    loadSettings();
});