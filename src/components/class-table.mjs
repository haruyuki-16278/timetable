import { basicStyle } from "../shared/style.mjs";
import { range } from "../shared/utils.mjs";
import { DayOfWeeks } from "../shared/constants.mjs";

export class ClassTable extends HTMLElement {
  static observedAttributes = ["renderid"];
  shadowRoot = undefined;

  css = /*css*/ `
    ${basicStyle}

    :host {
      background-color: ghostwhite;

      .lesson-table {
        width: 100%;
        height: 100%;
        display: grid;
        grid-auto-flow: column;
        grid-template-columns: repeat(5, 1fr);
        grid-template-rows: 3em repeat(4, 1fr);
        gap: 0.25em;
  
        .table-header {
          display: grid;
          place-content: center;
          background-color: white;
        }
      }
    }
  `;

  html = /*html*/ `
    <style>${this.css}</style>
    <div class="lesson-table">
      ${DayOfWeeks.map((day) =>
        range(0, 5)
          .map((period) =>
            period === 0
              ? /*html*/ `
                  <div class="table-header">
                    <span>${day}</span>
                  </div>
                `
              : /*html*/ `
                  <class-table-item dayperiod="${day}-${period}"></class-table-item>
                `
          )
          .join("")
      ).join("")}
    </div>
  `;

  constructor() {
    super();
    this.shadowRoot = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = this.html;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "renderid") {
      this.shadowRoot.innerHTML = this.html;
    }
  }
}
