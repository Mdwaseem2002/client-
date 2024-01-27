import { createApp } from 'vue';
import App from './App.vue'; // Assuming your root component is named App.vue
import { createRouter, createWebHistory } from 'vue-router';

// Import components
import DisplayData from './components/DisplayData.vue';

// Define routes
const routes = [
  { path: '/', component: App },
  { path: '/display-data', component: DisplayData },
];

// Create router instance
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Create Vue app instance
const app = createApp(App);

// Use router in Vue app
app.use(router);

// Mount Vue app to the DOM
app.mount('#app');
