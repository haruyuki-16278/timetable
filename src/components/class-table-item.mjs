import { basicStyle } from "../shared/style.mjs";
import { DB, CLASS_STORE_NAME, TABLE_STORE_NAME } from "../shared/db.mjs";

export class ClassTableItem extends HTMLElement {
  static observedAttributes = ["dayperiod"];
  shadowRoot = undefined;
  tableData = undefined;
  classData = undefined;

  get dayperiod() {
    return this.getAttribute("dayperiod");
  }

  get onClick() {
    return this.getAttribute("onClick");
  }

  css = () => /*css*/ `
    ${basicStyle}

    :host {
      width: 100%;
      height: 100%;
      overflow: hidden;

      & > .class-table-item {
        width: 100%;
        height: 100%;
        padding: 0.5em;
        display: grid;
        place-content: center;
        background-color: ${this.classData?.color ?? "white"};

        span {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;

          &.empty {
            color: gray;
          }
        }
      }
    }
  `;

  html = () => /*html*/ `
    <style>${this.css()}</style>
    <div class="class-table-item">
      <span class="${this.classData ? "" : "empty"}">
        ${this.classData?.name ?? "空き"}
      </span>
    </div>
  `;

  constructor() {
    super();
    this.shadowRoot = this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    this.tableData = await DB.get(TABLE_STORE_NAME, this.dayperiod);
    if (this.tableData) {
      this.classData = await DB.get(CLASS_STORE_NAME, this.tableData.classId);
    }
    this.shadowRoot.innerHTML = this.html();
    this.addEventListener("click", () => {
      this.dispatchEvent(
        new CustomEvent("tableItemClicked", {
          bubbles: true,
          composed: true,
          detail: this.dayperiod,
        })
      );
    });
  }
}
