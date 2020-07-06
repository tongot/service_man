import axios from 'axios';

const state = {
  message: {},
  messages: [],
  messagingDialog: false,
  productId: null,
};

const getters = {
  get_message_dialog: (state) => state.messagingDialog,
  get_messages: (state) => state.messages,
  //get_message_productId:(state)=>state.productId
};
const actions = {
  openMessageDialog({ commit }, productId) {
    let value = !state.messagingDialog;
    commit('set_message_dialog', value);
    commit('set_message_productId', productId);
  },
  async sendMessage({ commit }, message) {
    let response;
    try {
      response = await axios.post('/business_api/message/', {
        text: message.text,
        phone: message.phone,
        email: message.email,
        customer: message.customer,
        business: message.businessId,
        product: state.productId,
      });
    } catch (e) {
      console.log(e);
    }
    try {
      if (response.status == '201') {
        commit('set_message', response.data);
        return await response;
      }
    } catch (e) {
      commit('set_message', response.data);
      console.log(e);
    }
  },
};
const mutations = {
  set_message_dialog: (state, data) => (state.messagingDialog = data),
  set_message: (state, data) => state.messages.push(data),
  set_message_productId: (state, data) => (state.productId = data),
};
export default {
  state,
  getters,
  actions,
  mutations,
};
