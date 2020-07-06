import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import axios from 'axios';

Vue.config.productionTip = false;
//axios.defaults.baseURL = 'http://localhost:8081';
axios.defaults.baseURL = 'https://tktongo.pythonanywhere.com';
if (localStorage.getItem('action') !== null) {
  axios.defaults.headers.common['Authorization'] = 'Token ' + localStorage.getItem('action');
}
axios.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    if (401 === error.response.status && error.response.data.detail == 'Invalid token.') {
      localStorage.removeItem('action');
      router.go();
    } else {
      return Promise.reject(error);
    }
  }
);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
