<template>
  <v-app>
    <login />
    <snackBar />
    <message />
    <rating />
    <comment />
    <v-app-bar flat app dark color="primary">
      <v-btn text :to="{name:'Home'}">
        <v-icon left>mdi-home-circle</v-icon>Service man
      </v-btn>
      <v-toolbar-title class="d-none d-sm-flex d-sm-none d-md-flex">
        <v-btn v-for="(menu,index) in menus" :key="index" :to="menu.name" text small>{{menu.label}}</v-btn>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <h4 class="d-none d-sm-flex d-sm-none d-md-flex" v-if="get_user!=null">{{get_user.email}}</h4>
      <v-btn text :to="{name:'login'}" v-if="get_user==null">Signin</v-btn>
      <v-btn @click="user_logout()" text v-if="get_user!=null">Signout</v-btn>

      <v-menu transition="slide-x-transition" bottom right>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="d-none d-sm-flex d-md-none d-flex d-sm-none"
            icon
            dark
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item-group>
            <v-list-item class="mb-2" v-if="get_user!=null">
              <v-avatar color="primary">
                <span class="white--text text-uppercase">{{get_user.name[0]}}{{get_user.surname[0]}}</span>
              </v-avatar>
              <v-chip>{{get_user.email}}</v-chip>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item v-for="(menu,index) in menus" :key="index" :to="menu.name">
              <v-list-item-title>{{menu.label}}</v-list-item-title>
            </v-list-item>
            <v-list-item @click="user_logout()" v-if="get_user!=null">
              <v-list-item-icon>
                <v-icon>mdi-logout</v-icon>
              </v-list-item-icon>
              <v-list-item-content>Signout</v-list-item-content>
            </v-list-item>
            <v-list-item :to="{name:'login'}" v-if="get_user==null">
              <v-list-item-title>Signin</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>

      <!--  <v-btn v-if="get_user!=null" @click="openUserBar" icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>-->
    </v-app-bar>

    <transition name="moveUP" mode="out-in">
      <router-view></router-view>
    </transition>
  </v-app>
</template>

<script>
import login from "./components/Account/logIn";
import { mapGetters, mapActions } from "vuex";
//import userBar from "./components/Account/UserSidebar";
import snackBar from "./components/OrderSnackBar";
import message from "./components/Messaging";
import rating from "./components/Reviews/SendReview";
import comment from "./components/Reviews/comment";
//import MainNavigation from './components/MainNavigation'

export default {
  name: "App",
  components: {
    login,
    snackBar: snackBar,
    message,
    rating,
    comment
  },
  data: () => ({
    menus: [
      { label: "Products", name: { name: "product-list" } },
      { label: "Stores", name: { name: "business-list" } }
    ]
  }),
  methods: {
    ...mapActions(["showLogIn", "getUserDetails", "openUserBar", "logout"]),
    user_logout() {
      this.logout();
    }
  },
  computed: mapGetters(["get_user"]),
  created() {
    this.getUserDetails();
  }
};
</script>
<style>
.registerForm {
  margin-top: 50px;
  animation: slideInRight 1s;
}

.registerCard {
  padding: 20px;
  margin: 150px auto;
}
.text {
  margin-left: 150px;
  margin: -60px auto;
}
.header1 {
  position: relative;
  z-index: 1;
  margin-top: 20px;
  margin-left: 20px;
}
.side-pic {
  width: 100%;
  background-image: url("./assets/cbdBuilding.jpg");
  background-size: contain;
  animation: slideInleft 0.7s;
  position: absolute;
  bottom: 0px;
  top: 0px;
}
@keyframes slideInRight {
  0% {
    opacity: 0;
    margin-left: 1000px;
  }
  100% {
    opacity: 1;
    margin-left: 0px;
  }
}
@keyframes slideInLeft {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@media (max-width: 1000px) {
  .text {
    display: none;
  }
  .registerCard {
    padding: 20px;
    margin: 0 auto;
  }
  .picture-container {
    display: none;
  }
}

.moveUP-enter-active {
  animation: fadeIn 1s ease-in;
}
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  0% {
    opacity: 0.5;
  }
  0% {
    opacity: 1;
  }
}
.moveUP-leave-active {
  animation: moveUP 0.3s ease-in;
}
@keyframes moveUP {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-400px);
  }
}

.div-overflow {
  width: 100%;
  height: 45px;
  white-space: nowrap;
  overflow-x: scroll;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
::-webkit-scrollbar {
  height: 10px;
}
::-webkit-scrollbar-thumb {
  background: rgb(255, 255, 255);
  border-radius: 15px;
}
</style>
