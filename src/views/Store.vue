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
      <v-toolbar dark color="orange" flat>
        <v-toolbar-title></v-toolbar-title>
        <v-avatar>
          <v-img width="400" src="https://cdn.vuetifyjs.com/images/cards/store.jpg"></v-img>
        </v-avatar>
        <v-chip large outlined class="display-1">Groove Tek</v-chip>

        <v-btn small text @click="component='home'">home</v-btn>
        <v-btn small text @click="component='about'">about</v-btn>
        <v-btn small text @click="component=home">products</v-btn>
        <v-btn small text @click="component=home">contact us</v-btn>
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

      <component class="mb-4" :is="component"></component>
    </v-card>
  </v-card>
</template>
<script>
import home from "../components/Store/homeStore";
import about from "../components/Store/aboutStore";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    home,
    about
  },
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
