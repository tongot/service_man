<template>
  <v-container>
    <v-toolbar dark flat height="50">
      <v-toolbar-title>My account</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn :to="{name:'account-detail'}" icon>
        <v-icon>mdi-account</v-icon>
      </v-btn>
      <v-btn :to="{name:'account-edit'}" icon>
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </v-toolbar>
    <router-view></router-view>
  </v-container>
</template>
