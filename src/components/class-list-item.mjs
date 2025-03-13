import { basicStyle } from "../shared/style.mjs";

export class ClassListItem extends HTMLElement {
  static observedAttributes = ["class-data"];
  shadowRoot = undefined;

  /**
   * @type {import("../types/class-data.mjs").ClassData}
   */
  get classData() {
    return JSON.parse(this.getAttribute("class-data"));
  }

  css = /*css*/ `
    ${basicStyle}
    
    :host {
      display: flex;
      width: 100%;
      height: 48px;
      background-color: white;

      & > .class-list-item {
        display: flex;
        width: 100%;
        height: 100%;
        padding: 0 16px;
        align-items: center;
        gap: 4px;

        & > .color-emoji {
          display: flex;
          width: 32px;
          height: 32px;
          border-radius: 8px;
          align-items: center;
          justify-content: center;
          font-size: 24px;
        }

        & .badge {
          width: 24px;
          height: 24px;
          border-radius: 8px;
          border-width: 2px;
          border-style: solid;
          display: grid;
          place-content: center;

          &.red {
            border-color: red;
            color: red;
          }

          &.blue {
            border-color: blue;
            color: blue;
          }
        }

        & > .icon-arrow-right {
          margin-left: auto;
          font-size: 24px;
        }
      }
    }
  `;

  html = /*html*/ `
    <style>${this.css}</style>
    <div class="class-list-item">
      <div class="color-emoji" style="background-color: ${this.classData.color};">${
    this.classData.emoji
  }</div>
      <div class="name">${this.classData.name}</div>
      ${
        this.classData.isRequired
          ? /*html*/ `
            <div class="badge red"><span>必</span></div>
          `
          : ""
      }
      ${
        this.classData.isExpert
          ? /*html*/ `
            <div class="badge blue"><span>専</span></div>
          `
          : ""
      }
      <span class="icon-arrow-right">➡️</span>
    </div>
  `;

  constructor() {
    super();
  }

  connectedCallback() {
    this.shadowRoot = this.attachShadow({ mode: "closed" });
    this.shadowRoot.innerHTML = this.html;

    this.addEventListener("click", () => {
      location.href = `?classId=${this.classData.id}#class-edit`;
    });
  }
}
