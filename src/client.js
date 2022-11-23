import { createApp } from 'vue';
import App from './Client.vue';
import routerClient from './routerClient';
import storeClient from './storeClient';
// import store from './store';

// css
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import * as Bootstrap from 'bootstrap';

// icon
import * as boxicons from 'boxicons';

// Toast
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

// CSS CLIENT
import './assets/client/styles/style.css';

import mitt from 'mitt';
const eventBus = mitt();

var Vue = createApp(App);
Vue.use(ElementPlus);
Vue.use(Bootstrap);
Vue.use(boxicons);
Vue.use(Toast, {
  transition: 'Vue-Toastification__bounce',
  maxToasts: 20,
  newestOnTop: true,
});
Vue.config.globalProperties.eventBus = eventBus;
Vue.use(storeClient).use(routerClient).mount('#client');
