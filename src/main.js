import { createApp } from 'vue';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import router from './router/router';
import App from './App.vue';

createApp(App).use(router).mount('#app');


