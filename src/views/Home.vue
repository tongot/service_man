<template>
  <v-card flat class="mt-5">
    
  <v-row justify="center" class="mt-5">
    <v-chip class="ml-1 pa-2" color="primary lighten-3">
  <v-chip v-for="(pcategory,i) in producductCategories" :key="i" pill class="ma-2" color="primary">
    {{pcategory}}
  </v-chip>
</v-chip >
  </v-row>
    <v-img aspect-ratio="1.9" cols="12" src="@/assets/dummy/bkg-home.jpg">
    <v-row justify="center">
        <v-col cols="6">
        <v-form class="d-flex justify-center" @submit="postSearch()">
              <v-autocomplete
              color="blue"
                v-model="select"
                :loading="loading"
                :items="items"
                :search-input.sync="search"
                cache-items
                class="mx-4"
                outlined
                hide-no-data
                hide-details
                placeholder="What are you looking for?"
              ></v-autocomplete>
        </v-form>
        <v-row depressed justify="center" >
             <v-col class="d-flex justify-center" >
             <v-btn large color="primary" @click="postSearch()">
               <v-icon left>
                 mdi-magnify
               </v-icon>
              search
            </v-btn>
        </v-col>
        </v-row>
     
         
        </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="10">
           <v-card color="grey--text" class="pa-2" elevation="6">  <v-card-title>Top rated sellers</v-card-title>
             <v-card width="300"  elevation="12">
              
                <v-img aspect-ratio="1" src="@/assets/dummy/productDummy.png">

                </v-img>
             </v-card>
           </v-card>
      </v-col>

    </v-row>
        </v-img>
      </v-card>
 

</template>

<script>
import axios from 'axios'
import {mapActions} from 'vuex'
export default {
  name: 'Home',
  data:()=>({
    search:null,
    items:[],
    select:null,
    loading:false,
    producductCategories:[]
  }),
  watch:{
    search(val){
      val && val !== this.select && this.getProductSearch(val)
    }
  },
  methods:{
    ...mapActions(['openUserBar','getProductCategory','setSearchValue']),
    getProductSearch(val){
      this.loading=true;
        axios.get('/business_api/product/?search='+val).then((response)=>{
          let products =[]
           response.data.results.forEach(element => {
             products.push(element.name)
           });
           this.items= products
           this.loading = false;
        })
    },
   postSearch(){
     this.setSearchValue(this.search)
     this.$router.push({name:'product-list'})
   }
  },
  mounted()
  {
    this.getProductCategory().then((data)=>{
      data.forEach((element)=>{
        this.producductCategories.push(element.name)
      })
    })
  }
}
</script>
<style scoped>
</style>
