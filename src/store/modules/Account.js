import axios from "axios";
import router from "../../router";

const state = {
    user: null,
    userBar: false,
    token: "",
    dialog_login: false,
    isAuthenticated: false
};
const getters = {
    get_user: (state) => state.user,
    get_token: (state) => state.token,
    get_dialog_login: (state) => state.dialog_login,
    get_userbar: (state) => state.userBar
};
const actions = {
    logout({commit}) {
        localStorage.removeItem("action");
        commit("setUsername", null);
        state.isAuthenticated = false
        router.push("/");

    },
    openUserBar() {
        state.userBar = ! state.userBar;
    },
    getSetToken({commit}) {
        if (localStorage.getItem("action") !== "undefined") {
            commit("setToken", localStorage.getItem("action"));
        }
    },
    showLogIn() {
        state.dialog_login = ! state.dialog_login;
    },

    async getUserDetails({commit}) {
        let response2;
        try {
            response2 = await axios.get("/account_api/user/");
        } catch (e) {
            response2 = e.response;
        }
        try {
            if (response2.status == "200") {
                state.isAuthenticated = true
                commit("setUsername", response2.data);
                return await response2;
            }
        } catch {
            alert("something happened contact admin");
            return response2;
        }},

    async login({
        commit
    }, data) {
        let response;
        try {
            response = await axios.post("/account_api/login/", {
                username: data.username,
                password: data.password
            });
        } catch (e) {
            response = e.response;
        }
        try {
            commit("setUsername", data.username);
            localStorage.setItem("action", response.data.token);

            return await response;
        } catch (e) {
            return response;
        }
    },
    async Register({
        commit
    }, data) {
        let response;
        try {
            response = await axios.post("/account_api/account/", {
                user: data.user,
                phone_number: data.phone_number,
                phone_number2: data.phone_number2,
                address: data.address,
                address2: data.address2,
                country: data.country
            });
        } catch (e) {
            response = e.response;
            return await response;
        }
        try {
            commit();
            return await response;
        } catch (e) {
            return response;
        }
    }
};const mutations = {
setToken: (state, token) => (state.token = token),
setUsername: (state, user) => (state.user = user),

setDialogLogIn: (state, value) => (state.dialog_login = value),
set_user_bar: (state, value) => (state.userBar = value)};export default {state, getters, actions, mutations};
