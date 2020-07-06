import axios from 'axios';
import router from '../../router';

const state = {
  user: null,
  userBar: false,
  token: '',
  dialog_login: false,
  isAuthenticated: false,
  confirmEmail: '',
  loginError: '',
  from: '',
  email_dialog: false,
};
const getters = {
  get_user: (state) => state.user,
  get_token: (state) => state.token,
  get_dialog_login: (state) => state.dialog_login,
  get_userbar: (state) => state.userBar,
  get_confirm_email: (state) => state.confirmEmail,
  get_login_error: (state) => state.loginError,
  get_email_dialog: (state) => state.email_dialog,
  get_from: (state) => state.from,
};
const actions = {
  setEmailDialog() {
    state.email_dialog = !state.email_dialog;
  },
  setConfirmEmail({ commit }, email) {
    commit('set_confirm_email', email);
  },
  logout({ commit }, emailChanged) {
    axios
      .post('/account_api/logout/')
      .then(() => {
        localStorage.removeItem('action');
        commit('setUsername', null);
        state.isAuthenticated = false;
        if (emailChanged) {
          router.push({ name: 'confirm-email' });
        } else {
          router.push({ name: 'login' });
        }
      })
      .then(() => {
        router.go();
      });
  },
  openUserBar() {
    state.userBar = !state.userBar;
  },
  getSetToken({ commit }) {
    if (localStorage.getItem('action') !== 'undefined') {
      commit('setToken', localStorage.getItem('action'));
    }
  },
  showLogIn({ commit }, from) {
    commit('set_from', from);
    state.dialog_login = !state.dialog_login;
  },

  async getUserDetails({ commit }, isLogin) {
    const response = await axios.get('/account_api/user/');
    try {
      if (response.status === 200) {
        commit('setUsername', response.data);
        if (isLogin) {
          router.push({ name: 'Home' });
        }
        return await response;
      } else {
        router.push({ name: 'login' });
      }
    } catch (error) {
      console.log(error.response);
      //alert('something happened try reloading browser');
    }
  },
  async login({ commit }, data) {
    state.loginError = '';
    let proceed = false;
    axios
      .post('/account_api/log_in/', {
        email: data.username,
        password: data.password,
      })
      .then(
        (response) => {
          if (response.status === 200) {
            if (state.from == 'change-email') {
              commit('set_email_dialog', true);
              state.dialog_login = !state.dialog_login;
              return;
            }
            proceed = true;
            localStorage.setItem('action', response.data.token);
          }
        },
        (e) => {
          if (e.response.status === 400) {
            commit('set_login_error', e.response.data.message[0]);
          }
          if (e.response.data.message == 'not_confirmed') {
            commit('set_confirm_email', data.username);
            router.push({ name: 'confirm-email' });
          }
        }
      )
      .then(() => {
        if (proceed) {
          router.push({ name: 'home' });
        }
      })
      .then(() => {
        if (proceed) {
          router.go();
        }
      });
  },
  async Register({ commit }, data) {
    let response;
    try {
      response = await axios.post('/account_api/account/', {
        user: data.user,
        phone_number: data.phone_number,
        phone_number2: data.phone_number2,
        address: data.address,
        address2: data.address2,
        country: data.country,
      });
    } catch (e) {
      response = e.response;
      return await response;
    }
    try {
      commit('set_confirm_email', data.user.email);
      return await response;
    } catch (e) {
      return response;
    }
  },
};
const mutations = {
  setToken: (state, token) => (state.token = token),
  setUsername: (state, user) => (state.user = user),
  set_login_error: (state, error) => (state.loginError = error),
  setDialogLogIn: (state, value) => (state.dialog_login = value),
  set_user_bar: (state, value) => (state.userBar = value),
  set_confirm_email: (state, email) => (state.confirmEmail = email),
  set_from: (state, from) => (state.from = from),
  set_email_dialog: (state, data) => (state.email_dialog = data),
};
export default { state, getters, actions, mutations };
