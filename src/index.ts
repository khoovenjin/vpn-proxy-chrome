import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import { pinia } from "./utils/pinia-state-management"

createApp(App).use(pinia).use(router).mount("#app")
