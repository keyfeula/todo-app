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

        const headerContainer = document.createElement("div");
        headerContainer.classList.add("header-container");
        const header = document.createElement("h2");
        header.classList.add("todo-header");
        header.textContent = currentProject.getName();
        headerContainer.append(header);
        todosContainer.append(headerContainer);

        for (let i = 0; i < length; i++) {
            const newTodoItem = document.createElement("div");
            newTodoItem.classList.add("todo-item");
            const todoInfo = document.createElement("div");
            todoInfo.classList.add("todo-info");
            const todoButtons = document.createElement("div");
            todoButtons.classList.add("todo-buttons");

            const title = document.createElement("p");
            title.textContent = currentProject.getTodoAt(i).title;
            const dueDate = document.createElement("p");
            dueDate.textContent = currentProject.getTodoAt(i).dueDate;

            const editBtn = document.createElement("button");
            editBtn.classList.add("edit-btn");
            editBtn.textContent = "Edit";
            const deleteBtn = document.createElement("button");
            deleteBtn.classList.add("todo-delete-btn");
            deleteBtn.setAttribute("todo-index", i);
            deleteBtn.textContent = "Delete";

            todoInfo.append(title, dueDate);
            newTodoItem.append(todoInfo);
            todoButtons.append(editBtn, deleteBtn);
            newTodoItem.append(todoButtons);
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
        nameInput.focus();

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
        form.textContent = "";
        const nameInputContainer = document.createElement("div");
        nameInputContainer.classList.add("form-field");
        const nameLabel = document.createElement("label");
        nameLabel.setAttribute("for", "todo-name");
        nameLabel.textContent = "To-Do Name";
        const nameInput = document.createElement("input");
        nameInput.setAttribute("id", "todo-name");
        nameInput.setAttribute("maxlength", "20");
        nameInputContainer.append(nameLabel, nameInput);
        form.append(nameInputContainer);
        nameInput.focus();


        const descriptionContainer = document.createElement("div");
        descriptionContainer.classList.add("form-field");
        const descriptionLabel = document.createElement("label");
        descriptionLabel.setAttribute("for", "description");
        descriptionLabel.textContent = "Description";
        const descriptionInput = document.createElement("textarea");
        descriptionInput.setAttribute("id", "description");
        descriptionInput.setAttribute("rows", "3");
        descriptionInput.setAttribute("maxlength", "150");
        descriptionContainer.append(descriptionLabel, descriptionInput);
        form.append(descriptionContainer);


        const dateInputContainer = document.createElement("div");
        dateInputContainer.classList.add("form-field");
        const dateLabel = document.createElement("label");
        dateLabel.setAttribute("for", "due-date");
        dateLabel.textContent = "Due Date";
        const dateInput = document.createElement("input");
        dateInput.setAttribute("type", "date");
        dateInput.setAttribute("id", "due-date");
        dateInputContainer.append(dateLabel, dateInput);
        form.append(dateInputContainer);


        const priorityInputContainer = document.createElement("div");
        priorityInputContainer.classList.add("form-field");
        const priorityLabel = document.createElement("label");
        priorityLabel.setAttribute("for", "priority");
        priorityLabel.textContent = "Priority (1-3)";
        const priorityInput = document.createElement("input");
        priorityInput.setAttribute("type", "number");
        priorityInput.setAttribute("min", "1");
        priorityInput.setAttribute("max", "3");
        priorityInput.setAttribute("id", "priority");
        priorityInput.setAttribute("maxlength", "150");
        priorityInputContainer.append(priorityLabel, priorityInput);
        form.append(priorityInputContainer);


        const formBtnsContainer = document.createElement("div");
        formBtnsContainer.classList.add("form-buttons");
        const submitBtn = document.createElement("button");
        submitBtn.classList.add("todo-submit-btn");
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
            updateTodosDisplay(getCurrentProjectIndex());
        }
        else if (target.classList.contains("project")) {
            setCurrentProjectIndex(target.id);
            updateTodosDisplay(target.id);
        }
        else if (target.classList.contains("new-todo-btn")) {
            form.textContent = "";
            createTodoForm();
        }
        else if (target.classList.contains("new-project-btn")) {
            form.textContent = "";
            createProjectForm();
        }
        else if (target.classList.contains("todo-submit-btn")) {
            const title = document.querySelector("input#todo-name").value;
            const description = document.querySelector("textarea#description").value;
            const dueDate = document.querySelector("input#due-date").value;
            const priority = document.querySelector("input#priority").value;
            getProjectAt(getCurrentProjectIndex()).addItem(title, description, dueDate, priority);
            updateTodosDisplay(getCurrentProjectIndex());
        }
        else if (target.classList.contains("todo-delete-btn")) {
            const index = target.getAttribute("todo-index");
            getProjectAt(getCurrentProjectIndex()).removeTodoAt(index);
            updateTodosDisplay(getCurrentProjectIndex());
        }
        else if (target.classList.contains("edit-btn")) {
            dialog.showModal();
            createTodoForm();
        }
    });

    addProject("Untitled 1");
    updateProjectsDisplay();
    updateTodosDisplay(getCurrentProjectIndex());

})();