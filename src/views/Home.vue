<template>
  <v-card flat class="mt-5">
    <v-row justify="center" class="mt-5">
      <v-chip large class="mt-5 pa-2" color="white">
        <div class="div-overflow">
          <span v-for="(pcategory,i) in listOfCategories" :key="i">
            <v-chip>{{pcategory.category.name}}</v-chip>
          </span>
        </div>
      </v-chip>
    </v-row>
    <v-img aspect-ratio="1.9" cols="12" src="@/assets/bkg-home.jpg">
      <v-row justify="center">
        <v-col cols="12" md="6" sm="12">
          <v-form class="d-flex justify-center">
            <v-autocomplete
              color="blue"
              v-model="select"
              :loading="loading"
              :items="items"
              :search-input.sync="search"
              cache-items
              class="mx-4"
              outlined
              hide-no-data
              hide-details
              placeholder="What are you looking for?"
            ></v-autocomplete>
          </v-form>
          <v-row depressed justify="center">
            <v-col class="d-flex justify-center">
              <v-btn large color="primary" @click="postSearch()">
                <v-icon left>mdi-magnify</v-icon>search
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="10">
          <v-card color="grey--text" class="pa-2" elevation="6">
            <v-carousel>
              <v-carousel-item
                v-for="(item,i) in items"
                :key="i"
                :src="item.src"
                reverse-transition="fade-transition"
                transition="fade-transition"
              ></v-carousel-item>
            </v-carousel>
          </v-card>
        </v-col>
        <!--
        <v-col cols="10" v-for="(category,index) in listOfCategories" :key="category.id">
          <v-card color="grey--text" class="pa-2" elevation="6">
            <v-card-title>{{category.category.name}}</v-card-title>
            <v-card-text>
              <v-btn icon class="prev-btn" @click="prev(category.category.id,index)">
                <v-icon>mdi-chevron-left</v-icon>
              </v-btn>
              <v-btn
                icon
                class="next-btn"
                @click="next(category.category.id,category.products.count,index)"
              >
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
              <v-card class="d-flex align-center" style="overflow: auto;">
                <v-col class="d-flex">
                  <v-hover
                    v-slot:default="{ hover }"
                    class="mx-4"
                    v-for="(product,index) in category.products.items"
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
                    </v-card>
                  </v-hover>
                </v-col>
              </v-card>
            </v-card-text>
          </v-card>
        </v-col>
        -->
      </v-row>
    </v-img>
  </v-card>
</template>

<script>
import axios from "axios";
import { mapActions, mapGetters } from "vuex";
import { GetCoverImage } from "../scripts/otherScripts";
export default {
  name: "Home",
  data: () => ({
    category: null,
    products: null,
    search: null,
    items: [],
    select: null,
    loading: false,
    listOfCategories: [],
    page: {
      category: "",
      pageSize: 5,
      page: 1
    },
    currentPage: 1
  }),
  watch: {
    search(val) {
      val && val !== this.select && this.getProductSearch(val);
    }
  },
  methods: {
    next(category, count, index) {
      let numberOfPages = Math.ceil(count / this.page.pageSize); //get number of pages basing on number of items
      if (this.currentPage < numberOfPages) {
        this.currentPage++;
        this.page.category = category;
        this.page.page = this.currentPage;

        this.getHomeProducts(this.page).then(data => {
          this.listOfCategories[index].products = data;
        });
      }
    },
    prev(category, index) {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.page.category = category;
        this.page.page = this.currentPage;

        this.getHomeProducts(this.page).then(data => {
          this.listOfCategories[index].products = data;
        });
      }
    },
    producductCategories(category, products, count) {
      (this.category = category),
        (this.products = products),
        (this.productCount = count);
    },
    ...mapActions([
      "openUserBar",
      "getProductCategory",
      "setSearchValue",
      "getHomeProducts"
    ]),
    getProductSearch(val) {
      this.loading = true;
      axios.get("/business_api/product/?search=" + val).then(response => {
        let products = [];
        response.data.results.forEach(element => {
          products.push(element.name);
        });
        this.items = products;
        this.loading = false;
      });
    },
    postSearch() {
      this.setSearchValue(this.search);
      this.$router.push({ name: "product-list" });
    },
    getCover(images) {
      if (images.length > 0) {
        return GetCoverImage(images);
      } else {
        return require("../../public/productDummy.png");
      }
    }
  },

  computed: mapGetters(["get_home_products"]),
  mounted() {
    this.getProductCategory()
      .then(data => {
        data.forEach(element => {
          const category = new this.producductCategories(element, [], 0);
          this.listOfCategories.push(category);
        });
      })
      .then(() => {
        this.listOfCategories.forEach(element => {
          this.page.category = element.category.id;
          this.getHomeProducts(this.page).then(data => {
            element.products = data;
          });
        });
      });
  }
};
</script>
<style scoped>
.next-btn {
  right: 0px;
  position: absolute;
  margin: 2px;
  background: rgb(58, 53, 53, 0.43);
}
.prev-btn {
  left: 0px;
  position: relative;
  margin: 2px;
  background: rgb(58, 53, 53, 0.43);
}

.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.5;
  position: absolute;
  width: 100%;
}
</style>
