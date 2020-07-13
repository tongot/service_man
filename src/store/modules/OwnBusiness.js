import axios from 'axios';

const state = {
  ownBusiness: [],
  business: {},
};
const getters = {
  get_ownBusiness: (state) => state.ownBusiness,
  get_business: (state) => state.business,
};
const actions = {
  async getOwnBusiness({ commit }) {
    try {
      const response = await axios.get('/business_api/my-business');
      commit('set_ownBusiness', response.data);
    } catch (e) {
      console.log('error page');
    }
  },
  async deleteBusiness({ commit }, businessId) {
    const response = await axios.delete('/business_api/business/' + businessId);
    try {
      if (response.status === 204) {
        actions.getOwnBusiness({ commit });
        return await response.data;
      }
    } catch (e) {
      console.log('error');
    }
  },
  async getBusinessById({ commit }, businessId) {
    try {
      const response = await axios.get('/business_api/business/' + businessId);
      commit('set_business', response.data);
      return await response.data;
    } catch (e) {
      console.log('error page');
    }
  },
};
const mutations = {
  set_ownBusiness: (state, business) => (state.ownBusiness = business),
  set_business: (state, data) => (state.business = data),
};
export default {
  state,
  getters,
  actions,
  mutations,
};
