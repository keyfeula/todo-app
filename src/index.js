import "./style.css";

const domController = (() => {
    const dialog = document.querySelector("dialog");
    const body = document.querySelector("body");
    body.addEventListener("click", (event) => {
        const target = event.target;
        if (target.tagName !== "BUTTON") {
            return;
        }
        if (target.classList.contains("new-btn")) {
            dialog.showModal();
        }
        if (target.classList.contains("form-close-btn")) {
            dialog.close();
        }
    });
})();