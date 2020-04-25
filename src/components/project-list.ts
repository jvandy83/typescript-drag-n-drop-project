import { Component } from './base-component';
import { ProjectItem } from './project-item';
import { DragTarget } from '../models/drag-drop';
import { Project } from '../models/project';
import { autobind } from '../decorators/autobind';
import { projectState } from '../state/project-state';
import { ProjectStatus } from '../models/project';
export class ProjectList extends Component<HTMLDivElement, HTMLElement>
  implements DragTarget {
  assignedProjects: Project[];
  constructor(private type: 'active' | 'finished') {
    super('project-list', 'app', false, `${type}-projects`);
    this.assignedProjects = [];
    this.configure();
    this.renderContent();
  }

  @autobind
  dropHandler(event: DragEvent) {
    const prjId = event.dataTransfer!.getData('text/plain');
    projectState.moveProject(
      prjId,
      this.type === 'active' ? ProjectStatus.ACTIVE : ProjectStatus.FINISHED
    );
  }

  @autobind
  dragOverHandler(event: DragEvent) {
    // Check to see if data is attached to our drag event
    event.dataTransfer &&
      event.dataTransfer.types[0] === 'text/plain' &&
      event.preventDefault();
    this.element.querySelector('ul')!.classList.add('droppable');
  }
  @autobind
  dragLeaveHandler(_: DragEvent) {
    const listEl = this.element.querySelector('ul')!;
    listEl.classList.remove('droppable');
  }

  configure() {
    this.element.addEventListener('dragover', this.dragOverHandler);
    this.element.addEventListener('dragleave', this.dragLeaveHandler);
    this.element.addEventListener('drop', this.dropHandler);
    projectState.addListeners((projects: Project[]) => {
      const relevantProject = projects.filter((p) => {
        return this.type === 'active'
          ? p.status === ProjectStatus.ACTIVE
          : p.status === ProjectStatus.FINISHED;
      });
      this.assignedProjects = relevantProject;
      this.renderProjects();
    });
  }

  renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector('ul')!.setAttribute('id', listId);
    this.element.querySelector('h2')!.textContent =
      this.type.toUpperCase() + ' PROJECTS';
  }

  renderProjects() {
    const listEl = document.getElementById(`${this.type}-projects-list`)!;
    listEl.innerHTML = '';
    for (const prj of this.assignedProjects) {
      new ProjectItem(this.element.querySelector('ul')!.id, prj);
    }
  }
}
