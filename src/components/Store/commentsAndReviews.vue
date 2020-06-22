<template>
  <v-container>
    <v-card>
      <v-card-title>
        Our business reviews
        <v-spacer></v-spacer>
        <span>3.0</span>
        <v-icon color="yellow darken-3">mdi-star</v-icon>
        <v-icon color="yellow darken-3">mdi-star</v-icon>
      </v-card-title>

      <v-divider></v-divider>
      <v-row>
        <v-col cols="8" sm="12" md="8">
          <v-card class="ml-1" flat v-for="comment in  get_comments" :key="comment.id">
            <v-btn small depressed color="grey lighten-2">Leave a comment</v-btn>
            <v-card-text>
              <h5 class="blue--text">{{comment.user}}</h5>
              <p class="ml-2">{{comment.comment}}</p>

              <h4 class="ma-4">Responses</h4>
              <v-card flat class="ml-5" v-for="(reply,index) in comment.replies" :key="index">
                <v-card-text>
                  <h5 class="blue--text">{{reply.username}}</h5>
                  {{reply.reply}}
                </v-card-text>
              </v-card>
              <v-card-actions>
                <v-text-field label="Reply" outlined></v-text-field>
                <v-btn icon>
                  <v-icon>mdi-send</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="4" sm="12" md="4">
          <v-card flat class="mr-1">
            <v-btn small depressed color="grey lighten-2">Rate us</v-btn>
            <v-card-text>
              <v-card class="pa-2">
                <h5 class="blue--text">Takudzwa</h5>
                <v-card-text>This is the best business of them all</v-card-text>
                <v-card-actions>
                  <v-icon color="yellow darken-3">mdi-star</v-icon>
                </v-card-actions>
              </v-card>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  methods: {
    ...mapActions(["getComments"])
  },
  computed: mapGetters(["get_comments"]),
  mounted() {
    this.getComments(this.$route.params.businessId).then(() => {
      console.log(this.get_comments);
    });
  }
};
</script>

<style>
</style>