import { basicStyle } from "../shared/style.mjs";
import { DB, CLASS_STORE_NAME } from "../shared/db.mjs";

export class ClassEditPage extends HTMLElement {
  shadowRoot = undefined;
  classId = new URLSearchParams(window.location.search).get("classId") || crypto.randomUUID();
  classData = undefined;

  css = /*css*/ `
    ${basicStyle}

    :host {
      & button.header-right {
        width: 100%;
        height: 100%;
        background-color: transparent;
        border: none;
        font-size: 32px;
      }

      & .class-edit {
        width: 100%;
        padding: 0 16px;
        display: grid;
        grid-template-columns: 80px 1fr;
        align-items: center;
        gap: 8px;
  
        > * {
          height: 32px;
        }
      }
    }
    
  `;

  html = () => /*html*/ `
    <style>${this.css}</style>
    <app-header title="科目編集">
      <button slot="right" class="header-right">💾</button>
    </app-header>
    <div class="class-edit">
      <label for="class-name">科目名</label>
      <input type="text" id="class-name" autocomplete="off" value="${this.classData?.name || ""}" />
      <label for="class-room">教室</label>
      <input type="text" id="class-room" autocomplete="off" value="${this.classData?.room || ""}" />
      <label for="class-credit">単位数</label>
      <input type="number" id="class-credit" autocomplete="off" value="${
        this.classData?.credit || 0
      }" />
      <label for="class-teacher">担当教員</label>
      <input type="text" id="class-teacher" autocomplete="off" value="${
        this.classData?.teacher || ""
      }" />
      <label for="class-color">色</label>
      <input type="color" id="class-color" value="${this.classData?.color || "#000000"}" />
      <label for="class-emoji">絵文字</label>
      <input type="text" id="class-emoji" autocomplete="off" value="${
        this.classData?.emoji || ""
      }" />
      <label for="class-is-required">必修</label>
      <input type="checkbox" id="class-is-required" ${
        this.classData?.isRequired ? "checked" : ""
      } />
      <label for="class-is-expert">専門</label>
      <input type="checkbox" id="class-is-expert" ${this.classData?.isExpert ? "checked" : ""} />
    </div>
  `;

  constructor() {
    super();
  }

  async connectedCallback() {
    this.classData = await DB.get(CLASS_STORE_NAME, this.classId);
    console.log(this.classData, this.classId);

    this.shadowRoot = this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = this.html();

    this.shadowRoot.querySelector("button.header-right").addEventListener("click", async () => {
      /** @type {import("../types/class-data.mjs").ClassData} */
      const classData = {
        id: this.classId,
        name: this.shadowRoot.querySelector("#class-name").value,
        room: this.shadowRoot.querySelector("#class-room").value,
        credit: this.shadowRoot.querySelector("#class-credit").value,
        teacher: this.shadowRoot.querySelector("#class-teacher").value,
        color: this.shadowRoot.querySelector("#class-color").value,
        emoji: this.shadowRoot.querySelector("#class-emoji").value,
        isRequired: this.shadowRoot.querySelector("#class-is-required").checked,
        isExpert: this.shadowRoot.querySelector("#class-is-expert").checked,
      };

      console.log(classData);
      await DB.set(CLASS_STORE_NAME, classData);

      window.location.href = "#class-list";
    });
  }
}
