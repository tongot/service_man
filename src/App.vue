<template>
  <v-app> 
    
    <v-navigation-drawer 
    clipped
    app
    >
    <MainNavigation/>
  </v-navigation-drawer>
  <v-app-bar app clipped-left flat>

  </v-app-bar>
 
  <v-content>
    <v-container fluid>
      <AddNewProduct/>
    </v-container>
  </v-content>

  <v-footer app>
    <!-- -->
  </v-footer>
  </v-app>
</template>

<script>
//import ProductList from './components/ProductList';
import MainNavigation from './components/MainNavigation';
import AddNewProduct from './components/Product/AddNewProduct';

export default {
  name: 'App',

  components: {
     MainNavigation, AddNewProduct
  },

  data: () => ({
    //
  }),
};
</script>
