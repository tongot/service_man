<template>

  <v-container>


<!--
  modal to view the product details
  -->
<!-- main view for the list of the products-->
      <v-toolbar
    flat
    height="60px"
    >
    <v-toolbar-title>Products</v-toolbar-title>
    <v-spacer></v-spacer>

    <v-text-field
    prepend-inner-icon="mdi-magnify"
    class="mt-6"
    placeholder="search"
    v-model="search"
    @keyup="searching()"
    >
    </v-text-field>


    </v-toolbar>

 <v-expansion-panels
      class="mt-2"
    >
<v-expansion-panel>
  <v-expansion-panel-header>
   Filters
  </v-expansion-panel-header>
   <v-expansion-panel-content>
     <v-row
     align="start"
     justify="space-around"
     > 
        <v-flex class="px-2">
          <v-card
          class="pa-2"
          outlined
          >
          <p>Category</p>
          <v-select
            placeholder="category"
          >
          </v-select>
          </v-card>
      </v-flex>
     
       <v-flex class="px-2">
         <v-card
          class="pa-2"
          outlined
          >
         <p>Location</p>
          <v-select
              placeholder="location"
            ></v-select>
         </v-card>
      </v-flex>
      <v-flex>
        <v-card
          class="pa-2"
          outlined
          >
        <p>Seller</p>
        <v-select
        placeholder="seller"
        >
        </v-select>
        </v-card>
      </v-flex>
  <v-flex  class="px-2">
    <v-card
          class="pa-2"
          outlined
          >
         <p>Price</p>
         <v-row>
            <v-flex md6>
              <v-text-field
              placeholder = "min price"
               class="px-2"
              >
              </v-text-field>
         </v-flex>
           <v-flex md6>
          <v-text-field
              placeholder = "max price"
               class="px-2"
              >
              </v-text-field>
        
         </v-flex>
         </v-row>
         </v-card>     
      </v-flex>

     </v-row>
    
    </v-expansion-panel-content>
</v-expansion-panel>
 </v-expansion-panels>
<v-row class="justify-space-around">

 <v-tooltip top  v-for="product in get_view_products.results" :key="product.id">
   <template v-slot:activator="{ on }" >
      <v-card
    width="250"
    height= "400"
    outlined
    class="ma-4"
    v-on="on"
  >
     <v-img
      :src="getCover(product.product_images)"
      aspect-ratio="1" width="250"
    ></v-img>

    <v-card-title>
      <v-flex>
        <h3 class="body-2"> {{product.name}}</h3>
          <v-chip outlined class="d-flex subtitle-2 justify-center">
            <v-avatar color="red" class="white--text" left>
                <span>P</span>
            </v-avatar>
            {{product.price}}
            </v-chip>
      </v-flex>
     
    </v-card-title>
    <v-card-text max-height="20">
       {{product.discription}} 
            </v-card-text>
    <v-card-actions>
      <v-flex class="d-flex">
        <v-btn text :to="{name:'productDetails',params:{productId:product.id}}" color="yellow darken-2" @click="dialog = !dialog">
          more...
        </v-btn>
        <v-spacer></v-spacer>
      <v-btn icon color="primary" depressed> 
        <v-icon>mdi-cart</v-icon>
        </v-btn>
         <v-btn icon color="primary"
          @click="contactSeller(product.business,product.id)">
              <v-icon>mdi-card-account-phone</v-icon>
            </v-btn>
    <v-btn icon color="primary">
              <v-icon>mdi-thumb-up</v-icon>
            </v-btn>
       </v-flex>
    </v-card-actions>
  </v-card>
   </template>
          <v-chip
           v-if="product.price_neg"
            class="ma-2"
            color="success"
            text-color="white"
          >
            <v-avatar left>
              <v-icon>mdi-checkbox-marked-circle</v-icon>
            </v-avatar>
            price negotiable 
          </v-chip>
           <v-chip
           v-if="!product.price_neg"
            class="ma-2"
            color="error"
            text-color="white"
          >
            <v-avatar left>
              <v-icon>mdi-window-close</v-icon>
            </v-avatar>
            price negotiable 
          </v-chip>
            <v-chip
           v-if="product.product_new"
            class="ma-2"
            color="success"
            text-color="white"
          >
            <v-avatar left>
              <v-icon>mdi-checkbox-marked-circle</v-icon>
            </v-avatar>
             brand new 
          </v-chip>
           <v-chip
           v-if="!product.product_new"
            class="ma-2"
            color="error"
            text-color="white"
          >
            <v-avatar left>
              <v-icon>mdi-window-close</v-icon>
            </v-avatar>
              brand new
          </v-chip>
 </v-tooltip>
  
</v-row>
<v-row justify="center">
   <v-pagination
              v-model="page"
              @input="getPage()"
              class="my-4"
              :length="getPageLength"
            ></v-pagination>
</v-row>
  </v-container>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
import {GetCoverImage} from '../../scripts/otherScripts'
export default {
  data:()=>({
        dialog:false,
        page:1,
        search:''
  }),
  methods:{
    ...mapActions(['getViewProducts','openMessageDialog','getBusinessById','notify']),
    getCover(images)
    {
         if(images.length>0)
                {
                     return GetCoverImage(images)    
                }else
                {
                    return require('../../assets/dummy/productDummy.png')
                }
    },
    contactSeller(businessId,productId){
      this.notify({text:"Requesting contact, please wait...",color:"warning",open:true})
            this.getBusinessById(businessId).then(()=>{
                    this.openMessageDialog(productId);
                   this.notify({open:false})
            }) 
    },
    getPage(){
      this.getViewProducts({number:this.page,search:this.search})
    },
    searching()
    {
      if(this.search.length>=3)
      {
        this.page=1
        this.getViewProducts({number:this.page,search:this.search})
      }
      if(this.search==='')
      {
        this.page=1
        this.getViewProducts({number:this.page,search:this.search})
      }
   
    }
  },
  computed:{
    ...mapGetters(['get_view_products']),
      getPageLength(){
        return Math.ceil(this.get_view_products.count/10)
      }
    },
  created(){
    this.getViewProducts({number:this.page,search:this.search})
  },
  mounted(){
    
  }
}
</script>