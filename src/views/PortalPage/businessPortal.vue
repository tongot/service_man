<template>
  <v-card flat>
    <v-toolbar height="50" dark>
      <v-toolbar-title>My Business Portal</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn :to="{name:'business-new'}" text small>New Business</v-btn>
      <v-btn :to="{name:'my-business'}" text small>Businesses</v-btn>
    </v-toolbar>
    <v-container>
      <router-view></router-view>
    </v-container>
  </v-card>
</template>
