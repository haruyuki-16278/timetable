import { basicStyle } from "../shared/style.mjs";

export class AppHeader extends HTMLElement {
  static observedAttributes = ["title"];
  shadowRoot = undefined;

  get title() {
    return this.getAttribute("title");
  }

  css = /*css*/ `
    ${basicStyle}

    :host {
      width: 100%;

      & > header {
        width: 100%;
        height: 48px;
        display: grid;
        grid-template: "left center right" 48px / 48px 1fr 48px;
        align-items: center;
        justify-content: center;
        font-size: 24px;

        & > .header-left {
          background-color: transparent;
          border: none;
          grid-area: left;
          font-size: 32px;
        }

        & > .header-title {
          grid-area: center;
          text-align: center;
        }

        & > .header-right {
          grid-area: right;
        }
      }
    }
  `;

  html = /*html*/ `
    <style>${this.css}</style>
    <header>
      <button onclick="history.back()" class="header-left">🔙</button>
      <span class="header-title">${this.title}</span>
      <slot name="right" class="header-right"></slot>
    </header>
  `;

  constructor() {
    super();
  }

  connectedCallback() {
    this.shadowRoot = this.attachShadow({ mode: "closed" });
    this.shadowRoot.innerHTML = this.html;
  }
}
