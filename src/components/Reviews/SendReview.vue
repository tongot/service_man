<template>
  <v-dialog v-model="get_rating_dialog" width="600" persistent>
    <v-card class="pa-2">
      <v-card-title>
        Comment
        <v-spacer></v-spacer>
        <v-btn icon @click="closeModalRate()">
          <v-icon color="pink darken-1">mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <span v-if="commented">
        <v-icon color="pink">mdi-exclamation-thick</v-icon>

        <span class="subtitle pink--text">Please select at list 1 star or give a comment</span>
      </span>
      <v-textarea v-model="comment"></v-textarea>
      <v-card-text class="d-flex justify-end">
        <span class="headline">Rate</span>
        <v-btn
          icon
          v-for="rate_star in rate_stars"
          :key="rate_star.value"
          @mouseover="mouseEnterStar(rate_star.value)"
          @mouseleave="mouseLeaveStar()"
          @click.prevent="setStars(rate_star.value)"
        >
          <v-icon :color="rate_star.color">mdi-star</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn @click="cancel()" color="pink darken-1">
          <v-icon>mdi-close-circle</v-icon>cancel
        </v-btn>
        <v-btn color="success mx-2" :loading="postLoading" @click="postReview()">
          <v-icon left>mdi-email</v-icon>post
        </v-btn>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data: () => ({
    postLoading: false,
    star_color: "orange lighten-1",
    review: {
      number_of_stars: 0,
      comment: "",
      user: "",
      businessId: ""
    },
    commented: false,
    stars_clicked: 0,
    comment: "",
    rate_stars: [
      { value: 1, color: "" },
      { value: 2, color: "" },
      { value: 3, color: "" },
      { value: 4, color: "" },
      { value: 5, color: "" }
    ]
  }),
  methods: {
    ...mapActions(["openRatingDialog", "postRating", "notify"]),
    closeModalRate() {
      this.commented = false;
      this.openRatingDialog(0);
    },
    setStars(id) {
      this.stars_clicked = id;
    },
    mouseEnterStar(value) {
      //if value is 0 that means we are living  from the stars
      this.rate_stars.forEach(element => {
        if (element.value <= value && this.stars_clicked === 0) {
          element.color = this.star_color;
        }
        if (this.stars_clicked !== 0) {
          if (element.color !== "") {
            element.color = "";
          }
          if (element.value <= value) {
            element.color = this.star_color;
          }
        }
      });
    },
    mouseLeaveStar() {
      this.rate_stars.forEach(element => {
        if (this.stars_clicked === 0) {
          element.color = "";
        }
        if (this.stars_clicked !== 0) {
          if (element.color !== "") {
            element.color = "";
          }
          if (element.value <= this.stars_clicked) {
            element.color = this.star_color;
          }
        }
      });
    },
    cancel() {
      this.rate_stars.forEach(item => {
        item.color = "";
      });
      this.review.number_of_stars = 0;
      this.review.comment = "";
      this.stars_clicked = 0;
    },
    postReview() {
      this.commented = false;
      this.review.number_of_stars = this.stars_clicked;
      this.review.comment = this.comment;
      this.review.user = this.get_user.id;
      if (
        this.stars_clicked == 0 &&
        this.comment === "" &&
        this.comment === null
      ) {
        this.commented = true;
        return;
      }
      this.postLoading = true;
      this.postRating(this.review).then(() => {
        this.postLoading = false;
        this.stars_clicked = 0;
        this.comment = "";
        this.notify({
          text: "Thank you for leaving you comment",
          color: "success",
          open: true
        });
        this.openRatingDialog(0);
        this.$router.go();
      });
    }
  },
  computed: mapGetters(["get_rating_dialog", "get_user"])
};
</script>

<style>
</style>