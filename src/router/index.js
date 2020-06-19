import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Products from "../views/Products.vue";
import Main from "../views/main";
import Portal from "../views/Portal.vue";
import ProductList from "../components/Product/ProductList.vue";
import AddNewProduct from "../components/Product/AddNewProduct.vue";
import BusinessList from "../components/Business/BusinessList";
import AddNewBusiness from "../components/Business/AddNewBusiness";
import OwnBusinessList from "../components/Business/OwnBusinessList";
import coverPhoto from "../components/Product/ProductCoverImage";
import pictures from "../components/Product/ProductPictures";
import OwnProductList from "../components/Product/OwnProductList";
import ProductDetails from "../components/Product/ProductDetails";
import EditProductCover from "../components/Product/EditProductCover";
import ProductOrder from "../components/Product/Order";
import BusinessOrders from "../components/Business/BusinessOrders";
import Business from "../views/Business.vue";
import portalBusiness from "../views/PortalPage/businessPortal";
import CreateAbout from "../components/Business/CreateAbout";
import store from "../views/Store";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/store/:storename/:businessId",
    name: "store",
    component: store,
  },
  {
    path: "/main",
    name: "Main",
    component: Main,
    children: [
      {
        path: "/Products",
        name: "Products",
        component: Products,
        children: [
          {
            path: "list",
            name: "product-list",
            component: ProductList,
          },

          {
            path: "product/details/:productId",
            name: "productDetails",
            component: ProductDetails,
          },
          {
            path: "product/order/:productId",
            name: "productOrder",
            component: ProductOrder,
          },
        ],
      },
      {
        path: "/Business",
        name: "Business",
        component: Business,
        children: [
          {
            path: "list",
            name: "business-list",
            component: BusinessList,
          },
        ],
      },
      {
        path: "/Portal",
        name: "portal",
        component: Portal,
        children: [
          //product urls
          {
            path: "myproducts",
            name: "myportalproducts",
            component: portalBusiness,
            children: [
              {
                path: "new/:businessId",
                name: "product-new",
                component: AddNewProduct,
              },
              {
                path: ":edit/:productId",
                name: "product-edit",
                component: AddNewProduct,
              },
              {
                path: ":businessId/coverPhoto/:productId",
                name: "coverPhoto",
                component: coverPhoto,
              },
              {
                path: ":businessId/pictures/:productId",
                name: "pictures",
                component: pictures,
              },
              {
                path: ":businessId/my-products",
                name: "own-product-list",
                component: OwnProductList,
              },
              {
                path: ":businessId/product-cover/:productId",
                name: "editCoverPicture",
                component: EditProductCover,
              },
            ],
          },

          //business urls
          {
            path: "mybusiness",
            name: "myportalbusiness",
            component: portalBusiness,
            children: [
              {
                path: "new",
                name: "business-new",
                component: AddNewBusiness,
              },
              {
                path: "my-business",
                name: "my-business",
                component: OwnBusinessList,
              },
              {
                path: "edit/:businessId",
                name: "business-edit",
                component: AddNewBusiness,
              },
              {
                path: "business/orders/:businessId",
                name: "business-orders",
                component: BusinessOrders,
              },
              {
                path: "business/about/:businessId",
                name: "about-business",
                component: CreateAbout,
              },
            ],
          },
        ],
      },
    ],
  },

  /*{
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about"  '../views/About.vue')
  }*/
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
