import { createApp } from 'vue';
import App from './App.vue';
import axios from 'axios';
import router from './router';
import 'bootstrap/dist/css/bootstrap.min.css';

window.apiDns = 'https://api.capybaby.cc/';

const app = createApp(App);
app.config.globalProperties.$axios = axios;
app.use(router);
app.mount('#app');