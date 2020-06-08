<template>
    <v-navigation-drawer
    clipped
    app
    right
    v-model="drawer"
    >
      <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-avatar>
            <img src="http://localhost:8081/media/1bfe44d4-4b19-401f-98a9-85f39cc08620.png">
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Takudzwa</v-list-item-title>
            <v-list-item-subtitle>Tongoona</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.route"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
</template>

<script>

  export default {
    data () {
      return {
        drawer:false,
        items: [
          { title: 'My Business', icon: 'mdi-home-city',route:{name:'my-business'}},
          { title: 'My Account', icon: 'mdi-account',route:{name:'my-orders'} },
          { title: 'My Inbox', icon: 'mdi-account-group-outline',route:{name:'my-inbox'} },
        ],
      }
    },
    methods:{ 
      
    },
  
  }
</script>