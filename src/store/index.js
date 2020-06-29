import Vue from "vue";
import Vuex from "vuex";
import Account from "./modules/Account";
import Associate from "./modules/Associate";
import OwnBusiness from "./modules/OwnBusiness";
import OwnProduct from "./modules/OwnProduct";
import sizedPicture from "./modules/sizedPicture";
import ProductsView from "./modules/ProductsView";
import Ordering from "./modules/Ordering";
import snackBar from "./modules/snackBar";
import Message from "./modules/Message";
import commentsReviews from "./modules/commentsReviews";
import home from "./modules/home";
import BusinessProfile from "./modules/BusinessProfile";
import Cart from "./modules/Cart"

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        Account,
        Associate,
        OwnBusiness,
        OwnProduct,
        sizedPicture,
        ProductsView,
        Ordering,
        snackBar,
        Message,
        commentsReviews,
        home,
        BusinessProfile,
        Cart
    }
});
