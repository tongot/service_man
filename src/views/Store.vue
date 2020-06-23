<template>
  <v-card flat>
    <v-carousel cycle height="900" hide-delimiters show-arrows-on-hover>
      <v-carousel-item
        v-for="(item,i) in images"
        :key="i"
        :src="item"
        cycle
        hide-delimiter-background
        show-arrows-on-hover
        reverse-transition="fade-transition"
        transition="fade-transition"
      ></v-carousel-item>
    </v-carousel>
    <v-card style="background: rgba(0,0,0,.7);" class="div-container" flat>
      <v-toolbar dark :color="getBarColor(get_business.profile)" flat>
        <v-toolbar-title></v-toolbar-title>
        <v-avatar>
          <v-img width="400" :src="get_business.business_logo"></v-img>
        </v-avatar>
        <v-chip large outlined class="display-1">{{get_business.name}}</v-chip>

        <v-btn small text :to="{name:'store-home'}">home</v-btn>
        <v-btn small text :to="{name:'store-about'}">about</v-btn>
        <v-btn small text :to="{name:'store-products'}">products</v-btn>
        <v-btn small text :to="{name:'store-reviews'}">reviews</v-btn>
        <v-btn small text :to="{name:'store-contact'}">contact us</v-btn>
        <v-spacer></v-spacer>

        <v-btn fab class="mx-1 font-weight-light">
          <v-icon>mdi-facebook</v-icon>
        </v-btn>
        <v-btn fab class="mx-1">
          <v-icon>mdi-instagram</v-icon>
        </v-btn>
        <v-btn fab class="mx-1">
          <v-icon>mdi-twitter</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
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
    ...mapActions(["getBusinessById"]),
    setImage() {
      this.currentImage++;
      if (this.currentImage <= this.images.length - 1) {
        this.displayImage = this.images[this.currentImage];
      } else {
        this.currentImage = 0;
        this.displayImage = this.images[this.currentImage];
      }
      console.log(this.currentImage);
      console.log("hit");
    },
    getBarColor(profile) {
      if (profile !== null) {
        return profile.main_color;
      } else return "transparent";
    },
    startImageSwap() {
      this.interval = setInterval(() => this.setImage(), 3000);
    },
    stopInterval() {
      clearInterval(this.interval);
    }
  },
  computed: mapGetters(["get_business"]),
  mounted() {
    //this.startImageSwap("start");
    this.getBusinessById(this.$route.params.businessId);
  },
  beforeDestroy() {
    //this.stopInterval();
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
  margin-top: -700px;
  margin-left: 100px;
  margin-right: 100px;
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
