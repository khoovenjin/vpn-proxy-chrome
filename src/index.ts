import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import { pinia } from "./utils/pinia-state-management"
import "vant/lib/style/base.css"

createApp(App).use(pinia).use(router).mount("#app")
