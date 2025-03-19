import { TodoProject } from "./todo-project";

const projects = [];
let currentProjectIndex = 0;

export function addProject(name) {
    const newProject = new TodoProject(name);
    projects.push(newProject);
    currentProjectIndex = projects.length - 1;
}

export function getProjectsLength() {
    return projects.length;
}

export function getProjectAt(index) {
    return projects[index];
}

export function getCurrentProjectIndex() {
    return currentProjectIndex;
}

export function setCurrentProjectIndex(index) {
    currentProjectIndex = index;
}