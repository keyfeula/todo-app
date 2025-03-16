import { TodoProject } from "./todo-project";

const projects = [];

export function addProject(name) {
    const newProject = new TodoProject(name);
    projects.push(newProject);
}

export function getProjectsLength() {
    return projects.length;
}

export function getProjectAt(index) {
    return projects[index];
}