import "./style.css";
import { addProject, getProjectsLength, getProjectAt } from "./app-logic";

(() => {
    const dialog = document.querySelector("dialog");
    const body = document.querySelector("body");
    const projectsContainer = document.querySelector(".projects");

    function updateProjectsDisplay() {
        projectsContainer.textContent = "";
        const length = getProjectsLength();
        for (let i = 0; i < length; i++) {
            const newProjectBtn = document.createElement("button");
            newProjectBtn.classList.add("project");
            newProjectBtn.textContent = getProjectAt(i).name;
            projectsContainer.append(newProjectBtn);
        }
        const addProjectBtn = document.createElement("button");
        addProjectBtn.classList.add("new-btn");
        addProjectBtn.textContent = "+";
        projectsContainer.append(addProjectBtn);
    }

    body.addEventListener("click", (event) => {
        const target = event.target;
        if (target.tagName !== "BUTTON") {
            return;
        }
        if (target.classList.contains("new-btn")) {
            dialog.showModal();
        }
        else if (target.classList.contains("form-close-btn")) {
            dialog.close();
        }
        else if (target.classList.contains("project-submit-btn")) {
            const projectName = document.querySelector("input#project-name").value;
            addProject(projectName);
            updateProjectsDisplay();
        }

    });
})();