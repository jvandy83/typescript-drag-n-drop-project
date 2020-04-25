/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_project_input__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/project-input */ "./src/components/project-input.ts");
/* harmony import */ var _components_project_list__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/project-list */ "./src/components/project-list.ts");


new _components_project_input__WEBPACK_IMPORTED_MODULE_0__["ProjectInput"]();
new _components_project_list__WEBPACK_IMPORTED_MODULE_1__["ProjectList"]('active');
new _components_project_list__WEBPACK_IMPORTED_MODULE_1__["ProjectList"]('finished');


/***/ }),

/***/ "./src/components/base-component.ts":
/*!******************************************!*\
  !*** ./src/components/base-component.ts ***!
  \******************************************/
/*! exports provided: Component */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Component", function() { return Component; });
class Component {
    constructor(templateId, hostId, insertAt, newElementId) {
        this.templateElement = document.getElementById(templateId);
        this.hostElement = document.getElementById(hostId);
        const clonedNode = this.templateElement.content.cloneNode(true);
        this.element = clonedNode.childNodes[1];
        if (newElementId) {
            this.element.id = newElementId;
        }
        this.attach(insertAt);
    }
    attach(insertAtStart) {
        this.hostElement.insertAdjacentElement(insertAtStart ? 'afterbegin' : 'beforeend', this.element);
    }
}


/***/ }),

/***/ "./src/components/project-input.ts":
/*!*****************************************!*\
  !*** ./src/components/project-input.ts ***!
  \*****************************************/
/*! exports provided: ProjectInput */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjectInput", function() { return ProjectInput; });
/* harmony import */ var _base_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-component */ "./src/components/base-component.ts");
/* harmony import */ var _decorators_autobind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../decorators/autobind */ "./src/decorators/autobind.ts");
/* harmony import */ var _state_project_state__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../state/project-state */ "./src/state/project-state.ts");
/* harmony import */ var _utils_validator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/validator */ "./src/utils/validator.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




class ProjectInput extends _base_component__WEBPACK_IMPORTED_MODULE_0__["Component"] {
    constructor() {
        super('project-input', 'app', true, 'user-input');
        this.titleInputElement = this.element.querySelector('#title');
        this.descriptionInputElement = this.element.querySelector('#description');
        this.peopleInputElement = this.element.querySelector('#people');
        this.element.id = 'user-input';
        this.configure();
    }
    renderContent() { }
    configure() {
        this.element.addEventListener('submit', this.submitHandler);
    }
    submitHandler(event) {
        event.preventDefault();
        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            const [title, desc, people] = userInput;
            _state_project_state__WEBPACK_IMPORTED_MODULE_2__["projectState"].addProject(title, desc, people);
            this.clearInputs();
        }
    }
    gatherUserInput() {
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPeople = this.peopleInputElement.value;
        const validateTitle = {
            value: enteredTitle,
            required: true,
            minLength: 2,
            maxLength: 25,
        };
        const validateDescription = {
            value: enteredDescription,
            required: true,
            minLength: 5,
            maxLength: 100,
        };
        const validatePeople = {
            value: enteredPeople,
            required: true,
            min: 1,
            max: 10,
        };
        if (Object(_utils_validator__WEBPACK_IMPORTED_MODULE_3__["validate"])(validateTitle) &&
            Object(_utils_validator__WEBPACK_IMPORTED_MODULE_3__["validate"])(validateDescription) &&
            Object(_utils_validator__WEBPACK_IMPORTED_MODULE_3__["validate"])(validatePeople)) {
            return [enteredTitle, enteredDescription, +enteredPeople];
        }
        else {
            alert('Invalid input, please try again!');
            return;
        }
    }
    clearInputs() {
        this.titleInputElement.value = '';
        this.descriptionInputElement.value = '';
        this.peopleInputElement.value = '';
    }
}
__decorate([
    _decorators_autobind__WEBPACK_IMPORTED_MODULE_1__["autobind"]
], ProjectInput.prototype, "submitHandler", null);


/***/ }),

/***/ "./src/components/project-item.ts":
/*!****************************************!*\
  !*** ./src/components/project-item.ts ***!
  \****************************************/
/*! exports provided: ProjectItem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjectItem", function() { return ProjectItem; });
/* harmony import */ var _base_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-component */ "./src/components/base-component.ts");
/* harmony import */ var _decorators_autobind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../decorators/autobind */ "./src/decorators/autobind.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


class ProjectItem extends _base_component__WEBPACK_IMPORTED_MODULE_0__["Component"] {
    constructor(hostId, project) {
        super('single-project', hostId, false, project.id);
        this.project = project;
        this.renderContent();
        this.configure();
    }
    get persons() {
        if (this.project.people === 1) {
            return ' 1 person';
        }
        else {
            return `${this.project.people} persons`;
        }
    }
    dragStartHandler(event) {
        event.dataTransfer.setData('text/plain', this.project.id);
        event.dataTransfer.effectAllowed = 'move';
    }
    dragEndHandler(_) {
        console.log('DragEnd');
    }
    configure() {
        this.element.setAttribute('draggable', 'true');
        this.element.addEventListener('dragstart', this.dragStartHandler);
    }
    renderContent() {
        this.element.querySelector('h2').textContent = this.project.title;
        this.element.querySelector('h3').textContent = this.project.description;
        this.element.querySelector('p').textContent = this.persons + ' assigned';
    }
}
__decorate([
    _decorators_autobind__WEBPACK_IMPORTED_MODULE_1__["autobind"]
], ProjectItem.prototype, "dragStartHandler", null);


/***/ }),

/***/ "./src/components/project-list.ts":
/*!****************************************!*\
  !*** ./src/components/project-list.ts ***!
  \****************************************/
/*! exports provided: ProjectList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjectList", function() { return ProjectList; });
/* harmony import */ var _base_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-component */ "./src/components/base-component.ts");
/* harmony import */ var _project_item__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./project-item */ "./src/components/project-item.ts");
/* harmony import */ var _decorators_autobind__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../decorators/autobind */ "./src/decorators/autobind.ts");
/* harmony import */ var _state_project_state__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../state/project-state */ "./src/state/project-state.ts");
/* harmony import */ var _models_project__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../models/project */ "./src/models/project.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





class ProjectList extends _base_component__WEBPACK_IMPORTED_MODULE_0__["Component"] {
    constructor(type) {
        super('project-list', 'app', false, `${type}-projects`);
        this.type = type;
        this.assignedProjects = [];
        this.configure();
        this.renderContent();
    }
    dropHandler(event) {
        const prjId = event.dataTransfer.getData('text/plain');
        _state_project_state__WEBPACK_IMPORTED_MODULE_3__["projectState"].moveProject(prjId, this.type === 'active' ? _models_project__WEBPACK_IMPORTED_MODULE_4__["ProjectStatus"].ACTIVE : _models_project__WEBPACK_IMPORTED_MODULE_4__["ProjectStatus"].FINISHED);
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
        _state_project_state__WEBPACK_IMPORTED_MODULE_3__["projectState"].addListeners((projects) => {
            const relevantProject = projects.filter((p) => {
                return this.type === 'active'
                    ? p.status === _models_project__WEBPACK_IMPORTED_MODULE_4__["ProjectStatus"].ACTIVE
                    : p.status === _models_project__WEBPACK_IMPORTED_MODULE_4__["ProjectStatus"].FINISHED;
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
            new _project_item__WEBPACK_IMPORTED_MODULE_1__["ProjectItem"](this.element.querySelector('ul').id, prj);
        }
    }
}
__decorate([
    _decorators_autobind__WEBPACK_IMPORTED_MODULE_2__["autobind"]
], ProjectList.prototype, "dropHandler", null);
__decorate([
    _decorators_autobind__WEBPACK_IMPORTED_MODULE_2__["autobind"]
], ProjectList.prototype, "dragOverHandler", null);
__decorate([
    _decorators_autobind__WEBPACK_IMPORTED_MODULE_2__["autobind"]
], ProjectList.prototype, "dragLeaveHandler", null);


/***/ }),

/***/ "./src/decorators/autobind.ts":
/*!************************************!*\
  !*** ./src/decorators/autobind.ts ***!
  \************************************/
/*! exports provided: autobind */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "autobind", function() { return autobind; });
// METHOD DECORATOR
function autobind(_, _2, descriptor) {
    const originalMethod = descriptor.value;
    const modifiedDescriptor = {
        congfigurable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        },
    };
    return modifiedDescriptor;
}


/***/ }),

/***/ "./src/models/project.ts":
/*!*******************************!*\
  !*** ./src/models/project.ts ***!
  \*******************************/
/*! exports provided: ProjectStatus, Project */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjectStatus", function() { return ProjectStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Project", function() { return Project; });
var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus[ProjectStatus["ACTIVE"] = 0] = "ACTIVE";
    ProjectStatus[ProjectStatus["FINISHED"] = 1] = "FINISHED";
})(ProjectStatus || (ProjectStatus = {}));
class Project {
    constructor(id, title, description, people, status) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.people = people;
        this.status = status;
    }
}


/***/ }),

/***/ "./src/state/project-state.ts":
/*!************************************!*\
  !*** ./src/state/project-state.ts ***!
  \************************************/
/*! exports provided: ProjectState, projectState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjectState", function() { return ProjectState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "projectState", function() { return projectState; });
/* harmony import */ var _models_project__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/project */ "./src/models/project.ts");


class State {
    constructor() {
        this.listeners = [];
    }
    addListeners(listenerFn) {
        this.listeners.push(listenerFn);
    }
}
// SINGLETON CLASS
class ProjectState extends State {
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
        const newProject = new _models_project__WEBPACK_IMPORTED_MODULE_0__["Project"](Math.random().toString(), title, desc, people, _models_project__WEBPACK_IMPORTED_MODULE_0__["ProjectStatus"].ACTIVE);
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
const projectState = ProjectState.getInstance();
// SINGLETON INSTANCE


/***/ }),

/***/ "./src/utils/validator.ts":
/*!********************************!*\
  !*** ./src/utils/validator.ts ***!
  \********************************/
/*! exports provided: validate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validate", function() { return validate; });
function validate(input) {
    let isValid = true;
    const { value, required, minLength, maxLength, min, max } = input;
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


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9iYXNlLWNvbXBvbmVudC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9wcm9qZWN0LWlucHV0LnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3Byb2plY3QtaXRlbS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9wcm9qZWN0LWxpc3QudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RlY29yYXRvcnMvYXV0b2JpbmQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vZGVscy9wcm9qZWN0LnRzIiwid2VicGFjazovLy8uL3NyYy9zdGF0ZS9wcm9qZWN0LXN0YXRlLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlscy92YWxpZGF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtE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QUksS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUM7S0FDaEQ7SUFDRCxJQUFJLFNBQVMsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7UUFDMUMsT0FBTyxHQUFHLE9BQU8sSUFBSSxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsTUFBTSxJQUFJLFNBQVMsQ0FBQztLQUN2RDtJQUNELElBQUksU0FBUyxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtRQUMxQyxPQUFPLEdBQUcsT0FBTyxJQUFJLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLElBQUksU0FBUyxDQUFDO0tBQ3ZEO0lBQ0QsSUFBSSxHQUFHLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO1FBQ3BDLE9BQU8sR0FBRyxPQUFPLElBQUksS0FBSyxJQUFJLEdBQUcsQ0FBQztLQUNuQztJQUNELElBQUksR0FBRyxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtRQUNwQyxPQUFPLEdBQUcsT0FBTyxJQUFJLEtBQUssSUFBSSxHQUFHLENBQUM7S0FDbkM7SUFDRCxPQUFPLE9BQU8sQ0FBQztBQUNqQixDQUFDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2FwcC50c1wiKTtcbiIsImltcG9ydCB7IFByb2plY3RJbnB1dCB9IGZyb20gJy4vY29tcG9uZW50cy9wcm9qZWN0LWlucHV0JztcbmltcG9ydCB7IFByb2plY3RMaXN0IH0gZnJvbSAnLi9jb21wb25lbnRzL3Byb2plY3QtbGlzdCc7XG5cbm5ldyBQcm9qZWN0SW5wdXQoKTtcbm5ldyBQcm9qZWN0TGlzdCgnYWN0aXZlJyk7XG5uZXcgUHJvamVjdExpc3QoJ2ZpbmlzaGVkJyk7XG4iLCJleHBvcnQgYWJzdHJhY3QgY2xhc3MgQ29tcG9uZW50PFQgZXh0ZW5kcyBIVE1MRWxlbWVudCwgVSBleHRlbmRzIEhUTUxFbGVtZW50PiB7XG4gIHRlbXBsYXRlRWxlbWVudDogSFRNTFRlbXBsYXRlRWxlbWVudDtcbiAgaG9zdEVsZW1lbnQ6IFQ7XG4gIGVsZW1lbnQ6IFU7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgdGVtcGxhdGVJZDogc3RyaW5nLFxuICAgIGhvc3RJZDogc3RyaW5nLFxuICAgIGluc2VydEF0OiBib29sZWFuLFxuICAgIG5ld0VsZW1lbnRJZD86IHN0cmluZ1xuICApIHtcbiAgICB0aGlzLnRlbXBsYXRlRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuICAgICAgdGVtcGxhdGVJZFxuICAgICkgYXMgSFRNTFRlbXBsYXRlRWxlbWVudDtcblxuICAgIHRoaXMuaG9zdEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChob3N0SWQpIGFzIFQ7XG5cbiAgICBjb25zdCBjbG9uZWROb2RlID0gdGhpcy50ZW1wbGF0ZUVsZW1lbnQuY29udGVudC5jbG9uZU5vZGUodHJ1ZSk7XG5cbiAgICB0aGlzLmVsZW1lbnQgPSBjbG9uZWROb2RlLmNoaWxkTm9kZXNbMV0gYXMgVTtcblxuICAgIGlmIChuZXdFbGVtZW50SWQpIHtcbiAgICAgIHRoaXMuZWxlbWVudC5pZCA9IG5ld0VsZW1lbnRJZDtcbiAgICB9XG5cbiAgICB0aGlzLmF0dGFjaChpbnNlcnRBdCk7XG4gIH1cbiAgYXR0YWNoKGluc2VydEF0U3RhcnQ6IGJvb2xlYW4pIHtcbiAgICB0aGlzLmhvc3RFbGVtZW50Lmluc2VydEFkamFjZW50RWxlbWVudChcbiAgICAgIGluc2VydEF0U3RhcnQgPyAnYWZ0ZXJiZWdpbicgOiAnYmVmb3JlZW5kJyxcbiAgICAgIHRoaXMuZWxlbWVudFxuICAgICk7XG4gIH1cbiAgYWJzdHJhY3QgY29uZmlndXJlKCk6IHZvaWQ7XG4gIGFic3RyYWN0IHJlbmRlckNvbnRlbnQoKTogdm9pZDtcbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJy4vYmFzZS1jb21wb25lbnQnO1xuaW1wb3J0IHsgYXV0b2JpbmQgfSBmcm9tICcuLi9kZWNvcmF0b3JzL2F1dG9iaW5kJztcbmltcG9ydCB7IHByb2plY3RTdGF0ZSB9IGZyb20gJy4uL3N0YXRlL3Byb2plY3Qtc3RhdGUnO1xuaW1wb3J0IHsgdmFsaWRhdGUsIFZhbGlkYXRhYmxlIH0gZnJvbSAnLi4vdXRpbHMvdmFsaWRhdG9yJztcbmV4cG9ydCBjbGFzcyBQcm9qZWN0SW5wdXQgZXh0ZW5kcyBDb21wb25lbnQ8SFRNTERpdkVsZW1lbnQsIEhUTUxGb3JtRWxlbWVudD4ge1xuICB0aXRsZUlucHV0RWxlbWVudDogSFRNTElucHV0RWxlbWVudDtcbiAgZGVzY3JpcHRpb25JbnB1dEVsZW1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQ7XG4gIHBlb3BsZUlucHV0RWxlbWVudDogSFRNTElucHV0RWxlbWVudDtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoJ3Byb2plY3QtaW5wdXQnLCAnYXBwJywgdHJ1ZSwgJ3VzZXItaW5wdXQnKTtcbiAgICB0aGlzLnRpdGxlSW5wdXRFbGVtZW50ID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAnI3RpdGxlJ1xuICAgICkgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgICB0aGlzLmRlc2NyaXB0aW9uSW5wdXRFbGVtZW50ID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAnI2Rlc2NyaXB0aW9uJ1xuICAgICkgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgICB0aGlzLnBlb3BsZUlucHV0RWxlbWVudCA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgJyNwZW9wbGUnXG4gICAgKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xuICAgIHRoaXMuZWxlbWVudC5pZCA9ICd1c2VyLWlucHV0JztcblxuICAgIHRoaXMuY29uZmlndXJlKCk7XG4gIH1cblxuICByZW5kZXJDb250ZW50KCkge31cblxuICBjb25maWd1cmUoKSB7XG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIHRoaXMuc3VibWl0SGFuZGxlcik7XG4gIH1cbiAgQGF1dG9iaW5kXG4gIHN1Ym1pdEhhbmRsZXIoZXZlbnQ6IEV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCB1c2VySW5wdXQgPSB0aGlzLmdhdGhlclVzZXJJbnB1dCgpO1xuICAgIGlmIChBcnJheS5pc0FycmF5KHVzZXJJbnB1dCkpIHtcbiAgICAgIGNvbnN0IFt0aXRsZSwgZGVzYywgcGVvcGxlXSA9IHVzZXJJbnB1dDtcbiAgICAgIHByb2plY3RTdGF0ZS5hZGRQcm9qZWN0KHRpdGxlLCBkZXNjLCBwZW9wbGUpO1xuICAgICAgdGhpcy5jbGVhcklucHV0cygpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2F0aGVyVXNlcklucHV0KCk6IFtzdHJpbmcsIHN0cmluZywgbnVtYmVyXSB8IHZvaWQge1xuICAgIGNvbnN0IGVudGVyZWRUaXRsZSA9IHRoaXMudGl0bGVJbnB1dEVsZW1lbnQudmFsdWU7XG4gICAgY29uc3QgZW50ZXJlZERlc2NyaXB0aW9uID0gdGhpcy5kZXNjcmlwdGlvbklucHV0RWxlbWVudC52YWx1ZTtcbiAgICBjb25zdCBlbnRlcmVkUGVvcGxlID0gdGhpcy5wZW9wbGVJbnB1dEVsZW1lbnQudmFsdWU7XG5cbiAgICBjb25zdCB2YWxpZGF0ZVRpdGxlOiBWYWxpZGF0YWJsZSA9IHtcbiAgICAgIHZhbHVlOiBlbnRlcmVkVGl0bGUsXG4gICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgIG1pbkxlbmd0aDogMixcbiAgICAgIG1heExlbmd0aDogMjUsXG4gICAgfTtcbiAgICBjb25zdCB2YWxpZGF0ZURlc2NyaXB0aW9uOiBWYWxpZGF0YWJsZSA9IHtcbiAgICAgIHZhbHVlOiBlbnRlcmVkRGVzY3JpcHRpb24sXG4gICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgIG1pbkxlbmd0aDogNSxcbiAgICAgIG1heExlbmd0aDogMTAwLFxuICAgIH07XG4gICAgY29uc3QgdmFsaWRhdGVQZW9wbGU6IFZhbGlkYXRhYmxlID0ge1xuICAgICAgdmFsdWU6IGVudGVyZWRQZW9wbGUsXG4gICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgIG1pbjogMSxcbiAgICAgIG1heDogMTAsXG4gICAgfTtcbiAgICBpZiAoXG4gICAgICB2YWxpZGF0ZSh2YWxpZGF0ZVRpdGxlKSAmJlxuICAgICAgdmFsaWRhdGUodmFsaWRhdGVEZXNjcmlwdGlvbikgJiZcbiAgICAgIHZhbGlkYXRlKHZhbGlkYXRlUGVvcGxlKVxuICAgICkge1xuICAgICAgcmV0dXJuIFtlbnRlcmVkVGl0bGUsIGVudGVyZWREZXNjcmlwdGlvbiwgK2VudGVyZWRQZW9wbGVdO1xuICAgIH0gZWxzZSB7XG4gICAgICBhbGVydCgnSW52YWxpZCBpbnB1dCwgcGxlYXNlIHRyeSBhZ2FpbiEnKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNsZWFySW5wdXRzKCkge1xuICAgIHRoaXMudGl0bGVJbnB1dEVsZW1lbnQudmFsdWUgPSAnJztcbiAgICB0aGlzLmRlc2NyaXB0aW9uSW5wdXRFbGVtZW50LnZhbHVlID0gJyc7XG4gICAgdGhpcy5wZW9wbGVJbnB1dEVsZW1lbnQudmFsdWUgPSAnJztcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnLi9iYXNlLWNvbXBvbmVudCc7XG5pbXBvcnQgeyBEcmFnZ2FibGUgfSBmcm9tICcuLi9tb2RlbHMvZHJhZy1kcm9wJztcbmltcG9ydCB7IFByb2plY3QgfSBmcm9tICcuLi9tb2RlbHMvcHJvamVjdCc7XG5pbXBvcnQgeyBhdXRvYmluZCB9IGZyb20gJy4uL2RlY29yYXRvcnMvYXV0b2JpbmQnO1xuZXhwb3J0IGNsYXNzIFByb2plY3RJdGVtIGV4dGVuZHMgQ29tcG9uZW50PEhUTUxVTGlzdEVsZW1lbnQsIEhUTUxMSUVsZW1lbnQ+XG4gIGltcGxlbWVudHMgRHJhZ2dhYmxlIHtcbiAgcHJpdmF0ZSBwcm9qZWN0OiBQcm9qZWN0O1xuXG4gIGdldCBwZXJzb25zKCkge1xuICAgIGlmICh0aGlzLnByb2plY3QucGVvcGxlID09PSAxKSB7XG4gICAgICByZXR1cm4gJyAxIHBlcnNvbic7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBgJHt0aGlzLnByb2plY3QucGVvcGxlfSBwZXJzb25zYDtcbiAgICB9XG4gIH1cbiAgY29uc3RydWN0b3IoaG9zdElkOiBzdHJpbmcsIHByb2plY3Q6IFByb2plY3QpIHtcbiAgICBzdXBlcignc2luZ2xlLXByb2plY3QnLCBob3N0SWQsIGZhbHNlLCBwcm9qZWN0LmlkKTtcbiAgICB0aGlzLnByb2plY3QgPSBwcm9qZWN0O1xuICAgIHRoaXMucmVuZGVyQ29udGVudCgpO1xuICAgIHRoaXMuY29uZmlndXJlKCk7XG4gIH1cblxuICBAYXV0b2JpbmRcbiAgZHJhZ1N0YXJ0SGFuZGxlcihldmVudDogRHJhZ0V2ZW50KSB7XG4gICAgZXZlbnQuZGF0YVRyYW5zZmVyIS5zZXREYXRhKCd0ZXh0L3BsYWluJywgdGhpcy5wcm9qZWN0LmlkKTtcbiAgICBldmVudC5kYXRhVHJhbnNmZXIhLmVmZmVjdEFsbG93ZWQgPSAnbW92ZSc7XG4gIH1cbiAgZHJhZ0VuZEhhbmRsZXIoXzogRHJhZ0V2ZW50KSB7XG4gICAgY29uc29sZS5sb2coJ0RyYWdFbmQnKTtcbiAgfVxuXG4gIGNvbmZpZ3VyZSgpIHtcbiAgICB0aGlzLmVsZW1lbnQuc2V0QXR0cmlidXRlKCdkcmFnZ2FibGUnLCAndHJ1ZScpO1xuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnc3RhcnQnLCB0aGlzLmRyYWdTdGFydEhhbmRsZXIpO1xuICB9XG4gIHJlbmRlckNvbnRlbnQoKSB7XG4gICAgdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2gyJykhLnRleHRDb250ZW50ID0gdGhpcy5wcm9qZWN0LnRpdGxlO1xuICAgIHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKCdoMycpIS50ZXh0Q29udGVudCA9IHRoaXMucHJvamVjdC5kZXNjcmlwdGlvbjtcbiAgICB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcigncCcpIS50ZXh0Q29udGVudCA9IHRoaXMucGVyc29ucyArICcgYXNzaWduZWQnO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICcuL2Jhc2UtY29tcG9uZW50JztcbmltcG9ydCB7IFByb2plY3RJdGVtIH0gZnJvbSAnLi9wcm9qZWN0LWl0ZW0nO1xuaW1wb3J0IHsgRHJhZ1RhcmdldCB9IGZyb20gJy4uL21vZGVscy9kcmFnLWRyb3AnO1xuaW1wb3J0IHsgUHJvamVjdCB9IGZyb20gJy4uL21vZGVscy9wcm9qZWN0JztcbmltcG9ydCB7IGF1dG9iaW5kIH0gZnJvbSAnLi4vZGVjb3JhdG9ycy9hdXRvYmluZCc7XG5pbXBvcnQgeyBwcm9qZWN0U3RhdGUgfSBmcm9tICcuLi9zdGF0ZS9wcm9qZWN0LXN0YXRlJztcbmltcG9ydCB7IFByb2plY3RTdGF0dXMgfSBmcm9tICcuLi9tb2RlbHMvcHJvamVjdCc7XG5leHBvcnQgY2xhc3MgUHJvamVjdExpc3QgZXh0ZW5kcyBDb21wb25lbnQ8SFRNTERpdkVsZW1lbnQsIEhUTUxFbGVtZW50PlxuICBpbXBsZW1lbnRzIERyYWdUYXJnZXQge1xuICBhc3NpZ25lZFByb2plY3RzOiBQcm9qZWN0W107XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdHlwZTogJ2FjdGl2ZScgfCAnZmluaXNoZWQnKSB7XG4gICAgc3VwZXIoJ3Byb2plY3QtbGlzdCcsICdhcHAnLCBmYWxzZSwgYCR7dHlwZX0tcHJvamVjdHNgKTtcbiAgICB0aGlzLmFzc2lnbmVkUHJvamVjdHMgPSBbXTtcbiAgICB0aGlzLmNvbmZpZ3VyZSgpO1xuICAgIHRoaXMucmVuZGVyQ29udGVudCgpO1xuICB9XG5cbiAgQGF1dG9iaW5kXG4gIGRyb3BIYW5kbGVyKGV2ZW50OiBEcmFnRXZlbnQpIHtcbiAgICBjb25zdCBwcmpJZCA9IGV2ZW50LmRhdGFUcmFuc2ZlciEuZ2V0RGF0YSgndGV4dC9wbGFpbicpO1xuICAgIHByb2plY3RTdGF0ZS5tb3ZlUHJvamVjdChcbiAgICAgIHByaklkLFxuICAgICAgdGhpcy50eXBlID09PSAnYWN0aXZlJyA/IFByb2plY3RTdGF0dXMuQUNUSVZFIDogUHJvamVjdFN0YXR1cy5GSU5JU0hFRFxuICAgICk7XG4gIH1cblxuICBAYXV0b2JpbmRcbiAgZHJhZ092ZXJIYW5kbGVyKGV2ZW50OiBEcmFnRXZlbnQpIHtcbiAgICAvLyBDaGVjayB0byBzZWUgaWYgZGF0YSBpcyBhdHRhY2hlZCB0byBvdXIgZHJhZyBldmVudFxuICAgIGV2ZW50LmRhdGFUcmFuc2ZlciAmJlxuICAgICAgZXZlbnQuZGF0YVRyYW5zZmVyLnR5cGVzWzBdID09PSAndGV4dC9wbGFpbicgJiZcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ3VsJykhLmNsYXNzTGlzdC5hZGQoJ2Ryb3BwYWJsZScpO1xuICB9XG4gIEBhdXRvYmluZFxuICBkcmFnTGVhdmVIYW5kbGVyKF86IERyYWdFdmVudCkge1xuICAgIGNvbnN0IGxpc3RFbCA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKCd1bCcpITtcbiAgICBsaXN0RWwuY2xhc3NMaXN0LnJlbW92ZSgnZHJvcHBhYmxlJyk7XG4gIH1cblxuICBjb25maWd1cmUoKSB7XG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdvdmVyJywgdGhpcy5kcmFnT3ZlckhhbmRsZXIpO1xuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnbGVhdmUnLCB0aGlzLmRyYWdMZWF2ZUhhbmRsZXIpO1xuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdkcm9wJywgdGhpcy5kcm9wSGFuZGxlcik7XG4gICAgcHJvamVjdFN0YXRlLmFkZExpc3RlbmVycygocHJvamVjdHM6IFByb2plY3RbXSkgPT4ge1xuICAgICAgY29uc3QgcmVsZXZhbnRQcm9qZWN0ID0gcHJvamVjdHMuZmlsdGVyKChwKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLnR5cGUgPT09ICdhY3RpdmUnXG4gICAgICAgICAgPyBwLnN0YXR1cyA9PT0gUHJvamVjdFN0YXR1cy5BQ1RJVkVcbiAgICAgICAgICA6IHAuc3RhdHVzID09PSBQcm9qZWN0U3RhdHVzLkZJTklTSEVEO1xuICAgICAgfSk7XG4gICAgICB0aGlzLmFzc2lnbmVkUHJvamVjdHMgPSByZWxldmFudFByb2plY3Q7XG4gICAgICB0aGlzLnJlbmRlclByb2plY3RzKCk7XG4gICAgfSk7XG4gIH1cblxuICByZW5kZXJDb250ZW50KCkge1xuICAgIGNvbnN0IGxpc3RJZCA9IGAke3RoaXMudHlwZX0tcHJvamVjdHMtbGlzdGA7XG4gICAgdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ3VsJykhLnNldEF0dHJpYnV0ZSgnaWQnLCBsaXN0SWQpO1xuICAgIHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKCdoMicpIS50ZXh0Q29udGVudCA9XG4gICAgICB0aGlzLnR5cGUudG9VcHBlckNhc2UoKSArICcgUFJPSkVDVFMnO1xuICB9XG5cbiAgcmVuZGVyUHJvamVjdHMoKSB7XG4gICAgY29uc3QgbGlzdEVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7dGhpcy50eXBlfS1wcm9qZWN0cy1saXN0YCkhO1xuICAgIGxpc3RFbC5pbm5lckhUTUwgPSAnJztcbiAgICBmb3IgKGNvbnN0IHByaiBvZiB0aGlzLmFzc2lnbmVkUHJvamVjdHMpIHtcbiAgICAgIG5ldyBQcm9qZWN0SXRlbSh0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcigndWwnKSEuaWQsIHByaik7XG4gICAgfVxuICB9XG59XG4iLCIvLyBNRVRIT0QgREVDT1JBVE9SXG5leHBvcnQgZnVuY3Rpb24gYXV0b2JpbmQoXzogYW55LCBfMjogc3RyaW5nLCBkZXNjcmlwdG9yOiBQcm9wZXJ0eURlc2NyaXB0b3IpIHtcbiAgY29uc3Qgb3JpZ2luYWxNZXRob2QgPSBkZXNjcmlwdG9yLnZhbHVlO1xuICBjb25zdCBtb2RpZmllZERlc2NyaXB0b3IgPSB7XG4gICAgY29uZ2ZpZ3VyYWJsZTogdHJ1ZSxcbiAgICBnZXQoKSB7XG4gICAgICBjb25zdCBib3VuZEZuID0gb3JpZ2luYWxNZXRob2QuYmluZCh0aGlzKTtcbiAgICAgIHJldHVybiBib3VuZEZuO1xuICAgIH0sXG4gIH07XG4gIHJldHVybiBtb2RpZmllZERlc2NyaXB0b3I7XG59XG4iLCJleHBvcnQgZW51bSBQcm9qZWN0U3RhdHVzIHtcbiAgQUNUSVZFLFxuICBGSU5JU0hFRCxcbn1cbmV4cG9ydCBjbGFzcyBQcm9qZWN0IHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGlkOiBzdHJpbmcsXG4gICAgcHVibGljIHRpdGxlOiBzdHJpbmcsXG4gICAgcHVibGljIGRlc2NyaXB0aW9uOiBzdHJpbmcsXG4gICAgcHVibGljIHBlb3BsZTogbnVtYmVyLFxuICAgIHB1YmxpYyBzdGF0dXM6IFByb2plY3RTdGF0dXNcbiAgKSB7fVxufVxuIiwiaW1wb3J0IHsgUHJvamVjdCB9IGZyb20gJy4uL21vZGVscy9wcm9qZWN0JztcbmltcG9ydCB7IFByb2plY3RTdGF0dXMgfSBmcm9tICcuLi9tb2RlbHMvcHJvamVjdCc7XG5cbnR5cGUgTGlzdGVuZXI8VD4gPSAoaXRlbXM6IFRbXSkgPT4gdm9pZDtcbmNsYXNzIFN0YXRlPFQ+IHtcbiAgcHJvdGVjdGVkIGxpc3RlbmVyczogTGlzdGVuZXI8VD5bXSA9IFtdO1xuICBhZGRMaXN0ZW5lcnMobGlzdGVuZXJGbjogTGlzdGVuZXI8VD4pIHtcbiAgICB0aGlzLmxpc3RlbmVycy5wdXNoKGxpc3RlbmVyRm4pO1xuICB9XG59XG4vLyBTSU5HTEVUT04gQ0xBU1NcbmV4cG9ydCBjbGFzcyBQcm9qZWN0U3RhdGUgZXh0ZW5kcyBTdGF0ZTxQcm9qZWN0PiB7XG4gIHByaXZhdGUgcHJvamVjdHM6IFByb2plY3RbXSA9IFtdO1xuICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZTogUHJvamVjdFN0YXRlO1xuICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gIH1cbiAgc3RhdGljIGdldEluc3RhbmNlKCkge1xuICAgIGlmICh0aGlzLmluc3RhbmNlKSB7XG4gICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pbnN0YW5jZSA9IG5ldyBQcm9qZWN0U3RhdGUoKTtcbiAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xuICAgIH1cbiAgfVxuICBhZGRQcm9qZWN0KHRpdGxlOiBzdHJpbmcsIGRlc2M6IHN0cmluZywgcGVvcGxlOiBudW1iZXIpIHtcbiAgICBjb25zdCBuZXdQcm9qZWN0ID0gbmV3IFByb2plY3QoXG4gICAgICBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKCksXG4gICAgICB0aXRsZSxcbiAgICAgIGRlc2MsXG4gICAgICBwZW9wbGUsXG4gICAgICBQcm9qZWN0U3RhdHVzLkFDVElWRVxuICAgICk7XG4gICAgdGhpcy5wcm9qZWN0cy5wdXNoKG5ld1Byb2plY3QpO1xuICAgIGZvciAoY29uc3QgbGlzdGVuZXJGbiBvZiB0aGlzLmxpc3RlbmVycykge1xuICAgICAgbGlzdGVuZXJGbih0aGlzLnByb2plY3RzLnNsaWNlKCkpO1xuICAgIH1cbiAgfVxuICBtb3ZlUHJvamVjdChwcm9qZWN0SWQ6IHN0cmluZywgbmV3U3RhdHVzOiBQcm9qZWN0U3RhdHVzKSB7XG4gICAgY29uc3QgcHJvamVjdCA9IHRoaXMucHJvamVjdHMuZmluZCgocHJqKSA9PiBwcmouaWQgPT09IHByb2plY3RJZCk7XG4gICAgcHJvamVjdCEuc3RhdHVzID1cbiAgICAgIChwcm9qZWN0ICYmIHByb2plY3Quc3RhdHVzICYmIHByb2plY3Quc3RhdHVzICE9PSBuZXdTdGF0dXMsIG5ld1N0YXR1cyk7XG4gICAgdGhpcy51cGRhdGVMaXN0ZW5lcnMoKTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlTGlzdGVuZXJzKCkge1xuICAgIGZvciAoY29uc3QgbGlzdGVuZXJGbiBvZiB0aGlzLmxpc3RlbmVycykge1xuICAgICAgbGlzdGVuZXJGbih0aGlzLnByb2plY3RzLnNsaWNlKCkpO1xuICAgIH1cbiAgfVxufVxuLy8gU0lOR0xFVE9OIENMQVNTXG5cbi8vIFNJTkdMRVRPTiBJTlNUQU5DRVxuZXhwb3J0IGNvbnN0IHByb2plY3RTdGF0ZSA9IFByb2plY3RTdGF0ZS5nZXRJbnN0YW5jZSgpO1xuLy8gU0lOR0xFVE9OIElOU1RBTkNFXG4iLCJleHBvcnQgaW50ZXJmYWNlIFZhbGlkYXRhYmxlIHtcbiAgdmFsdWU6IHN0cmluZyB8IG51bWJlcjtcbiAgcmVxdWlyZWQ/OiBib29sZWFuO1xuICBtaW5MZW5ndGg/OiBudW1iZXI7XG4gIG1heExlbmd0aD86IG51bWJlcjtcbiAgbWluPzogbnVtYmVyO1xuICBtYXg/OiBudW1iZXI7XG59XG5leHBvcnQgZnVuY3Rpb24gdmFsaWRhdGUoaW5wdXQ6IFZhbGlkYXRhYmxlKSB7XG4gIGxldCBpc1ZhbGlkID0gdHJ1ZTtcbiAgY29uc3QgeyB2YWx1ZSwgcmVxdWlyZWQsIG1pbkxlbmd0aCwgbWF4TGVuZ3RoLCBtaW4sIG1heCB9ID0gaW5wdXQ7XG4gIGlmIChyZXF1aXJlZCAmJiB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgaXNWYWxpZCA9IGlzVmFsaWQgJiYgdmFsdWUudHJpbSgpLmxlbmd0aCAhPT0gMDtcbiAgfVxuICBpZiAobWluTGVuZ3RoICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICBpc1ZhbGlkID0gaXNWYWxpZCAmJiB2YWx1ZS50cmltKCkubGVuZ3RoID49IG1pbkxlbmd0aDtcbiAgfVxuICBpZiAobWF4TGVuZ3RoICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICBpc1ZhbGlkID0gaXNWYWxpZCAmJiB2YWx1ZS50cmltKCkubGVuZ3RoIDw9IG1heExlbmd0aDtcbiAgfVxuICBpZiAobWluICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHtcbiAgICBpc1ZhbGlkID0gaXNWYWxpZCAmJiB2YWx1ZSA+PSBtaW47XG4gIH1cbiAgaWYgKG1heCAmJiB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgaXNWYWxpZCA9IGlzVmFsaWQgJiYgdmFsdWUgPD0gbWF4O1xuICB9XG4gIHJldHVybiBpc1ZhbGlkO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==