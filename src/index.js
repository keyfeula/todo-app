import "./style.css";
import { logicController } from "./logic-controller";

logicController.addProject("proj 1");
logicController.addProject("proj 2");
logicController.addProject("project 3");

const projectsContainer = document.querySelector(".projects-container");

function updateProjectDisplay() {
    for (let i = 0; i < logicController.getLength(); i++) {
        const project = document.createElement("li");
        const projectButton = document.createElement("button");
        projectButton.classList.add("project-button");
        projectButton.setAttribute("type", "button");
        projectButton.textContent = logicController.getProjectAt(i).getName();
        project.append(projectButton);
        projectsContainer.append(project);
    }
}

updateProjectDisplay();