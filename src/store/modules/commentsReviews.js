import axios from "axios";

const state = {
  rating: null,
  comments: [],
  rating_dialog: false,
  rateId: 0,
};
const getters = {
  get_comments: (state) => state.comments,
  get_rating_dialog: (state) => state.rating_dialog,
};
const actions = {
  openRatingDialog({ commit }, id) {
    commit("set_rateId", id);
    state.rating_dialog = !state.rating_dialog;
  },
  async postRating({ commit }, comment) {
    let response;
    try {
      response = axios.post("/business_api/rate-business/", {
        comment: comment.comment,
        stars: comment.number_of_stars > 0 ? comment.number_of_stars : 0,
        user: comment.user,
        business: state.rateId,
      });
    } catch (error) {
      console.log(error.response);
    }
    try {
      commit("set_rating", response.data);
      return await response;
    } catch (error) {
      console.log(error.response);
    }
  },
  async getComments({ commit }, businessId) {
    const response = await axios.get(
      "/business_api/business-comment/getBusinessComment/?businessId=" +
        businessId
    );
    try {
      if (response.status === 200) {
        commit("set_comments", response.data);
        return await response.data;
      } else {
        console.log(response.status);
      }
    } catch (e) {
      console.log(e.response);
    }
  },
};
const mutations = {
  set_rating: (state, data) => (state.rating = data),
  set_comments: (state, data) => (state.comments = data),
  set_rateId: (state, data) => (state.rateId = data),
};

export default {
  state,
  actions,
  getters,
  mutations,
};
