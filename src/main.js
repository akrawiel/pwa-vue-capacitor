import Vue from "vue";
import { defineCustomElements } from "@ionic/pwa-elements/loader";

import App from "./App.vue";
import router from "./router";

import "./registerServiceWorker";

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");

defineCustomElements(window);
