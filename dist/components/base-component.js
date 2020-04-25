export class Component {
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
//# sourceMappingURL=base-component.js.map