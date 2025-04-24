import { Project } from "./project";

const projects = [];
let currentProjectIndex = 0;

export const logicController = {
    addProject(name) {
        const newProject = new Project(name);
        projects.push(newProject);
        currentProjectIndex = projects.length - 1;
    },

    getProjectAt(index) {
        return projects[index];
    },

    getLength() {
        return projects.length;
    },

    getCurrentProject() {
        return projects[currentProjectIndex];
    },

    setCurrentProjectIndex(newIndex) {
        currentProjectIndex = newIndex;
    },
}