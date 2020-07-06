<template>
  <v-row>
    <v-col md="4" sm="12">
      <v-btn icon :to="{ name: 'own-product-list', params: { businessId: businessId } }">
        <v-icon>
          mdi-arrow-left
        </v-icon>
      </v-btn>
      <br />
      <v-card width="200" v-if="currentImage != null">
        <v-img :src="currentImage.image" aspect-ratio="1" contain> </v-img>
      </v-card>
    </v-col>
    <v-col md="8" sm="12">
      <coverPicture />
    </v-col>
  </v-row>
</template>
<script>
import sizedPicture from '../sizedPicture';
import { mapGetters, mapActions } from 'vuex';

export default {
  components: {
    coverPicture: sizedPicture,
  },
  data: () => ({
    currentImage: null,
    product: null,
    businessId: '',
  }),
  methods: {
    ...mapActions(['getProductToEdit', 'setIsEditing']),
  },
  computed: mapGetters(['get_product']),
  created() {
    this.businessId = this.$route.params.businessId;
    this.setIsEditing(true);
  },
  mounted() {
    this.getProductToEdit(this.$route.params.productId).then(() => {
      let coverImage = this.get_product.product_images.filter((item) => item.is_cover == true);
      this.currentImage = coverImage[0];
    });
  },
};
</script>
