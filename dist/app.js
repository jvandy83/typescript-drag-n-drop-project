"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function validate(input) {
    var isValid = true;
    var value = input.value, required = input.required, minLength = input.minLength, maxLength = input.maxLength, min = input.min, max = input.max;
    if (required && typeof value === 'string') {
        isValid = isValid && value.trim().length !== 0;
    }
    if (minLength && typeof value === 'string') {
        isValid = isValid && value.trim().length >= minLength;
    }
    if (maxLength && typeof value === 'string') {
        isValid = isValid && value.trim().length <= maxLength;
    }
    if (min && typeof value === 'number') {
        isValid = isValid && value >= min;
    }
    if (max && typeof value === 'number') {
        isValid = isValid && value <= max;
    }
    return isValid;
}
function autobind(_, _2, descriptor) {
    var originalMethod = descriptor.value;
    var modifiedDescriptor = {
        congfigurable: true,
        get: function () {
            var boundFn = originalMethod.bind(this);
            return boundFn;
        },
    };
    return modifiedDescriptor;
}
var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus[ProjectStatus["ACTIVE"] = 0] = "ACTIVE";
    ProjectStatus[ProjectStatus["FINISHED"] = 1] = "FINISHED";
})(ProjectStatus || (ProjectStatus = {}));
var Project = (function () {
    function Project(id, title, description, people, status) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.people = people;
        this.status = status;
    }
    return Project;
}());
var State = (function () {
    function State() {
        this.listeners = [];
    }
    State.prototype.addListeners = function (listenerFn) {
        this.listeners.push(listenerFn);
    };
    return State;
}());
var ProjectState = (function (_super) {
    __extends(ProjectState, _super);
    function ProjectState() {
        var _this = _super.call(this) || this;
        _this.projects = [];
        return _this;
    }
    ProjectState.getInstance = function () {
        if (this.instance) {
            return this.instance;
        }
        else {
            this.instance = new ProjectState();
            return this.instance;
        }
    };
    ProjectState.prototype.addProject = function (title, desc, people) {
        var newProject = new Project(Math.random().toString(), title, desc, people, ProjectStatus.ACTIVE);
        this.projects.push(newProject);
        for (var _i = 0, _a = this.listeners; _i < _a.length; _i++) {
            var listenerFn = _a[_i];
            listenerFn(this.projects.slice());
        }
    };
    ProjectState.prototype.moveProject = function (projectId, newStatus) {
        var project = this.projects.find(function (prj) { return prj.id === projectId; });
        project.status =
            (project && project.status && project.status !== newStatus, newStatus);
        this.updateListeners();
    };
    ProjectState.prototype.updateListeners = function () {
        for (var _i = 0, _a = this.listeners; _i < _a.length; _i++) {
            var listenerFn = _a[_i];
            listenerFn(this.projects.slice());
        }
    };
    return ProjectState;
}(State));
var projectState = ProjectState.getInstance();
var Component = (function () {
    function Component(templateId, hostId, insertAt, newElementId) {
        this.templateElement = document.getElementById(templateId);
        this.hostElement = document.getElementById(hostId);
        var clonedNode = this.templateElement.content.cloneNode(true);
        this.element = clonedNode.firstElementChild;
        newElementId && this.element.setAttribute('id', newElementId);
        this.attach(insertAt);
    }
    Component.prototype.attach = function (insertAtStart) {
        this.hostElement.insertAdjacentElement(insertAtStart ? 'afterbegin' : 'beforeend', this.element);
    };
    return Component;
}());
var ProjectItem = (function (_super) {
    __extends(ProjectItem, _super);
    function ProjectItem(hostId, project) {
        var _this = _super.call(this, 'single-project', hostId, false, project.id) || this;
        _this.project = project;
        _this.renderContent();
        _this.configure();
        return _this;
    }
    Object.defineProperty(ProjectItem.prototype, "persons", {
        get: function () {
            if (this.project.people === 1) {
                return ' 1 person';
            }
            else {
                return this.project.people + " persons";
            }
        },
        enumerable: true,
        configurable: true
    });
    ProjectItem.prototype.dragStartHandler = function (event) {
        event.dataTransfer.setData('text/plain', this.project.id);
        event.dataTransfer.effectAllowed = 'move';
    };
    ProjectItem.prototype.dragEndHandler = function (_) {
        console.log('DragEnd');
    };
    ProjectItem.prototype.configure = function () {
        this.element.setAttribute('draggable', 'true');
        this.element.addEventListener('dragstart', this.dragStartHandler);
    };
    ProjectItem.prototype.renderContent = function () {
        this.element.querySelector('h2').textContent = this.project.title;
        this.element.querySelector('h3').textContent = this.project.description;
        this.element.querySelector('p').textContent = this.persons + ' assigned';
    };
    __decorate([
        autobind
    ], ProjectItem.prototype, "dragStartHandler", null);
    return ProjectItem;
}(Component));
var ProjectList = (function (_super) {
    __extends(ProjectList, _super);
    function ProjectList(type) {
        var _this = _super.call(this, 'project-list', 'app', false, type + "-projects") || this;
        _this.type = type;
        _this.assignedProjects = [];
        _this.configure();
        _this.renderContent();
        return _this;
    }
    ProjectList.prototype.dropHandler = function (event) {
        var prjId = event.dataTransfer.getData('text/plain');
        projectState.moveProject(prjId, this.type === 'active' ? ProjectStatus.ACTIVE : ProjectStatus.FINISHED);
    };
    ProjectList.prototype.dragOverHandler = function (event) {
        event.dataTransfer &&
            event.dataTransfer.types[0] === 'text/plain' &&
            event.preventDefault();
        this.element.querySelector('ul').classList.add('droppable');
    };
    ProjectList.prototype.dragLeaveHandler = function (event) {
        var listEl = this.element.querySelector('ul');
        listEl.classList.remove('droppable');
    };
    ProjectList.prototype.configure = function () {
        var _this = this;
        this.element.addEventListener('dragover', this.dragOverHandler);
        this.element.addEventListener('dragleave', this.dragLeaveHandler);
        this.element.addEventListener('drop', this.dropHandler);
        projectState.addListeners(function (projects) {
            console.log(projects);
            var relevantProject = projects.filter(function (p) {
                return _this.type === 'active'
                    ? p.status === ProjectStatus.ACTIVE
                    : p.status === ProjectStatus.FINISHED;
            });
            _this.assignedProjects = relevantProject;
            _this.renderProjects();
        });
    };
    ProjectList.prototype.renderContent = function () {
        var listId = this.type + "-projects-list";
        this.element.querySelector('ul').setAttribute('id', listId);
        this.element.querySelector('h2').textContent =
            this.type.toUpperCase() + ' PROJECTS';
    };
    ProjectList.prototype.renderProjects = function () {
        var listEl = document.getElementById(this.type + "-projects-list");
        listEl.innerHTML = '';
        for (var _i = 0, _a = this.assignedProjects; _i < _a.length; _i++) {
            var prj = _a[_i];
            new ProjectItem(this.element.querySelector('ul').id, prj);
        }
    };
    __decorate([
        autobind
    ], ProjectList.prototype, "dropHandler", null);
    __decorate([
        autobind
    ], ProjectList.prototype, "dragOverHandler", null);
    __decorate([
        autobind
    ], ProjectList.prototype, "dragLeaveHandler", null);
    return ProjectList;
}(Component));
var ProjectInput = (function (_super) {
    __extends(ProjectInput, _super);
    function ProjectInput() {
        var _this = _super.call(this, 'project-input', 'app', true, 'user-input') || this;
        _this.titleInputElement = _this.element.querySelector('#title');
        _this.descriptionInputElement = _this.element.querySelector('#description');
        _this.peopleInputElement = _this.element.querySelector('#people');
        _this.element.id = 'user-input';
        _this.configure();
        return _this;
    }
    ProjectInput.prototype.renderContent = function () { };
    ProjectInput.prototype.configure = function () {
        this.element.addEventListener('submit', this.submitHandler);
    };
    ProjectInput.prototype.submitHandler = function (event) {
        event.preventDefault();
        var userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            var title = userInput[0], desc = userInput[1], people = userInput[2];
            projectState.addProject(title, desc, people);
            this.clearInputs();
        }
    };
    ProjectInput.prototype.gatherUserInput = function () {
        var enteredTitle = this.titleInputElement.value;
        var enteredDescription = this.descriptionInputElement.value;
        var enteredPeople = this.peopleInputElement.value;
        var validateTitle = {
            value: enteredTitle,
            required: true,
            minLength: 2,
            maxLength: 25,
        };
        var validateDescription = {
            value: enteredDescription,
            required: true,
            minLength: 5,
            maxLength: 100,
        };
        var validatePeople = {
            value: enteredPeople,
            required: true,
            min: 1,
            max: 10,
        };
        if (validate(validateTitle) &&
            validate(validateDescription) &&
            validate(validatePeople)) {
            return [enteredTitle, enteredDescription, +enteredPeople];
        }
        else {
            alert('Invalid input, please try again!');
            return;
        }
    };
    ProjectInput.prototype.clearInputs = function () {
        this.titleInputElement.value = '';
        this.descriptionInputElement.value = '';
        this.peopleInputElement.value = '';
    };
    __decorate([
        autobind
    ], ProjectInput.prototype, "submitHandler", null);
    return ProjectInput;
}(Component));
var prjInput = new ProjectInput();
var activePrjList = new ProjectList('active');
var finishedPrjList = new ProjectList('finished');
//# sourceMappingURL=app.js.map