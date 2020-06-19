<template>
  <v-container fluid>
    <v-toolbar flat color="grey lighten-4" height="30" class="mt-2">
      <v-flex class="d-flex justify-center">
        <v-btn :to="{name:'product-list'}" text small>
          <u>products</u>
        </v-btn>
        <v-btn :to="{name:'business-list'}" text small>
          <u>stores</u>
        </v-btn>
      </v-flex>
    </v-toolbar>
    <router-view></router-view>
  </v-container>
</template>
<script>
export default {
  name: "main-display",
  components: {}
};
</script>