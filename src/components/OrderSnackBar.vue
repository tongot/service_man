<template>
  <v-snackbar
    v-model="get_snack.open"
    :color="get_snack.color"
    :timeout="get_snack.timeout"
    :bottom="get_snack.y==='bottom'"
    :top="get_snack.y==='top'"
    right="right"
  >
    {{get_snack.text}}
    <v-btn color="pink white--text" text @click="closeSnack()">Close</v-btn>
  </v-snackbar>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  methods: {
    ...mapActions(["notify"]),
    closeSnack() {
      this.notify({ open: false });
    }
  },
  computed: mapGetters(["get_snack"])
};
</script>
