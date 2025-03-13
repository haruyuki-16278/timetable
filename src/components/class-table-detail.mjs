import { basicStyle } from "../shared/style.mjs";
import { DB, TABLE_STORE_NAME, CLASS_STORE_NAME } from "../shared/db.mjs";

export class ClassTableDetail extends HTMLElement {
  static observedAttributes = ["dayperiod"];
  shadowRoot = undefined;
  tableData = /** @type {import("../types/table-data.mjs").TableData | undefined} */ (undefined);
  classes = /** @type {import("../types/class-data.mjs").ClassData[]} */ ([]);
  classData = /** @type {import("../types/class-data.mjs").ClassData | undefined} */ (undefined);
  isEditing = false;

  get dayperiod() {
    return this.getAttribute("dayperiod");
  }

  get day() {
    return this.dayperiod.split("-")[0];
  }

  get period() {
    return this.dayperiod.split("-")[1];
  }

  css = /*css*/ `
    ${basicStyle}

    :host {
      & .class-table-detail {
        width: 100%;
        height: 100%;
        padding: 1em;
        display: flex;
        flex-direction: column;

        & .empty {
          width: 100%;
          height: 100%;
          display: grid;
          place-content: center;
          color: gray;
        }

        & .header {
          height: 32px;
          width: 100%;
          margin-bottom: 1em;
          display: flex;
          align-items: center;

          & button {
            width: 32px;
            height: 32px;
            margin-left: auto;
            border: none;
            background-color: transparent;
            cursor: pointer;
            font-size: 24px;

            &.edit {
              transform: rotate(90deg);
            }
          }
        }

        & select#class-select {
          width: 100%;
          height: 32px;
          padding: 0 16px;
          border: 2px solid lightgray;
          border-radius: 100vh;
          background-color: transparent;
          cursor: pointer;
        }
      }
    }
  `;

  html = () => /*html*/ `
    <style>${this.css}</style>
    <div class="class-table-detail">
    ${
      this.dayperiod
        ? /*html*/ `
          <div class="header">
            <span>${this.day}曜日 ${this.period}限</span>
            <button id="detail-header-button" class="${this.isEditing ? "" : "edit"}">${
            this.isEditing ? "💾" : "✏️"
          }</button>
          </div>
          ${
            this.isEditing
              ? /*html*/ `
                  <select id="class-select">
                    ${[
                      {
                        id: "empty",
                        name: "空き",
                      },
                      ...this.classes,
                    ]
                      .map((c) => /*html*/ `<option value="${c.id}">${c.name}</option>`)
                      .join("")}
                  </select>
                `
              : this.tableData?.classId
              ? /*html*/ `
                    <span>${this.classData?.name}</span>
                  `
              : /*html*/ `
                    <div class="empty">
                      <span>空き</span>
                    </div>
                  `
          }
        `
        : /*html*/ `
          <div class="empty"><span>授業をタップして選択</span></div>
        `
    }
    </div>
  `;

  constructor() {
    super();
    this.shadowRoot = this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    this.render();
    this.addEventListener("tableItemClicked", (e) => {
      console.log(e.detail);
    });
    this.classes = await DB.getAll(CLASS_STORE_NAME);
  }

  async attributeChangedCallback(name, oldValue, newValue) {
    if (name === "dayperiod") {
      this.isEditing = false;
      this.tableData = /** @type {import("../types/table-data.mjs").TableData} */ (
        await DB.get(TABLE_STORE_NAME, newValue)
      );
      console.log(this.tableData);
      if (this.tableData) {
        this.classData = this.classes.find((c) => c.id === this.tableData.classId);
      }
      this.render();
    }
  }

  render() {
    this.shadowRoot.innerHTML = this.html();
    if (this.dayperiod) {
      this.shadowRoot.querySelector("#detail-header-button").addEventListener("click", async () => {
        if (this.isEditing) {
          const classId = this.shadowRoot.querySelector("#class-select").value;
          if (classId !== "empty") {
            await DB.set(TABLE_STORE_NAME, {
              dayperiod: this.dayperiod,
              classId,
            });
          } else {
            await DB.delete(TABLE_STORE_NAME, this.dayperiod);
          }
          this.classData =
            classId === "empty" ? undefined : this.classes.find((c) => c.id === classId);
          this.tableData =
            classId === "empty"
              ? undefined
              : {
                  dayperiod: this.dayperiod,
                  classId,
                };
          this.dispatchEvent(
            new CustomEvent("tableItemChanged", {
              bubbles: true,
              detail: null,
            })
          );
        }
        this.isEditing = !this.isEditing;
        this.render();
      });
    }
  }
}
