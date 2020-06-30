<template>
  <v-container fluid>
    <v-toolbar flat color="blue" dark>
      <v-toolbar-title>Products</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-text-field class="mt-6" placeholder="search product name">
        <template v-slot:append-outer>
          <v-btn icon small>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </template>
      </v-text-field>
      <v-btn icon :to="{name:'my-business'}">
        <v-icon>mdi-close-circle</v-icon>
      </v-btn>
    </v-toolbar>

    <v-row class="mx-2 mt-2">
      <v-card
        width="300"
        max-height="420"
        class="ma-1"
        v-for="product in get_products"
        :key="product.id"
      >
        <v-img
          witdth="300"
          class="white--text align-end"
          :src="getProductCover(product.product_images)"
        >
          <v-chip class="ma-2" color="yellow darken-3" text-color="white">Qnt: {{product.quantity}}</v-chip>
          <v-chip class="ma-2" color="indigo" text-color="white">
            <v-avatar left>
              <v-icon>mdi-tag</v-icon>
            </v-avatar>
            {{product.price}}
          </v-chip>
        </v-img>
        <v-card-title>{{product.name}}</v-card-title>
        <v-card-actions>
          <v-btn icon :to="{name:'product-edit', params:{productId:product.id,edit:'edit'}}">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn
            icon
            :to="{name:'pictures', params:{productId:product.id,businessId:product.business}}"
          >
            <v-icon>mdi-google-photos</v-icon>
          </v-btn>
          <v-btn text>orders</v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
  </v-container>
</template>
<script>
import { GetCoverImage } from "../../scripts/otherScripts";
import { mapGetters, mapActions } from "vuex";
export default {
  data: () => ({}),
  methods: {
    ...mapActions(["getBusinessProduct"]),
    getProductCover(product_images) {
      if (product_images.length > 0) {
        return GetCoverImage(product_images);
      } else {
        return require("../../../public/productDummy.png");
      }
    }
  },
  created() {
    this.getBusinessProduct(this.$route.params.businessId);
  },
  computed: mapGetters(["get_products"])
};
</script>