import "./style.css";
import { TodoProject } from "./todo-project";

const domController = (() => {
    const dialog = document.querySelector("dialog");
    const body = document.querySelector("body");
    const projectsContainer = document.querySelector(".projects");
    const projects = [];

    function updateProjectsDisplay() {
        projectsContainer.textContent = "";
        for (let i = 0; i < projects.length; i++) {
            const newProjectBtn = document.createElement("button");
            newProjectBtn.classList.add("project");
            newProjectBtn.textContent = projects[i].name;
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
            const todoProject = new TodoProject(projectName);
            projects.push(todoProject);
            updateProjectsDisplay();
        }

    });
})();