<template>
  <v-container fluid>
    <v-row justify="center">
      <v-card flat class="d-flex pa-2" width="500">
        <v-text-field
          outlined
          class="white--text"
          prepend-inner-icon="mdi-magnify"
          placeholder="Search any descriptive word"
          v-model="search.search"
        ></v-text-field>
        <v-btn @click="getProducts()" fab depressed class="ml-2">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </v-card>
    </v-row>
    <v-row justify="space-around">
      <v-hover
        v-slot:default="{ hover }"
        class="mx-4"
        v-for="(product,index) in get_view_products.results"
        :key="index"
      >
        <v-card width="300" :elevation="hover?12:2">
          <v-img aspect-ratio="1" :src="getCover(product.product_images)">
            <v-expand-transition>
              <div
                v-if="hover"
                class="d-flex transition-fast-in-fast-out blue darken-2 v-card--reveal display-3 white--text"
                style="height: 100%;"
              >{{"P"+product.price}}</div>
            </v-expand-transition>
          </v-img>
          <v-card-text>{{product.name}}</v-card-text>
          <v-card-actions>
            <v-btn
              text
              :to="{
                    name: 'productDetails',
                    params: { productId: product.id },
                  }"
              color="yellow darken-2"
            >more...</v-btn>
            <v-spacer></v-spacer>
            <v-btn icon color="primary" @click="addItemToCart(index)" depressed>
              <v-icon>mdi-cart-plus</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-hover>
    </v-row>
    <v-row justify="center">
      <v-pagination v-model="search.number" @input="getProducts()" class="my-4" :length="pageCount"></v-pagination>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { GetCoverImage } from "../../scripts/otherScripts";
export default {
  data: () => ({
    categories: [],
    search: {
      search: "",
      businesses: "",
      productCategory: [],
      minPrice: 0,
      maxPrice: "",
      number: 1
    }
  }),
  methods: {
    ...mapActions(["getViewProducts", "addToCart", "notify"]),
    getProducts() {
      (this.search.businesses = this.$route.params.businessId),
        this.getViewProducts(this.search);
    },
    getCover(images) {
      if (images.length > 0) {
        return GetCoverImage(images);
      } else {
        return require("../../../public/productDummy.png");
      }
    },
    addItemToCart(index) {
      let product = this.get_view_products.results[index];
      const item = {
        businessId: product.business,
        item: {
          productId: product.id,
          productName: product.name,
          price: product.price
        }
      };
      let existing = this.get_cart_items.items.filter(
        item => item.productId == product.id
      );
      if (existing.length < 1) {
        this.addToCart(item);
      } else {
        this.notify({
          text: "This item is already in cart",
          color: "error",
          open: true,
          y: "top"
        });
      }
    }
  },
  computed: {
    ...mapGetters(["get_view_products", "get_business", "get_cart_items"]),
    pageCount() {
      return this.get_view_products.count > 0
        ? Math.ceil(this.get_view_products.count / 10)
        : 0;
    }
  },
  mounted() {
    this.getProducts();
  }
};
</script>

<style>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.5;
  position: absolute;
  width: 100%;
}
</style>