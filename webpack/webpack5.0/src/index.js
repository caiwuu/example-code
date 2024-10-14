import { addSpan } from "./utils";
import { createApp } from "vue";
import App from "./app";
createApp(App).mount("#app");
console.log(this === window, this, window);