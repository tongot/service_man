<template>
   <v-content>
    <v-container fluid>
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
</template>
<script>


export default {
  name: 'main',
  components: {

  },

 /* data: () => ({
    drawer:null,
    drawer2:null
  }),
  methods:{
      ...mapActions(['showLogIn','getUserDetails','openUserBar'])
  },
  computed: mapGetters(['get_user']),
  mounted(){
    this.getUserDetails()
  
  }*/
};
</script>