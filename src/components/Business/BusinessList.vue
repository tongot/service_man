<template>
  <v-card flat class="ma-4 pa-1">
    <div fluid>
      <v-row class="justify-space-around align-start">
        <v-hover
          v-slot:default="{ hover }"
          v-for="business in get_search_business.results"
          :key="business.id"
        >
          <v-card
            class="mb-2"
            width="430"
            outlined
            :elevation="hover ? 6 : 0"
            @click="gotoBusiness(business.id, business.name)"
          >
            <v-list-item three-line>
              <v-list-item-content>
                <div class="overline mb-4"></div>
                <v-list-item-title class="headline mb-1">{{ business.name }}</v-list-item-title>
                <v-list-item-subtitle>{{ business.description }}</v-list-item-subtitle>
              </v-list-item-content>

              <v-img
                class="mt-2"
                aspect-ratio="1"
                max-height="150"
                max-width="150"
                :src="getLogo(business.business_logo)"
              ></v-img>
            </v-list-item>

            <v-card-actions>
              <v-flex class="d-flex justify-start">
                <v-btn text color="blue" @click.stop="openModalRate(business.id)">
                  <v-icon left>mdi-star</v-icon>
                  <u>Rate Business</u>
                </v-btn>
              </v-flex>
              <v-flex class="d-flex justify-end">
                <v-icon color="orange lighten-1">mdi-star</v-icon>
              </v-flex>
            </v-card-actions>
          </v-card>
        </v-hover>
      </v-row>
      <v-row justify="center">
        <v-pagination
          v-model="page"
          @input="getPage()"
          class="my-4"
          :length="pageCount"
        ></v-pagination>
      </v-row>
    </div>
  </v-card>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'business_list',
  data: () => ({
    postLoading: false,
    dialog_rate: false,
    page: 1,
  }),
  methods: {
    ...mapActions([
      'getBusinessSearch',
      'showLogIn',
      'postRating',
      'openRatingDialog',
      'showLogIn',
      'setBusinessSearchValue',
    ]),
    gotoBusiness(businessId) {
      this.$router.push({
        name: 'store-home',
        params: { businessId: businessId },
      });
    },
    openModalRate(id) {
      if (this.get_user === null) {
        this.showLogIn();
        return;
      }
      this.openRatingDialog(id);
    },
    getLogo(logo) {
      if (logo === null) {
        return require('../../../public/productDummy.png');
      }
      return logo;
    },
    getPage() {
      this.getBusinessSearch({
        page: this.page,
        search: this.get_business_search_value,
        categories: '',
      });
    },
  },
  computed: {
    ...mapGetters([
      'get_search_business',
      'get_locations',
      'get_user',
      'get_business_search_value',
    ]),
    pageCount() {
      return this.get_search_business.count > 0
        ? Math.ceil(this.get_search_business.count / 10)
        : 0;
    },
  },
  created() {
    this.setBusinessSearchValue('');
    this.getBusinessSearch({ page: 1, search: '', categories: '' });
  },
};
</script>
