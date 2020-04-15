enum ProjectStatus {
  Active,
  Finished,
}

class Project {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public people: number,
    public status: ProjectStatus
  ) {}
}

type Listener = (items: Project[]) => void;

class ProjectState {
  private listeners: Listener[] = [];
  private projects: Project[] = [];
  private static instance: ProjectState;

  private constructor() {
    //...
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectState();
    return this.instance;
  }

  addListener(listenerFn: Listener) {
    this.listeners.push(listenerFn);
  }
  addProject(title: string, desc: string, numOfPeople: number) {
    const newProject = new Project(
      Math.random().toString(),
      title,
      desc,
      numOfPeople,
      ProjectStatus.Active
    );
    this.projects.push(newProject);
    for (const listenerFn of this.listeners) {
      listenerFn(this.projects.slice());
    }
  }
}

const projectState = ProjectState.getInstance();

interface Validatable {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

function validate(validatableInput: Validatable) {
  let isValid = true;
  const { min, max, minLength, maxLength, required, value } = validatableInput;
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

//////// METHOD DECORATOR ////////
function autobind(_: object, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
}
//////// METHOD DECORATOR ////////

// Single Project Class
class SingleProject {
  templateElement: HTMLTemplateElement;
  liElement: HTMLLIElement;

  constructor() {
    this.templateElement = document.getElementById(
      'single-project'
    ) as HTMLTemplateElement;
    // const importedNode = document.importNode(
    //   this.templateElement.content,
    //   true
    // );
    this.liElement = <HTMLLIElement>this.templateElement.querySelector('li');
  }
}
// Single Project Class

abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  templateElement: HTMLTemplateElement;
  hostElement: T;
  element: U;

  constructor(
    templateId: string,
    hostElementId: string,
    insertAtStart: boolean,
    newElementId?: string
  ) {
    this.templateElement = <HTMLTemplateElement>(
      document.getElementById(templateId)
    );
    this.hostElement = document.getElementById(hostElementId) as T;
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as U;
    if (newElementId) {
      this.element.id = newElementId;
    }
    this.attach(insertAtStart);
  }
  private attach(insertAtBeginning: boolean) {
    this.hostElement.insertAdjacentElement(
      insertAtBeginning ? 'afterbegin' : 'beforeend',
      this.element
    );
  }
}

// ProjectList Class
class ProjectList {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;

  sectionElement: HTMLElement;

  assignedProjects: Project[];

  constructor(private type: 'active' | 'finished') {
    this.templateElement = <HTMLTemplateElement>(
      document.getElementById('project-list')
    );
    this.hostElement = <HTMLDivElement>document.getElementById('app');
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.assignedProjects = [];
    this.sectionElement = importedNode.firstElementChild as HTMLElement;
    this.sectionElement.id = `${this.type}-projects`;

    projectState.addListener((projects: Project[]) => {
      const relevantProjects = projects.filter((proj) => {
        return this.type === 'active'
          ? proj.status === ProjectStatus.Active
          : proj.status === ProjectStatus.Finished;
      });

      this.assignedProjects = relevantProjects;
      this.renderProjects();
    });

    this.attach();
    this.renderContent();
  }

  private renderProjects() {
    const listEl = document.getElementById(
      `${this.type}-projects-list`
    ) as HTMLUListElement;
    listEl.innerHTML = '';
    for (const prjItem of this.assignedProjects) {
      console.log(prjItem);
      const listItem = document.createElement('ul');
      listItem.textContent = prjItem.title;
      listEl.appendChild(listItem);
    }
  }

  private renderContent() {
    const listId = `${this.type}-projects-list`;
    this.sectionElement.querySelector('ul')!.id = listId;
    this.sectionElement.querySelector('h2')!.textContent =
      this.type.toUpperCase() + 'PROJECTS';
  }
  private attach() {
    this.hostElement.insertAdjacentElement('beforeend', this.sectionElement);
  }
}
// ProjectInput Class
class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  formElement: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;
  constructor() {
    this.templateElement = document.getElementById(
      'project-input'
    ) as HTMLTemplateElement;
    this.hostElement = document.getElementById('app') as HTMLDivElement;

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.formElement = importedNode.firstElementChild as HTMLFormElement;
    this.formElement.id = 'user-input';

    this.titleInputElement = <HTMLInputElement>(
      this.formElement.querySelector('#title')
    );
    this.descriptionInputElement = this.formElement.querySelector(
      '#description'
    ) as HTMLInputElement;
    this.peopleInputElement = this.formElement.querySelector(
      '#people'
    ) as HTMLInputElement;

    this.configure();
    this.attach();
  }
  // ProjectInput Class

  private gatherUserInput(): [string, string, number] | void {
    const title = this.titleInputElement.value;
    const people = this.peopleInputElement.value;
    const description = this.descriptionInputElement.value;

    const titleValidatable: Validatable = {
      value: title,
      required: true,
    };
    const peopleValidatable: Validatable = {
      value: +people,
      required: true,
      min: 1,
    };
    const descriptionValidatable: Validatable = {
      value: description,
      required: true,
      minLength: 5,
    };
    if (
      !validate(titleValidatable) ||
      !validate(descriptionValidatable) ||
      !validate(peopleValidatable)
    ) {
      alert('invalid input, please try again.');
      return;
    }
    return [title, description, parseFloat(people)];
  }

  @autobind
  private submitHandler(event: Event) {
    event && event.preventDefault();
    const userInput = this.gatherUserInput();
    if (Array.isArray(userInput)) {
      const [title, description, people] = userInput;
      projectState.addProject(title, description, people);
      this.clear();
    }
    return;
  }

  private clear() {
    this.titleInputElement.value = '';
    this.peopleInputElement.value = '';
    this.descriptionInputElement.value = '';
  }

  private configure() {
    this.formElement.addEventListener('submit', this.submitHandler);
  }
  private attach() {
    this.hostElement.insertAdjacentElement('afterbegin', this.formElement);
  }
}

const project = new ProjectInput();
const activePrjList = new ProjectList('active');
const finshedPrjList = new ProjectList('finished');
