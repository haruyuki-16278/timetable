import { basicStyle } from "../shared/style.mjs";
import { DB, CLASS_STORE_NAME } from "../shared/db.mjs";

export class ClasslistPage extends HTMLElement {
  shadowRoot = undefined;
  classes = [];

  css = /*css*/ `
    ${basicStyle}
    
    :host {
      display: flex;
      width: 100%;
      height: 100%;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      & > .classlist {
        display: flex;
        width: 100%;
        height: 100%;
        padding-top: 2px;
        flex-direction: column;
        overflow-y: auto;
        background-color: #f5f5f5;
        gap: 2px
      }
    }
  `;

  html = () => /*html*/ `
    <style>${this.css}</style>
    <app-header title="科目一覧"></app-header>
    <div class="classlist">
      ${this.classes
        .map(
          (c) => /*html*/ `
            <class-list-item class-data='${JSON.stringify(c)}'></class-list-item>
          `
        )
        .join("")}
    </div>
    <floating-link href="#class-edit" emoji="➕"></floating-link>
  `;

  constructor() {
    super();
  }

  async connectedCallback() {
    this.classes = await DB.getAll(CLASS_STORE_NAME);

    this.shadowRoot = this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = this.html();
  }
}
