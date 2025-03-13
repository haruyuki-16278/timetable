import { basicStyle } from "../shared/style.mjs";

export class HomePage extends HTMLElement {
  shadowRoot = undefined;
  renderId = crypto.randomUUID();

  css = /*css*/ ` 
    ${basicStyle}

    :host {
      display: flex;
      width: 100%;
      height: 100%;
      flex-direction: column;
      gap: 4px;
      align-items: center;
      justify-content: center;
      padding: 4px;

      & class-table {
        width: 100%;
        height: 60%;
      }

      & class-table-detail {
        width: 100%;
        height: 40%;
        border: 2px solid lightgray;
        border-bottom-color: transparent;
        border-top-left-radius: 1em;
        border-top-right-radius: 1em;
      }
    }
  `;

  html = /*html*/ `
    <style>${this.css}</style>
    <class-table renderid="${this.renderId}"></class-table>
    <class-table-detail dayperiod="${this.dayperiod ?? ""}"></class-table-detail>
    <floating-link href="#class-list" emoji="📚"></floating-link>
  `;

  constructor() {
    super();
  }

  connectedCallback() {
    this.shadowRoot = this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = this.html;
    this.shadowRoot.addEventListener("tableItemClicked", (e) => {
      console.log(e.detail);
      this.shadowRoot.querySelector("class-table-detail").setAttribute("dayperiod", e.detail);
    });
    this.shadowRoot.addEventListener("tableItemChanged", () => {
      this.shadowRoot.querySelector("class-table").setAttribute("renderid", crypto.randomUUID());
    });
  }
}
