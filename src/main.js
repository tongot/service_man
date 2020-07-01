import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import axios from 'axios';

Vue.config.productionTip = false;
//axios.defaults.baseURL = "http://localhost:8081";
axios.defaults.baseURL = 'https://tktongo.pythonanywhere.com';
if (localStorage.getItem('action') !== null) {
  axios.defaults.headers.common['Authorization'] = 'Token ' + localStorage.getItem('action');
}

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
