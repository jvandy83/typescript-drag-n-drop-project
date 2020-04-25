var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from './base-component';
import { autobind } from '../decorators/autobind';
import { projectState } from '../state/project-state';
import { validate } from '../utils/validator';
export class ProjectInput extends Component {
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
            projectState.addProject(title, desc, people);
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
        if (validate(validateTitle) &&
            validate(validateDescription) &&
            validate(validatePeople)) {
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
    autobind
], ProjectInput.prototype, "submitHandler", null);
//# sourceMappingURL=project-input.js.map