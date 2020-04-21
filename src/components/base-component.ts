namespace App {
  export abstract class Component<
    T extends HTMLElement,
    U extends HTMLElement
  > {
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
}
