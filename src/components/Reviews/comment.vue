<template>
  <v-dialog v-model="get_comment_dialog" width="600">
    <v-card class="pa-2">
      <v-card-title>
        Comment
        <v-spacer></v-spacer>
        <v-btn icon @click="closeCommentModal()">
          <v-icon color="pink darken-1">mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <span v-if="commented">
        <v-icon color="pink">mdi-exclamation-thick</v-icon>
        <span class="subtitle pink--text">Please enter a comment</span>
      </span>
      <v-textarea v-model="comment.comment"></v-textarea>
      <v-card-text class="d-flex justify-end">
        <v-spacer></v-spacer>
        <v-btn @click="closeCommentModal()" color="pink darken-1">
          <v-icon>mdi-close-circle</v-icon>cancel
        </v-btn>
        <v-btn color="success mx-2" :loading="postLoading" @click="submitComment()">
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
    commented: false,
    postLoading: false,
    comment: {
      comment: "",
      user: 0,
      business: 0
    }
  }),
  methods: {
    ...mapActions(["openCommentDialog", "postComment", "notify"]),
    closeCommentModal() {
      this.comment.comment = "";
      this.comment.user = 0;
      this.comment.business = 0;
      this.openCommentDialog({ commentId: 0, businessId: 0 });
    },
    submitComment() {
      if (this.comment.comment === "") {
        this.commented = true;
        return;
      }
      this.commented = false;
      this.postLoading = true;
      this.comment.user = this.get_user.id;
      this.comment.business = this.get_business.id;
      this.postComment(this.comment).then(() => {
        this.postLoadin = false;
        this.closeCommentModal();
        this.notify({
          text: "Thank you very much for your comment",
          color: "success",
          open: true
        });
        this.$router.go();
      });
    }
  },
  computed: mapGetters(["get_comment_dialog", "get_user", "get_business"])
};
</script>

<style>
</style>