<template>
          
  <v-app> 

    <v-navigation-drawer 
    clipped
    app
    left
    v-model="drawer"    >
    <MainNavigation/>

  </v-navigation-drawer>
 <userBar />

  <v-app-bar app clipped-left flat clipped-right>
    <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    <v-toolbar-title>Service man</v-toolbar-title>
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
 <div>
   <v-content>
    <v-container fluid>
      <login/>
      <snackBar/>
      <message/>
      <section>
        <v-toolbar
          flat
          color="grey lighten-4"
          height="30"
        >
        <v-flex class="d-flex justify-center">
            <v-btn :to="{name:'product-list'}" text small>
              <u>products</u>
          </v-btn>
          <v-btn :to="{name:'business-list'}" text small>
              <u>stores</u>
          </v-btn>
        </v-flex>
        
        </v-toolbar>
      </section>
      <section>
           <router-view></router-view>
      </section>
    </v-container>
  </v-content>
 </div>
  

  <v-footer app>
    <!-- -->
  </v-footer>
  </v-app>
</template>

<script>
import MainNavigation from './components/MainNavigation';
import login from './components/Account/logIn'
import {mapGetters,mapActions} from 'vuex'
import userBar from './components/Account/UserSidebar'
import snackBar from './components/OrderSnackBar'
import message from './components/Messaging'

export default {
  name: 'App',
  components: {
     MainNavigation,login
     ,userBar,
         'snackBar':snackBar,
         message
  },

  data: () => ({
    drawer:null,
    drawer2:null
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
