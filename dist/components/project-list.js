var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from './base-component';
import { ProjectItem } from './project-item';
import { autobind } from '../decorators/autobind';
import { projectState } from '../state/project-state';
import { ProjectStatus } from '../models/project';
export class ProjectList extends Component {
    constructor(type) {
        super('project-list', 'app', false, `${type}-projects`);
        this.type = type;
        this.assignedProjects = [];
        this.configure();
        this.renderContent();
    }
    dropHandler(event) {
        const prjId = event.dataTransfer.getData('text/plain');
        projectState.moveProject(prjId, this.type === 'active' ? ProjectStatus.ACTIVE : ProjectStatus.FINISHED);
    }
    dragOverHandler(event) {
        // Check to see if data is attached to our drag event
        event.dataTransfer &&
            event.dataTransfer.types[0] === 'text/plain' &&
            event.preventDefault();
        this.element.querySelector('ul').classList.add('droppable');
    }
    dragLeaveHandler(_) {
        const listEl = this.element.querySelector('ul');
        listEl.classList.remove('droppable');
    }
    configure() {
        this.element.addEventListener('dragover', this.dragOverHandler);
        this.element.addEventListener('dragleave', this.dragLeaveHandler);
        this.element.addEventListener('drop', this.dropHandler);
        projectState.addListeners((projects) => {
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
        this.element.querySelector('ul').setAttribute('id', listId);
        this.element.querySelector('h2').textContent =
            this.type.toUpperCase() + ' PROJECTS';
    }
    renderProjects() {
        const listEl = document.getElementById(`${this.type}-projects-list`);
        listEl.innerHTML = '';
        for (const prj of this.assignedProjects) {
            new ProjectItem(this.element.querySelector('ul').id, prj);
        }
    }
}
__decorate([
    autobind
], ProjectList.prototype, "dropHandler", null);
__decorate([
    autobind
], ProjectList.prototype, "dragOverHandler", null);
__decorate([
    autobind
], ProjectList.prototype, "dragLeaveHandler", null);
//# sourceMappingURL=project-list.js.map