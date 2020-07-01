<template>
  <v-card flat>
    <v-card class="div-container" outlined flat>
      <v-toolbar dark :color="getBarColor(get_business.profile)" height="60" flat>
        <v-toolbar-title></v-toolbar-title>
        <v-avatar>
          <v-img width="400" :src="get_business.business_logo"></v-img>
        </v-avatar>
        <v-chip large outlined class="display-1">{{get_business.name}}</v-chip>
        <span class="d-none d-sm-flex d-sm-none d-md-flex">
          <v-btn
            small
            text
            v-for="(menu,index) in menus"
            :to="menu.name"
            :key="index"
          >{{menu.label}}</v-btn>
        </span>

        <v-spacer></v-spacer>
        <!--
  Cart view
        -->
        <v-menu transition="slide-x-transition" bottom left :close-on-content-click="false">
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon dark v-bind="attrs" v-on="on">
              <v-badge :content="get_cart_items.items.length">
                <v-icon>mdi-cart</v-icon>
              </v-badge>
            </v-btn>
          </template>
          <v-card width="400">
            <v-list>
              <v-list-item-group>
                <v-list-item v-for="(item, index) in get_cart_items.items" :key="index">
                  <v-list-item-icon>
                    <v-icon>mdi-tag</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>{{ item.productName }}</v-list-item-title>
                  <v-list-item-action>
                    <span class="subtitle">{{"P "+item.price}}</span>
                    <v-btn @click="removeItemFromCart(index)" small depressed fab color="error">
                      <v-icon>mdi-minus</v-icon>
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>
              </v-list-item-group>
            </v-list>
            <v-card-actions>
              <v-chip pill color="success">
                <span>
                  <strong>{{"Total :"+get_cart_items.totalPrice}}</strong>
                </span>
              </v-chip>

              <v-spacer></v-spacer>
              <v-btn depressed color="primary" :disabled="checkOutEnabled()">check out</v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>

        <v-menu transition="slide-x-transition" bottom right>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="d-none d-sm-flex d-md-none d-flex d-sm-none"
              icon
              dark
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item-group>
              <v-list-item>
                <v-chip large outlined class="display-1">{{get_business.name}}</v-chip>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item v-for="(menu,index) in menus" :key="index" :to="menu.name">
                <v-list-item-title>{{menu.label}}</v-list-item-title>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-menu>
      </v-toolbar>
      <transition name="slide" mode="out-in">
        <router-view></router-view>
      </transition>
    </v-card>
  </v-card>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data: () => ({
    menus: [
      { label: "home", name: { name: "store-home" } },
      { label: "about", name: { name: "store-about" } },
      { label: "products", name: { name: "store-products" } },
      { label: "reviews", name: { name: "store-reviews" } }
    ],
    total: 0,
    component: "home",
    currentImage: -1,
    displayImage: "",
    interval: null,
    images: [
      "https://picsum.photos/350/165?random",
      "https://picsum.photos/510/300?random"
    ]
  }),
  methods: {
    ...mapActions([
      "getBusinessById",
      "setCart",
      "resetCart",
      "notify",
      "resetCart",
      "removeFromCart"
    ]),
    checkOutEnabled() {
      return this.get_cart_items.items.length > 0 ? false : true;
    },
    removeItemFromCart(index) {
      this.removeFromCart(index);
    },
    getTotal(price) {
      this.total += price;
    },
    setImage() {
      this.currentImage++;
      if (this.currentImage <= this.images.length - 1) {
        this.displayImage = this.images[this.currentImage];
      } else {
        this.currentImage = 0;
        this.displayImage = this.images[this.currentImage];
      }
    },
    getBarColor(profile) {
      if (typeof profile !== "undefined") {
        return profile.main_color;
      } else return "transparent";
    },
    startImageSwap() {
      this.interval = setInterval(() => this.setImage(), 3000);
    },
    stopInterval() {
      clearInterval(this.interval);
    },
    getCartValues() {
      let businessId = this.$route.params.businessId;
      let cart = this.get_cart_items.items;
      if (cart != null) {
        this.get_cart_items.items.filter(item => {
          item.businessId == businessId;
        });
        return cart.items.length;
      }
      return "0";
    }
  },
  computed: mapGetters(["get_business", "get_cart_items"]),
  mounted() {
    let businessId = this.$route.params.businessId;
    this.getBusinessById(businessId);
    //get the current cart and check if it belonges to the navigated to store
    let currentCart = localStorage.getItem("cart");
    if (currentCart != null) {
      currentCart = JSON.parse(currentCart);
      currentCart.businessId == businessId ? this.setCart() : this.resetCart();
    }
  },
  beforeDestroy() {
    //this.stopInterval();
  },
  beforeRouteLeave(to, from, next) {
    if (this.get_cart_items.items.length > 0) {
      const answer = window.confirm(
        "Note that you have not yet checked out from this store your cart will be automatically empted!"
      );
      if (answer) {
        localStorage.removeItem("cart");
        this.resetCart();
        this.notify({
          text: "Cart empted",
          color: "alert",
          y: "top",
          open: true
        });
        next();
      } else {
        next(false);
      }
    } else {
      next();
    }
  }
};
</script>
<style  scoped>
.slide-enter-active,
.slide-leave-active {
  transition: opacity 500ms, transform 500ms;
}
.slide-enter,
.slide-leave-to {
  opacity: 0;
  transform: translateX(-30%);
}
.div-container {
  margin-top: 15px;
  margin-left: 50px;
  margin-right: 50px;
}
@media (max-width: 800px) {
  .div-container {
    margin-top: 50px;
    margin-left: 0px;
    margin-right: 0px;
  }
}
.nav {
  list-style-type: none;
  min-width: 100px;
  font-weight: 500;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.nav li {
  display: inline-block;
  padding: 0px 20px;
  font-size: 16px;
}
.nav li a {
  transition: all 0.4 ease 0s;
}
.nav li a:hover {
  color: #0088a9;
}
.nav li a:active {
  color: #0088a9;
  font-size: 18px;
}
</style>
