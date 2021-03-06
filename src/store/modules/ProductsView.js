import axios from 'axios';
const state = {
  products: [],
  product: {},
  loadingProducts: false,
};
const getters = {
  get_view_products: (state) => state.products,
  get_view_product: (state) => state.product,
  get_product_loading: (state) => state.loadingProducts,
};
const actions = {
  getsearch(val) {
    return val !== null ? val : '';
  },
  async getViewProducts({ commit }, page) {
    let url;
    state.loadingProducts = true;
    let searchArray = [];
    if (page.productCategory.length > 0) {
      page.productCategory.forEach((element) => {
        searchArray.push(element.id);
      });
    }
    url =
      '/business_api/product/?page=' +
      page.number +
      '&search=' +
      actions.getsearch(page.search) +
      '&productCategory=' +
      searchArray.join() + // array of product ids
      '&sellers=' +
      page.businesses + // array of business ids selected (1,3,4)in form of a string
      '&minPrice=' +
      page.minPrice +
      '&maxPrice=' +
      page.maxPrice;

    try {
      const response = await axios.get(url);
      if (response.status == '200') {
        commit('set_view_products', response.data);
        state.loadingProducts = false;
        return await response.data;
      }
    } catch (error) {
      console.log(error.response);
      state.loadingProducts = false;
    }
  },
  async getProductDetail({ commit }, productId) {
    try {
      const response = await axios.get('/business_api/product/' + productId);
      if (response.status == '200') {
        commit('set_view_product', response.data);
      }
    } catch (error) {
      console.log(error.response);
    }
  },
};
const mutations = {
  set_view_products: (state, data) => (state.products = data),
  set_view_product: (state, data) => (state.product = data),
};
export default { state, getters, actions, mutations };
