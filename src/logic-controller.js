import { Project } from "./project";
import { Todo } from "./todo";

const projects = [];
let currentProjectIndex = 0;

export const logicController = {
    addProject(name) {
        const newProject = new Project(name);
        projects.push(newProject);
        currentProjectIndex = projects[projects.length - 1];
    },

    getProjectAt(index) {
        return projects[index];
    },

    getLength() {
        return projects.length;
    },

    getCurrentProjectIndex() {
        return currentProjectIndex;
    },

    setCurrentProjectIndex(newIndex) {
        currentProjectIndex = newIndex;
    }
}