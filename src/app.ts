interface Draggable {
  dragStartHandler(event: DragEvent): void;
  dragEndHandler(event: DragEvent): void;
}

interface DragTarget {
  dragOverHandler(event: DragEvent): void;
  dropHandler(event: DragEvent): void;
  dragLeaveHandler(event: DragEvent): void;
}

interface Validatable {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}
function validate(input: Validatable) {
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

// METHOD DECORATOR
function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
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

enum ProjectStatus {
  ACTIVE,
  FINISHED,
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
type Listener<T> = (items: T[]) => void;
class State<T> {
  protected listeners: Listener<T>[] = [];
  addListeners(listenerFn: Listener<T>) {
    this.listeners.push(listenerFn);
  }
}
// SINGLETON CLASS
class ProjectState extends State<Project> {
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
const projectState = ProjectState.getInstance();
// SINGLETON INSTANCE

// BASE CLASS
abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  templateElement: HTMLTemplateElement;
  hostElement: T;
  element: U;

  constructor(
    templateId: string,
    hostId: string,
    insertAt: boolean,
    newElementId?: string
  ) {
    this.templateElement = document.getElementById(
      templateId
    ) as HTMLTemplateElement;

    this.hostElement = document.getElementById(hostId) as T;

    const clonedNode = this.templateElement.content.cloneNode(true);

    this.element = clonedNode.firstElementChild as U;

    newElementId && this.element.setAttribute('id', newElementId);

    this.attach(insertAt);
  }
  attach(insertAtStart: boolean) {
    this.hostElement.insertAdjacentElement(
      insertAtStart ? 'afterbegin' : 'beforeend',
      this.element
    );
  }
  abstract configure(): void;
  abstract renderContent(): void;
}

class ProjectItem extends Component<HTMLUListElement, HTMLLIElement>
  implements Draggable {
  private project: Project;

  get persons() {
    if (this.project.people === 1) {
      return ' 1 person';
    } else {
      return `${this.project.people} persons`;
    }
  }
  constructor(hostId: string, project: Project) {
    super('single-project', hostId, false, project.id);
    this.project = project;
    this.renderContent();
    this.configure();
  }

  @autobind
  dragStartHandler(event: DragEvent) {
    event.dataTransfer!.setData('text/plain', this.project.id);
    event.dataTransfer!.effectAllowed = 'move';
  }
  dragEndHandler(_: DragEvent) {
    console.log('DragEnd');
  }

  configure() {
    this.element.setAttribute('draggable', 'true');
    this.element.addEventListener('dragstart', this.dragStartHandler);
  }
  renderContent() {
    this.element.querySelector('h2')!.textContent = this.project.title;
    this.element.querySelector('h3')!.textContent = this.project.description;
    this.element.querySelector('p')!.textContent = this.persons + ' assigned';
  }
}

// *** PROJECT LIST CLASS *** //
class ProjectList extends Component<HTMLDivElement, HTMLElement>
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
  dragLeaveHandler(event: DragEvent) {
    const listEl = this.element.querySelector('ul')!;
    listEl.classList.remove('droppable');
  }

  configure() {
    this.element.addEventListener('dragover', this.dragOverHandler);
    this.element.addEventListener('dragleave', this.dragLeaveHandler);
    this.element.addEventListener('drop', this.dropHandler);
    projectState.addListeners((projects: Project[]) => {
      console.log(projects);
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

// *** PROJECT INPUT CLASS *** //
class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
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

const prjInput = new ProjectInput();
const activePrjList = new ProjectList('active');
const finishedPrjList = new ProjectList('finished');
