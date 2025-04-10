import { Project } from "./project";
import { Todo } from "./todo";

const projects = [];

export const logicController = {
    addProject(name) {
        const newProject = new Project(name);
        projects.push(newProject);
    },

    getProjectAt(index) {
        return projects[index];
    },

    getLength() {
        return projects.length;
    }
}