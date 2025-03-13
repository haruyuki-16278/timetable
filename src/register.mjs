// ページ
import { HomePage } from "./page/home.mjs";
import { ClasslistPage } from "./page/class-list.mjs";
import { ClassEditPage } from "./page/class-edit.mjs";
// コンポーネント
import { ClassTable } from "./components/class-table.mjs";
import { ClassTableItem } from "./components/class-table-item.mjs";
import { ClassTableDetail } from "./components/class-table-detail.mjs";
import { ClassListItem } from "./components/class-list-item.mjs";
import { FloatingLink } from "./components/floating-link.mjs";
import { AppHeader } from "./components/app-header.mjs";

// ページの登録
customElements.define("home-page", HomePage);
customElements.define("class-list-page", ClasslistPage);
customElements.define("class-edit-page", ClassEditPage);
// コンポーネントの登録
customElements.define("class-table", ClassTable);
customElements.define("class-table-item", ClassTableItem);
customElements.define("class-table-detail", ClassTableDetail);
customElements.define("class-list-item", ClassListItem);
customElements.define("floating-link", FloatingLink);
customElements.define("app-header", AppHeader);
