import { Project } from '../models/project';
import { ProjectStatus } from '../models/project';
class State {
    constructor() {
        this.listeners = [];
    }
    addListeners(listenerFn) {
        this.listeners.push(listenerFn);
    }
}
// SINGLETON CLASS
export class ProjectState extends State {
    constructor() {
        super();
        this.projects = [];
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        else {
            this.instance = new ProjectState();
            return this.instance;
        }
    }
    addProject(title, desc, people) {
        const newProject = new Project(Math.random().toString(), title, desc, people, ProjectStatus.ACTIVE);
        this.projects.push(newProject);
        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice());
        }
    }
    moveProject(projectId, newStatus) {
        const project = this.projects.find((prj) => prj.id === projectId);
        project.status =
            (project && project.status && project.status !== newStatus, newStatus);
        this.updateListeners();
    }
    updateListeners() {
        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice());
        }
    }
}
// SINGLETON CLASS
// SINGLETON INSTANCE
export const projectState = ProjectState.getInstance();
// SINGLETON INSTANCE
//# sourceMappingURL=project-state.js.map