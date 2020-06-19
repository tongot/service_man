import axios from "axios";

const state = {
  businessProfile: null,
};
const getters = {
  get_business_profile: (state) => state.businessProfile,
};
const actions = {
  async getBusinessProfile({ commit }, businessId) {
    let response;
    try {
      response = await axios.get(
        axios.get("/business_api/business_profiles/" + businessId)
      );
    } catch {
      response = null;
    }
    try {
      commit("set_business_profile", response.data);
      return await response;
    } catch {
      return response;
    }
  },
};
const mutations = {
  set_business_profile: (state, data) => (state.businessProfile = data),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
