import "./style.css";
import editIcon from "./edit-icon-light.svg";
import deleteIcon from "./delete-icon-light.svg";
import { logicController } from "./logic-controller";

logicController.addProject("project 1");
logicController.addProject("project 2");

const currentProject = logicController.getCurrentProject();
currentProject.addTodo("walk dog", "1/1/2025", "1", "test description text");
currentProject.addTodo("wash car", "1/22/2025", "1", "test description text");

const pageBody = document.querySelector("body");
const projectsContainer = document.querySelector(".projects-container");
const todosHeader = document.querySelector(".todos-header");
todosHeader.textContent = logicController.getProjectAt(0).getName();
const todosContainer = document.querySelector(".todos-container");
const dialog = document.querySelector("dialog");

function updateProjectDisplay() {
    projectsContainer.textContent = "";
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

function updateTodosDisplay() {
    todosContainer.textContent = "";
    const currentProject = logicController.getCurrentProject();
    const todosLength = currentProject.getTodosLength();
    for (let i = 0; i < todosLength; i++) {
        const todo = document.createElement("div");
        todo.classList.add("todo");

        const todoTitle = document.createElement("h3");
        todoTitle.classList.add("todo-title");
        todoTitle.textContent = currentProject.getTodoAt(i).getName();
        todo.append(todoTitle);

        const todoBody = document.createElement("div");
        todoBody.classList.add("todo-body");
        const todoInfo = document.createElement("div");
        todoInfo.classList.add("todo-info");
        const dueDate = document.createElement("p");
        dueDate.classList.add("due-date");
        dueDate.textContent = currentProject.getTodoAt(i).getDueDate();
        const description = document.createElement("p");
        description.classList.add("description");
        description.textContent = currentProject.getTodoAt(i).getDescription();
        todoInfo.append(dueDate, description);
        todoBody.append(todoInfo);

        const buttonsContainer = document.createElement("div");
        buttonsContainer.classList.add("buttons-container");
        buttonsContainer.id = `todo-${i}`;
        const editBtn = document.createElement("button");
        editBtn.classList.add("todo-edit-btn");
        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("todo-delete-btn");
        const deleteBtnIcon = document.createElement("img");
        deleteBtnIcon.setAttribute("src", deleteIcon);
        deleteBtnIcon.setAttribute("alt", "delete button icon");
        const editBtnIcon = document.createElement("img");
        editBtnIcon.setAttribute("src", editIcon);
        editBtnIcon.setAttribute("alt", "edit button icon");
        editBtn.append(editBtnIcon);
        deleteBtn.append(deleteBtnIcon);
        buttonsContainer.append(editBtn, deleteBtn);
        todoBody.append(buttonsContainer);

        todo.append(todoBody);
        todosContainer.append(todo);
    }
}

pageBody.addEventListener("click", (event) => {
    const target = event.target;
    if (target.classList.contains("project-button")) {
        logicController.setCurrentProjectIndex(target.id.slice(-1));
        todosHeader.textContent = target.textContent;
        updateTodosDisplay();
    }
    else if (target.classList.contains("todo-delete-btn") || target.parentNode.classList.contains("todo-delete-btn")) {
        logicController.getCurrentProject().removeTodoAt(target.parentNode.id.slice(-1));
        updateTodosDisplay();
    }
    else if (target.classList.contains("add-btn") || target.parentNode.classList.contains("add-btn")) {
        dialog.showModal();
    }
});

updateProjectDisplay();