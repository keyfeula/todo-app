import "./style.css";
import { logicController } from "./logic-controller";

logicController.addProject("project 1");
logicController.addProject("project 2");
logicController.addProject("project 3");

const pageBody = document.querySelector("body");
const projectsContainer = document.querySelector(".projects-container");
const todosHeader = document.querySelector(".todos-header");

function updateProjectDisplay() {
    for (let i = 0; i < logicController.getLength(); i++) {
        const project = document.createElement("li");
        const projectButton = document.createElement("button");
        projectButton.classList.add("project-button");
        projectButton.setAttribute("type", "button");
        projectButton.setAttribute("id", `project-${i}`);
        projectButton.textContent = logicController.getProjectAt(i).getName();
        project.append(projectButton);
        projectsContainer.append(project);
    }
}

pageBody.addEventListener("click", (event) => {
    const target = event.target;
    if (target.classList.contains("project-button")) {
        logicController.setCurrentProjectIndex(target.id.slice(-1));
        todosHeader.textContent = target.textContent;
    }
});

updateProjectDisplay();