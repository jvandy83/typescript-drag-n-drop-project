namespace App {
  type Listener<T> = (items: T[]) => void;
  class State<T> {
    protected listeners: Listener<T>[] = [];
    addListeners(listenerFn: Listener<T>) {
      this.listeners.push(listenerFn);
    }
  }
  // SINGLETON CLASS
  export class ProjectState extends State<Project> {
    private projects: Project[] = [];
    private static instance: ProjectState;
    private constructor() {
      super();
    }
    static getInstance() {
      if (this.instance) {
        return this.instance;
      } else {
        this.instance = new ProjectState();
        return this.instance;
      }
    }
    addProject(title: string, desc: string, people: number) {
      const newProject = new Project(
        Math.random().toString(),
        title,
        desc,
        people,
        ProjectStatus.ACTIVE
      );
      this.projects.push(newProject);
      for (const listenerFn of this.listeners) {
        listenerFn(this.projects.slice());
      }
    }
    moveProject(projectId: string, newStatus: ProjectStatus) {
      const project = this.projects.find((prj) => prj.id === projectId);
      project!.status =
        (project && project.status && project.status !== newStatus, newStatus);
      this.updateListeners();
    }

    private updateListeners() {
      for (const listenerFn of this.listeners) {
        listenerFn(this.projects.slice());
      }
    }
  }
  // SINGLETON CLASS

  // SINGLETON INSTANCE
  export const projectState = ProjectState.getInstance();
  // SINGLETON INSTANCE
}
