import "./style.css";
import { addProject, getProjectsLength, getProjectAt, getCurrentProjectIndex, setCurrentProjectIndex } from "./app-logic";

(() => {
    const dialog = document.querySelector("dialog");
    const body = document.querySelector("body");
    const projectsContainer = document.querySelector(".projects");
    const todosContainer = document.querySelector(".todos-container");
    const form = document.querySelector("dialog form");

    function updateProjectsDisplay() {
        projectsContainer.textContent = "";
        const length = getProjectsLength();
        for (let i = 0; i < length; i++) {
            const newProjectBtn = document.createElement("button");
            newProjectBtn.classList.add("project");
            newProjectBtn.id = i;
            newProjectBtn.textContent = getProjectAt(i).name;
            projectsContainer.append(newProjectBtn);
        }
        const addProjectBtn = document.createElement("button");
        addProjectBtn.classList.add("new-btn");
        addProjectBtn.textContent = "+";
        projectsContainer.append(addProjectBtn);
    }

    function updateTodosDisplay(index) {
        todosContainer.textContent = "";
        const currentProject = getProjectAt(index);
        const length = currentProject.length;
        for (let i = 0; i < length; i++) {
            const newTodoItem = document.createElement("div");
            newTodoItem.classList.add("todo-item");
            const title = document.createElement("p");
            const dueDate = document.createElement("p");

            const editBtn = document.createElement("button");
            editBtn.classList.add("edit-btn");
            const deleteBtn = document.createElement("button");
            deleteBtn.classList.add("delete-btn");

            title.textContent = currentProject.getTodoAt(i).title;
            dueDate.textContent = currentProject.getTodoAt(i).dueDate;
            editBtn.textContent = "Edit";
            deleteBtn.textContent = "Delete";

            newTodoItem.append(title);
            newTodoItem.append(dueDate);
            newTodoItem.append(editBtn);
            newTodoItem.append(deleteBtn);
            todosContainer.append(newTodoItem);
        }
    }

    function createProjectForm() {
        const nameInputContainer = document.createElement("div");
        nameInputContainer.classList.add("form-field");

        const nameLabel = document.createElement("label");
        nameLabel.setAttribute("for", "project-name");
        nameLabel.textContent = "Project Name";
        const nameInput = document.createElement("input");
        nameInput.setAttribute("id", "project-name");

        nameInputContainer.append(nameLabel, nameInput);
        form.append(nameInputContainer);

        const formBtnsContainer = document.createElement("div");
        formBtnsContainer.classList.add("form-buttons");

        const submitBtn = document.createElement("button");
        submitBtn.classList.add("project-submit-btn");
        submitBtn.setAttribute("type", "button");
        submitBtn.textContent = "Submit";
        const closeBtn = document.createElement("button");
        closeBtn.classList.add("form-close-btn");
        closeBtn.setAttribute("type", "button");
        closeBtn.textContent = "Close";

        formBtnsContainer.append(submitBtn, closeBtn);
        form.append(formBtnsContainer);
    }

    function createTodoForm() {
        const nameInputContainer = document.createElement("div");
        nameInputContainer.classList.add("form-field");

        const nameLabel = document.createElement("label");
        nameLabel.setAttribute("for", "todo-name");
        nameLabel.textContent = "To-Do Name";
        const nameInput = document.createElement("input");
        nameInput.setAttribute("id", "todo-name");

        nameInputContainer.append(nameLabel, nameInput);
        form.append(nameInputContainer);

        const formBtnsContainer = document.createElement("div");
        formBtnsContainer.classList.add("form-buttons");

        const submitBtn = document.createElement("button");
        submitBtn.classList.add("project-submit-btn");
        submitBtn.setAttribute("type", "button");
        submitBtn.textContent = "Submit";
        const closeBtn = document.createElement("button");
        closeBtn.classList.add("form-close-btn");
        closeBtn.setAttribute("type", "button");
        closeBtn.textContent = "Close";

        formBtnsContainer.append(submitBtn, closeBtn);
        form.append(formBtnsContainer);
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
        else if (target.classList.contains("project")) {
            setCurrentProjectIndex(target.id);
            updateTodosDisplay(target.id);
        }
    });

    dialog.addEventListener("click", (event) => {
        const target = event.target;
        if (target.tagName !== "BUTTON") {
            return;
        }

        if (target.classList.contains("new-todo-btn")) {
            form.textContent = "";
            createTodoForm();
        }
        else if (target.classList.contains("new-project-btn")) {
            form.textContent = "";
            createProjectForm();
        }
    });

})();