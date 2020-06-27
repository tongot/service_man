<template>
  <v-navigation-drawer v-model="get_userbar" clipped app right>
    <template v-slot:prepend>
      <v-list-item two-line>
        <v-list-item-avatar>
          <img src="http://localhost:8081/media/1bfe44d4-4b19-401f-98a9-85f39cc08620.png" />
        </v-list-item-avatar>

        <v-list-item-content v-if="get_user!=null">
          <v-list-item-title>{{get_user.name}}</v-list-item-title>
          <v-list-item-subtitle>{{get_user.surname}}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </template>

    <v-divider></v-divider>

    <v-list nav dense>
      <v-list-group prepend-icon="mdi-google-my-business">
        <template v-slot:activator>
          <v-list-item-title>My businesses</v-list-item-title>
        </template>
        <v-list-item-group>
          <v-list-item v-for="(item,index) in subitems" :key="index" :to="item.route">
            <v-list-item-icon>
              <v-icon>{{item.icon}}</v-icon>
            </v-list-item-icon>
            <v-list-item-content class="text-capitalize caption">{{item.title}}</v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      drawer: false,
      userBar: false,
      subitems: [
        {
          title: "List",
          icon: "mdi-format-list-bulleted",
          route: { name: "my-business" }
        },
        {
          title: "Add New",
          icon: "mdi-playlist-plus",
          route: { name: "business-new" }
        }
      ]
    };
  },
  methods: {},
  computed: {
    ...mapGetters(["get_userbar", "get_user"])
  }
};
</script>