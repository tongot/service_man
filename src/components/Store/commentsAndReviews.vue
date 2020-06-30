<template>
  <v-container>
    <v-card>
      <v-card-title>
        Our business reviews
        <v-spacer></v-spacer>
        <span v-if="rate()>0">{{rating}}</span>
        <span v-if="rate()>0">
          <v-icon
            color="yellow darken-3"
            v-for="(start,index) in Math.round( rate())"
            :key="index"
          >mdi-star</v-icon>
        </span>
      </v-card-title>

      <v-divider></v-divider>
      <v-row>
        <v-col cols="12" sm="12" md="8">
          <v-btn small depressed color="grey lighten-2" @click="openCommentModal()">Leave a comment</v-btn>
          <v-card class="ml-1" flat v-for="comment in  get_comments" :key="comment.id">
            <v-card-text>
              <h5 class="blue--text">{{comment.username}}</h5>
              <p class="ml-2">{{comment.comment}}</p>

              <h4 class="ma-4">Responses</h4>

              <v-card flat class="ml-5" v-for="(reply,index) in comment.replies" :key="index">
                <v-card-text>
                  <h5 class="blue--text">{{reply.username}}</h5>
                  {{reply.reply}}
                </v-card-text>
              </v-card>
              <v-card-actions>
                <v-btn depressed small color="primary" @click="openReplyModal(comment.id)">reply</v-btn>
              </v-card-actions>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="12" md="4">
          <v-btn small depressed @click="openRatingModal()" color="grey lighten-2">Rate us</v-btn>
          <span v-if="get_ratings!==null">
            <span v-if="get_ratings.ratings!==null">
              <v-card v-for="rate in get_ratings.ratings" :key="rate.id" flat class="mr-1">
                <v-card-text>
                  <v-card class="pa-2">
                    <h5 class="blue--text">{{rate.user}}</h5>
                    <v-card-text>{{rate.comment}}</v-card-text>
                    <v-card-actions>
                      <v-icon
                        color="yellow darken-3"
                        v-for="star in rate.stars"
                        :key="star"
                      >mdi-star</v-icon>
                    </v-card-actions>
                  </v-card>
                </v-card-text>
              </v-card>
            </span>
          </span>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data: () => ({
    rating: 0
  }),
  methods: {
    ...mapActions([
      "getComments",
      "getRatings",
      "openRatingDialog",
      "openCommentDialog"
    ]),
    rate() {
      return (this.rating =
        this.get_ratings !== null
          ? this.get_ratings.total_stars / this.get_ratings.number_of_ratings
          : 0);
    },
    openRatingModal() {
      this.openRatingDialog(this.get_business.id);
    },
    openCommentModal() {
      this.openCommentDialog({
        commentId: 0,
        businessId: this.get_business.id
      });
    },
    openReplyModal(id) {
      this.openCommentDialog({
        commentId: id,
        businessId: this.get_business.id
      });
    }
  },
  computed: mapGetters(["get_comments", "get_ratings", "get_business"]),
  mounted() {
    this.getComments(this.$route.params.businessId).then(() => {});
    this.getRatings(this.$route.params.businessId).then(() => {});
  }
};
</script>

<style>
</style>