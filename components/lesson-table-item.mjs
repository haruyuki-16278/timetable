import { basicStyle } from "../shared/style.mjs";

export class LessonTableItem extends HTMLElement {
  static observedAttributes = ["lesson-name"];
  shadowRoot = undefined;

  get lessonName() {
    return this.getAttribute("lesson-name");
  }

  css = /*css*/ `
    ${basicStyle}

    .lesson-table-item {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
    }
  `;

  html = /*html*/ `
    <style>${this.css}</style>
    <div class="lesson-table-item">
      <span>${this.lessonName}</span>
    </div>
  `;

  constructor() {
    super();
    this.shadowRoot = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = this.html;
  }
}
