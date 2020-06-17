import axios from "axios";

const state = {
  countries: [],
  locations: [],
  productCategory: [],
  businessCategory: [],
  productCategorySearch: [],
  businessesSearch: [],
  businessCategorySearch: [],
  searchValue: "",
};
const getters = {
  get_search_value: (state) => state.searchValue,
  get_search_category: (state) => state.productCategorySearch,
  get_locations: (state) => state.locations,
  get_productCategory: (state) => state.productCategory,
  get_businessCategory: (state) => state.businessCategory,
  get_search_business: (state) => state.businessesSearch,
  get_search_categoryBusiness: (state) => state.businessCategorySearch,
  get_countries: (state) => state.countries,
};
const actions = {
  setSearchValue({ commit }, val) {
    commit("set_search_value", val);
  },
  addToSearch({ commit }, category) {
    commit("set_search_category", category);
  },
  async getLocations({ commit }) {
    let response;
    try {
      response = await axios.get("/business_api/location/");
    } catch {
      response = null;
    }
    try {
      commit("set_locations", response.data);
    } catch (e) {
      return response;
    }
  },
  async getBusinessSearch({ commit }, search) {
    let response;
    try {
      response = await axios.get(
        "/business_api/business/?search=" +
          search.search +
          "&businessCategory=" +
          search.categories
      );
    } catch {
      response = null;
    }
    try {
      commit("set_search_business", response.data);
      return await response.data;
    } catch (e) {
      return response;
    }
  },
  async getBusinessCategory({ commit }) {
    let response;
    try {
      response = await axios.get("/business_api/business-category/");
    } catch {
      response = null;
    }
    try {
      commit("set_businessCategory", response.data);
      return await response.data;
    } catch (e) {
      return response;
    }
  },
  async getProductCategory({ commit }) {
    let response;
    try {
      response = await axios.get("/business_api/product-category/");
    } catch {
      response = null;
    }
    try {
      commit("set_productCategory", response.data);
      return await response.data;
    } catch (e) {
      return response;
    }
  },
  async getCountries({ commit }) {
    let response;
    try {
      response = await axios.get("/business_api/country/");
    } catch {
      response = null;
    }
    try {
      commit("set_countries", response.data);
      return await response.data;
    } catch (e) {
      return response;
    }
  },
};
const mutations = {
  set_locations: (state, data) => (state.locations = data),
  set_productCategory: (state, data) => (state.productCategory = data),
  set_businessCategory: (state, data) => (state.businessCategory = data),
  set_businessCategoryChips: (state, data) =>
    (state.businessCategorySearch = data),
  set_search_category: (state, data) => (state.productCategorySearch = data),
  set_search_business: (state, data) => (state.businessesSearch = data),
  set_search_value: (state, data) => (state.searchValue = data),
  set_countries: (state, data) => (state.countries = data),
};
export default {
  state,
  getters,
  actions,
  mutations,
};
