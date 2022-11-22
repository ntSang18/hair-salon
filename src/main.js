import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// css
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import * as Bootstrap from 'bootstrap';

// icon
import * as boxicons from 'boxicons';

//Toast
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

import './plugins/chart.js';
var Vue = createApp(App);
Vue.use(ElementPlus);
Vue.use(Bootstrap);
Vue.use(boxicons);
Vue.use(Toast);

Vue.use(store).use(router).mount('#app');
