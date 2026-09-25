// src/main.ts
import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';
import App from './App.vue';
import { it } from './locales/it';
import { en } from './locales/en';
import router from './router';
import './style.css';

// 1. Configure the i18n instance
const i18n = createI18n({
  legacy: false, // Required to use Vue 3 Composition API
  locale: 'en',  // Set default language to Italian
  fallbackLocale: 'it',
  messages: {
    it, // Load our Italian dictionary
    en
  }
});

const app = createApp(App);

// 2. Tell Vue to use the plugin
app.use(i18n);
app.use(router);
app.mount('#app');