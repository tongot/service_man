<template>
  <v-container>
    <v-toolbar color="blue" dark>
      <v-toolbar-title>
        My Businesses
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon :to="{name:'business-new'}">
          <v-icon>mdi-playlist-plus</v-icon>
      </v-btn>
       <v-btn icon :to="{name:'my-business'}">
          <v-icon>mdi-format-list-bulleted</v-icon>
      </v-btn>
    </v-toolbar>
    <v-row>
    <router-view></router-view>
    </v-row>
  </v-container>
</template>
<script>
export default {
    data:()=>({
      
    })
}
</script>