<template>      
  <v-app>
    <userBar />
    <login/>
    <userBar/>
    <snackBar/>
    <message/>
          <v-app-bar app dark color="primary">
              <v-toolbar-title >
                <v-btn text :to="{name:'Home'}">
                  <v-icon left>
                    mdi-home-circle
                  </v-icon>
                  Service man
                </v-btn>
                     <v-btn :to="{name:'business-list'}" text small>
              Stores
          </v-btn>
             <v-btn :to="{name:'product-list'}" text small>
               Products
          </v-btn>
                </v-toolbar-title>
              <v-spacer></v-spacer>
              <h4  v-if="get_user!=null">{{get_user.email}}</h4>
              <v-btn text @click="showLogIn" v-if="get_user==null">
                  Signin
              </v-btn>
              <v-btn text v-if="get_user!=null">
                  Signout
              </v-btn>
              <v-btn v-if="get_user!=null" @click="openUserBar()" icon>
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
  </v-app-bar>
  <v-main>
    <router-view></router-view>

  </v-main>
  </v-app>
</template>

<script>

import login from './components/Account/logIn'
import {mapGetters,mapActions} from 'vuex'
import userBar from './components/Account/UserSidebar'
import snackBar from './components/OrderSnackBar'
import message from './components/Messaging'
//import MainNavigation from './components/MainNavigation'

export default {
  name: 'App',
  components: {
    login
     ,userBar,
         'snackBar':snackBar,
         message
  },

  data: () => ({
    drawer:false,
  }),
  methods:{
      ...mapActions(['showLogIn','getUserDetails','openUserBar'])
  },
  computed: mapGetters(['get_user']),
  mounted(){
    this.getUserDetails()
  
  }
};
</script>
<style scoped>
</style>
