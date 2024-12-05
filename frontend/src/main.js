import { createApp } from 'vue';
import App from '@/App.vue';


import { createPinia } from 'pinia';
import { store } from './stores/user-store.js';
import router from './router/router';

import axios from 'axios';
const app = createApp(App);


// Configuración de Pinia
app.use(createPinia());
app.config.globalProperties.$axios = axios;

const userStore = store();

// Middleware de enrutador
router.beforeEach(async (to, from, next) => {
  const authRequired = to.meta?.auth;

  if (authRequired) {
    await userStore.refreshToken();
    if (userStore.token) {
      return next();
    } else {
      return next('/');


    }
  }

  next();
});

// Uso de enrutador
app.use(router);

// Montar la aplicación
app.mount('#app');
