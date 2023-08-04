import { createApp } from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import 'vuetify/dist/vuetify.min.css'; // Import Vuetify Styles
import '@mdi/font/css/materialdesignicons.min.css';
import { loadFonts } from './plugins/webfontloader';
import { createRouter, createWebHistory } from 'vue-router'; // Import createRouter y createWebHistory

// import our components
import startTodo from './components/StartTodo'
import listTodo from './components/ListTodo'
import createTodo from './components/CreateTodo'
import editTodo from './components/EditTodo'
import contactTodo from './components/Contact'
import logOut from './components/LogOut'
import logIn from './components/LogIn'
import signIn from './components/SignIn'

// Create our app instance
const app = createApp(App);
app.config.productionTip = false
loadFonts()

function isUserLoggedIn() {
  const authToken = localStorage.getItem('authToken');
  return !!authToken;
}

// Create our components
app.component('startTodo', startTodo);
app.component('listTodo', listTodo);
app.component('createTodo', createTodo);
app.component('editTodo', editTodo);
app.component('contactTodo', contactTodo);
app.component('logOut', logOut);
app.component('logIn', logIn);
app.component('signIn', signIn);

//set the routes


const routes = [
  { path: '/', component: startTodo },
  { path: '/home', component: startTodo },
  { path: '/list', component: listTodo, meta: { requiresAuth: true } },
  { path: '/list/:id', component: listTodo, meta: { requiresAuth: true } },
  { path: '/create', component: createTodo, name: 'createTodo', meta: { requiresAuth: true } },
  { path: '/edit/:id', component: editTodo, name: 'editTodo', meta: { requiresAuth: true } },
  { path: '/contact', component: contactTodo },
  { path: '/logout', component: logOut },
  { path: '/login', component: logIn },
  { path: '/signin', component: signIn },
];


// Use createRouter & createWebHistory
const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(route => route.meta.requiresAuth)) {
    if (isUserLoggedIn()) {
      next();
    } else {
      next({ path: '/login', query: { redirect: to.fullPath } });
    }
  } else {
    next();
  }
});

app.use(vuetify);
app.use(router);
app.mount('#app');