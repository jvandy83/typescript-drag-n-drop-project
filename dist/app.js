"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus[ProjectStatus["Active"] = 0] = "Active";
    ProjectStatus[ProjectStatus["Finished"] = 1] = "Finished";
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
var ProjectState = (function () {
    function ProjectState() {
        this.listeners = [];
        this.projects = [];
    }
    ProjectState.getInstance = function () {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    };
    ProjectState.prototype.addListener = function (listenerFn) {
        this.listeners.push(listenerFn);
    };
    ProjectState.prototype.addProject = function (title, desc, numOfPeople) {
        var newProject = new Project(Math.random().toString(), title, desc, numOfPeople, ProjectStatus.Active);
        this.projects.push(newProject);
        for (var _i = 0, _a = this.listeners; _i < _a.length; _i++) {
            var listenerFn = _a[_i];
            listenerFn(this.projects.slice());
        }
    };
    return ProjectState;
}());
var projectState = ProjectState.getInstance();
function validate(validatableInput) {
    var isValid = true;
    var min = validatableInput.min, max = validatableInput.max, minLength = validatableInput.minLength, maxLength = validatableInput.maxLength, required = validatableInput.required, value = validatableInput.value;
    if (required) {
        isValid = isValid && value.toString().trim().length !== 0;
    }
    if (minLength != null && typeof value === 'string') {
        isValid = isValid && value.length >= minLength;
    }
    if (maxLength != null && typeof value === 'string') {
        isValid = isValid && value.length <= maxLength;
    }
    if (min != null && typeof value === 'number') {
        isValid = isValid && value >= min;
    }
    if (max != null && typeof value === 'number') {
        isValid = isValid && value <= max;
    }
    return isValid;
}
function autobind(_, _2, descriptor) {
    var originalMethod = descriptor.value;
    var adjDescriptor = {
        configurable: true,
        get: function () {
            var boundFn = originalMethod.bind(this);
            return boundFn;
        },
    };
    return adjDescriptor;
}
var SingleProject = (function () {
    function SingleProject() {
        this.templateElement = document.getElementById('single-project');
        this.liElement = this.templateElement.querySelector('li');
    }
    return SingleProject;
}());
var ProjectList = (function () {
    function ProjectList(type) {
        var _this = this;
        this.type = type;
        this.templateElement = (document.getElementById('project-list'));
        this.hostElement = document.getElementById('app');
        var importedNode = document.importNode(this.templateElement.content, true);
        this.assignedProjects = [];
        this.sectionElement = importedNode.firstElementChild;
        this.sectionElement.id = this.type + "-projects";
        projectState.addListener(function (projects) {
            var relevantProjects = projects.filter(function (proj) {
                return _this.type === 'active'
                    ? proj.status === ProjectStatus.Active
                    : proj.status === ProjectStatus.Finished;
            });
            _this.assignedProjects = relevantProjects;
            _this.renderProjects();
        });
        this.attach();
        this.renderContent();
    }
    ProjectList.prototype.renderProjects = function () {
        var listEl = document.getElementById(this.type + "-projects-list");
        listEl.innerHTML = '';
        for (var _i = 0, _a = this.assignedProjects; _i < _a.length; _i++) {
            var prjItem = _a[_i];
            console.log(prjItem);
            var listItem = document.createElement('ul');
            listItem.textContent = prjItem.title;
            listEl.appendChild(listItem);
        }
    };
    ProjectList.prototype.renderContent = function () {
        var listId = this.type + "-projects-list";
        this.sectionElement.querySelector('ul').id = listId;
        this.sectionElement.querySelector('h2').textContent =
            this.type.toUpperCase() + 'PROJECTS';
    };
    ProjectList.prototype.attach = function () {
        this.hostElement.insertAdjacentElement('beforeend', this.sectionElement);
    };
    return ProjectList;
}());
var ProjectInput = (function () {
    function ProjectInput() {
        this.templateElement = document.getElementById('project-input');
        this.hostElement = document.getElementById('app');
        var importedNode = document.importNode(this.templateElement.content, true);
        this.formElement = importedNode.firstElementChild;
        this.formElement.id = 'user-input';
        this.titleInputElement = (this.formElement.querySelector('#title'));
        this.descriptionInputElement = this.formElement.querySelector('#description');
        this.peopleInputElement = this.formElement.querySelector('#people');
        this.configure();
        this.attach();
    }
    ProjectInput.prototype.gatherUserInput = function () {
        var title = this.titleInputElement.value;
        var people = this.peopleInputElement.value;
        var description = this.descriptionInputElement.value;
        var titleValidatable = {
            value: title,
            required: true,
        };
        var peopleValidatable = {
            value: +people,
            required: true,
            min: 1,
        };
        var descriptionValidatable = {
            value: description,
            required: true,
            minLength: 5,
        };
        if (!validate(titleValidatable) ||
            !validate(descriptionValidatable) ||
            !validate(peopleValidatable)) {
            alert('invalid input, please try again.');
            return;
        }
        return [title, description, parseFloat(people)];
    };
    ProjectInput.prototype.submitHandler = function (event) {
        event && event.preventDefault();
        var userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            var title = userInput[0], description = userInput[1], people = userInput[2];
            projectState.addProject(title, description, people);
            this.clear();
        }
        return;
    };
    ProjectInput.prototype.clear = function () {
        this.titleInputElement.value = '';
        this.peopleInputElement.value = '';
        this.descriptionInputElement.value = '';
    };
    ProjectInput.prototype.configure = function () {
        this.formElement.addEventListener('submit', this.submitHandler);
    };
    ProjectInput.prototype.attach = function () {
        this.hostElement.insertAdjacentElement('afterbegin', this.formElement);
    };
    __decorate([
        autobind
    ], ProjectInput.prototype, "submitHandler", null);
    return ProjectInput;
}());
var project = new ProjectInput();
var activePrjList = new ProjectList('active');
var finshedPrjList = new ProjectList('finished');
//# sourceMappingURL=app.js.map