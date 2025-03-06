import { basicStyle } from "../shared/style.mjs";
import { range } from "../shared/utils.mjs";
import { DayOfWeeks } from "../shared/constants.mjs";
export class LessonTable extends HTMLElement {
  shadowRoot = undefined;

  css = /*css*/ `
    ${basicStyle}

    .lesson-table {
      width: 100%;
      height: 100%;
      display: grid;
      grid-auto-flow: column;
      grid-template-columns: repeat(6, 1fr);
      grid-template-rows: repeat(5, 1fr);
    }
  `;

  html = /*html*/ `
    <style>${this.css}</style>
    <div class="lesson-table">
      ${["", ...DayOfWeeks]
        .map((row) =>
          range(0, 5)
            .map(
              (col) => /*html*/ `
                <lesson-table-item lesson-name="${col === 0 ? row : col}"></lesson-table-item>
              `
            )
            .join("")
        )
        .join("")}
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
