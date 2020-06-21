<template>
  <v-card class="ma-4">
    <div class="d-flex justify-center mb-5">
      <h1 class="display-2 grey--text font-weight-thin">About</h1>
    </div>
    <div
      v-html="get_business.profile.about"
      class="justify-center grey--text"
      style="text-align: center;"
    ></div>
    <div class="d-flex justify-center mb-5">
      <h1 class="display-2 grey--text font-weight-thin">Our Directors</h1>
    </div>
    <v-row class="d-flex justify-space-around">
      <v-card
        v-for="director in get_business.directors"
        :key="director.id"
        raised
        style
        class="mx-auto mb-4"
        width="400"
      >
        <v-row justify="center">
          <v-col class="d-flex justify-center">
            <v-avatar
              size="100"
              class="display-2 white--text text-uppercase"
              color="purple"
            >{{director.first_name[0]+" "+director.last_name[0]}}</v-avatar>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <div class="d-flex justify-center">
              <h4 class="text-uppercase">{{director.first_name}} {{director.lastname}}</h4>
            </div>
            <p class="mx-3 grey--text" style="text-align: center;"></p>
          </v-col>
        </v-row>
        <v-card-actions class="d-flex justify-center">
          <v-btn fab class="mx-1 font-weight-light">
            <v-icon>mdi-facebook</v-icon>
          </v-btn>
          <v-btn fab class="mx-1">
            <v-icon>mdi-instagram</v-icon>
          </v-btn>
          <v-btn fab class="mx-1">
            <v-icon>mdi-twitter</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: mapGetters(["get_business"])
};
</script>

<style>
</style>
