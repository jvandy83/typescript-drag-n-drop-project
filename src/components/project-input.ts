import { Component } from './base-component';
import { autobind } from '../decorators/autobind';
import { projectState } from '../state/project-state';
import { validate, Validatable } from '../utils/validator';
export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;
  constructor() {
    super('project-input', 'app', true, 'user-input');
    this.titleInputElement = this.element.querySelector(
      '#title'
    ) as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector(
      '#description'
    ) as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector(
      '#people'
    ) as HTMLInputElement;
    this.element.id = 'user-input';

    this.configure();
  }

  renderContent() {}

  configure() {
    this.element.addEventListener('submit', this.submitHandler);
  }
  @autobind
  submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.gatherUserInput();
    if (Array.isArray(userInput)) {
      const [title, desc, people] = userInput;
      projectState.addProject(title, desc, people);
      this.clearInputs();
    }
  }

  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = this.peopleInputElement.value;

    const validateTitle: Validatable = {
      value: enteredTitle,
      required: true,
      minLength: 2,
      maxLength: 25,
    };
    const validateDescription: Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5,
      maxLength: 100,
    };
    const validatePeople: Validatable = {
      value: enteredPeople,
      required: true,
      min: 1,
      max: 10,
    };
    if (
      validate(validateTitle) &&
      validate(validateDescription) &&
      validate(validatePeople)
    ) {
      return [enteredTitle, enteredDescription, +enteredPeople];
    } else {
      alert('Invalid input, please try again!');
      return;
    }
  }

  private clearInputs() {
    this.titleInputElement.value = '';
    this.descriptionInputElement.value = '';
    this.peopleInputElement.value = '';
  }
}
