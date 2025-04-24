import "./style.css";
import editIcon from "./edit-icon-light.svg";
import deleteIcon from "./delete-icon-light.svg";
import { logicController } from "./logic-controller";

logicController.addProject("Project 1");

const pageBody = document.querySelector("body");
const projectsContainer = document.querySelector(".projects-container");
const todosHeader = document.querySelector(".todos-header");
todosHeader.textContent = logicController.getProjectAt(0).getName();
const todosContainer = document.querySelector(".todos-container");
const dialog = document.querySelector("dialog");
const form = document.querySelector("form");

updateTodosDisplay();

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
    todosHeader.textContent = logicController.getCurrentProject().getName();
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
        dueDate.textContent = "Due: " + currentProject.getTodoAt(i).getDueDate();
        switch (currentProject.getTodoAt(i).getPriority()) {
            case "1":
                dueDate.style.color = "#3ed115";
                break;
            case "2":
                dueDate.style.color = "#dfd40a";
                break;
            default:
                dueDate.style.color = "#d01f1f";
        }
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

function createProjectForm() {
    form.textContent = "";
    const formField = document.createElement("div");
    formField.classList.add("form-field");
    const nameLabel = document.createElement("label");
    nameLabel.setAttribute("for", "name-input");
    nameLabel.textContent = "Name";
    const nameInput = document.createElement("input");
    nameInput.id = "name-input";
    nameInput.setAttribute("maxlength", "20");
    nameInput.setAttribute("required", "");
    formField.append(nameLabel, nameInput);
    form.append(formField);

    const formButtons = document.createElement("div");
    formButtons.classList.add("form-buttons");
    const submitBtn = document.createElement("button");
    submitBtn.classList.add("project-submit-btn");
    submitBtn.setAttribute("type", "submit");
    submitBtn.textContent = "Submit";
    const closeBtn = document.createElement("button");
    closeBtn.classList.add("close-btn");
    closeBtn.setAttribute("type", "button");
    closeBtn.textContent = "Close";
    formButtons.append(submitBtn, closeBtn);
    form.append(formButtons);
}

function createTodoForm() {
    form.textContent = "";
    const nameField = document.createElement("div");
    nameField.classList.add("form-field");
    const nameLabel = document.createElement("label");
    nameLabel.setAttribute("for", "name-input");
    nameLabel.textContent = "Name";
    const nameInput = document.createElement("input");
    nameInput.id = "name-input";
    nameInput.setAttribute("maxlength", "20");
    nameInput.setAttribute("required", "");
    nameField.append(nameLabel, nameInput);
    form.append(nameField);

    const dateField = document.createElement("div");
    dateField.classList.add("form-field");
    const dateLabel = document.createElement("label");
    dateLabel.setAttribute("for", "date-input")
    dateLabel.textContent = "Due Date";
    const dateInput = document.createElement("input");
    dateInput.id = "date-input"
    dateInput.setAttribute("type", "date");
    dateInput.setAttribute("required", "");
    dateField.append(dateLabel, dateInput);
    form.append(dateField);

    const priorityField = document.createElement("div");
    priorityField.classList.add("form-field");
    const priorityLabel = document.createElement("label");
    priorityLabel.setAttribute("for", "priority-input");
    priorityLabel.textContent = "Priority (1-3)";
    const priorityInput = document.createElement("input");
    priorityInput.id = "priority-input";
    priorityInput.setAttribute("type", "number");
    priorityInput.setAttribute("required", "");
    priorityInput.setAttribute("min", "1");
    priorityInput.setAttribute("max", "3");
    priorityField.append(priorityLabel, priorityInput);
    form.append(priorityField);

    const descriptionField = document.createElement("div");
    descriptionField.classList.add("form-field");
    const descriptionLabel = document.createElement("label");
    descriptionLabel.setAttribute("for", "description");
    descriptionLabel.textContent = "Description";
    const descriptionInput = document.createElement("textarea");
    descriptionInput.id = "description";
    descriptionInput.setAttribute("maxlength", "155");
    descriptionInput.setAttribute("rows", "5");
    descriptionField.append(descriptionLabel, descriptionInput);
    form.append(descriptionField);

    const formButtons = document.createElement("div");
    formButtons.classList.add("form-buttons");
    const submitBtn = document.createElement("button");
    submitBtn.classList.add("todo-submit-btn");
    submitBtn.setAttribute("type", "submit");
    submitBtn.textContent = "Submit";
    const closeBtn = document.createElement("button");
    closeBtn.classList.add("close-btn");
    closeBtn.setAttribute("type", "button");
    closeBtn.textContent = "Close";
    formButtons.append(submitBtn, closeBtn);
    form.append(formButtons);
}

pageBody.addEventListener("click", (event) => {
    const target = event.target;
    if (target.classList.contains("project-button")) {
        logicController.setCurrentProjectIndex(target.id.split("-")[1]);
        todosHeader.textContent = target.textContent;
        updateTodosDisplay();
    }
    else if (target.classList.contains("todo-delete-btn") || target.parentNode.classList.contains("todo-delete-btn")) {
        let todoIndex = "";
        if (target.classList.contains("todo-delete-btn")) {
            todoIndex = target.parentNode.id.split("-")[1];
        }
        else {
            todoIndex = target.parentNode.parentNode.id.split("-")[1];
        }
        logicController.getCurrentProject().removeTodoAt(todoIndex);
        updateTodosDisplay();
    }
    else if (target.classList.contains("todo-edit-btn") || target.parentNode.classList.contains("todo-edit-btn")) {
        let todoIndex = "";
        if (target.classList.contains("todo-edit-btn")) {
            todoIndex = target.parentNode.id.split("-")[1];
        }
        else {
            todoIndex = target.parentNode.parentNode.id.split("-")[1];
        }
        dialog.showModal();
        createTodoForm();
        const todo = logicController.getCurrentProject().getTodoAt(todoIndex);
        const nameInput = document.querySelector("#name-input");
        nameInput.value = todo.getName();
        const dateInput = document.querySelector("#date-input");
        dateInput.value = todo.getDueDate();
        const priorityInput = document.querySelector("#priority-input");
        priorityInput.value = todo.getPriority();
        const description = document.querySelector("#description");
        description.value = todo.getDescription();
        const submitBtn = document.querySelector(".todo-submit-btn");
        submitBtn.classList.remove("todo-submit-btn");
        submitBtn.classList.add("edit-submit-btn");
        submitBtn.id = "edit-" + todoIndex;
    }
    else if (target.classList.contains("add-btn") || target.parentNode.classList.contains("add-btn")) {
        dialog.showModal();
        createProjectForm();
    }
    else if (target.classList.contains("todo-form-btn")) {
        createTodoForm();
    }
    else if (target.classList.contains("project-form-btn")) {
        createProjectForm();
    }
    else if (target.classList.contains("close-btn")) {
        dialog.close();
    }
    else if (target.classList.contains("project-submit-btn")) {
        const nameInput = document.querySelector("#name-input");
        if (!nameInput.checkValidity()) {
            return;
        }
        logicController.addProject(nameInput.value);
        updateProjectDisplay();
        updateTodosDisplay();
        dialog.close();
    }
    else if (target.classList.contains("todo-submit-btn")) {
        const inputs = document.querySelectorAll("input");
        for (const input of inputs) {
            if (!input.checkValidity()) {
                return;
            }
        }
        const name = document.querySelector("#name-input").value;
        const dueDate = document.querySelector("#date-input").value;
        const priority = document.querySelector("#priority-input").value;
        const description = document.querySelector("#description").value;
        const currentProject = logicController.getCurrentProject();
        currentProject.addTodo(name, dueDate, priority, description);
        updateTodosDisplay();
        dialog.close();
    }
    else if (target.classList.contains("edit-submit-btn")) {
        const inputs = document.querySelectorAll("input");
        for (const input of inputs) {
            if (!input.checkValidity()) {
                return;
            }
        }
        const todoIndex = target.id.split("-")[1];
        const todo = logicController.getCurrentProject().getTodoAt(todoIndex);
        const name = document.querySelector("#name-input").value;
        const dueDate = document.querySelector("#date-input").value;
        const priority = document.querySelector("#priority-input").value;
        const description = document.querySelector("#description").value;

        todo.setName(name);
        todo.setDueDate(dueDate);
        todo.setPriority(priority);
        todo.setDescription(description);
        updateTodosDisplay();
        dialog.close();
    }
});

updateProjectDisplay();