<template>

  <v-container class="mt-0">


<!--
  modal to view the product details
  -->
<!-- main view for the list of the products-->
      <v-toolbar
    flat
    height="60px"
    class="mb-2"
    >
    <v-row class="d-flex">
      <v-col>
      <v-toolbar-title>Products</v-toolbar-title>
    </v-col>
    <v-col sm="12" xs="12" lg="6" md="6">
      <v-form class="d-flex align-center" ref="searchForm">
     <v-text-field
     :rules="[rules.required]"
      prepend-inner-icon="mdi-magnify"
      class="mt-6"
      placeholder="Search any descriptive word"
      v-model="search"
      @keyup="clearSearch()"
      >
    </v-text-field>
    <v-btn @click="searching()" depressed class="ml-2">
      search
    </v-btn>
    </v-form>
    </v-col>
    </v-row>
    <v-row>

    </v-row>
    </v-toolbar>

 <v-expansion-panels
    class="mt-12"
    >
<v-expansion-panel>
  <v-expansion-panel-header>
   Filters
   <v-chip class="ml-1">
   <v-avatar left>
     <v-icon color="white">mdi-group</v-icon>
   </v-avatar>
  <v-chip close small color="grey darken-1" class="ml-1 white--text" @click:close="setSearch(search)" v-for="search in get_search_category" :key="search.id">
    {{search.name}}
  </v-chip>
</v-chip >
  </v-expansion-panel-header>
   <v-expansion-panel-content id="filters">
     <v-row
     align="start"
     justify="space-around"
     > 
       <v-flex class="px-2" md4>
         <v-card
          class="pa-2"
          outlined
          >
         <p>Location</p>
          <v-overflow-btn outlined label="Select Location" target="#filters" width="auto"
                            class="ma-5" :items="get_locations" prepend-icon="mdi-city" v-model="location"
                            item-value="city" item-text="city" @change="getBuss()">
                        </v-overflow-btn>
         </v-card>
      </v-flex>
      <v-flex md4>
        <v-card
          class="pa-2"
          outlined
          >
        <p>Seller</p>
        <v-combobox
          v-model="businessSelected"
          :items="businesses"
          label="Select sellers"
          multiple
          chips
          :loading="loadingBusinesses"
        ></v-combobox>
        </v-card>
      </v-flex>
  <v-flex  class="px-2" md4>
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
               v-model="minPrice"
              >
              </v-text-field>
         </v-flex>
           <v-flex md6>
          <v-text-field
              placeholder = "max price"
               class="px-2"
               v-model="maxPrice"
              >
              </v-text-field>
        
         </v-flex>
         </v-row>
         </v-card>     
      </v-flex>

     </v-row>
     <v-divider class="my-1"></v-divider>
      <div>
         <v-flex class="d-flex justify-end">  
        <v-btn depressed="" @click="searchFilter()" outlined>
          <v-icon color="success" left>mdi-filter-menu</v-icon>
          filter
        </v-btn>
         <v-btn depressed="" @click="resetFilters()" class="ml-2" outlined>
          <v-icon color="red" left>mdi-filter-remove</v-icon>
          clear filter
        </v-btn>
      </v-flex>
      </div>
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
        businessSelected:[],
        loadingFilter:false,
        loadingFilterClear:false,
        businesses:[],
        dialog:false,
        page:1,
        search:'',
        location,
        minPrice:0,
        maxPrice:'',
        searchValues:{
          name:'',
          page:null,
          productCategory:[]
        },
        rules:{
          required:v=>!!v||"provide a search text"
        }
  }),
  methods:{
    ...mapActions(['getViewProducts',
    'openMessageDialog','getBusinessById',
    'notify','addToSearch',
    'getLocations','getBusinessSearch']),
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
    contactSeller(businessId,productId)
    {
      this.notify({text:"Requesting contact, please wait...",color:"warning",open:true})
            this.getBusinessById(businessId).then(()=>{
                    this.openMessageDialog(productId);
                   this.notify({open:false})
            }) 
    },
    getPage()
    {
      this.getProd();
    },
    setSearch(category)
    {
          category.selected=false;
          this.addToSearch(category)
        },
    clearSearch()
    {
       if(this.search==='')
      {
        this.searchValues.page=1
       this.getProd();
      }
    },
    searching()
    {
      if(this.$refs.searchForm.validate())
      {
          if(this.search.length>=3)
      {
        this.searchValues.page=1
       this.getProd();
      }
     
      }
    
    },
    getBuss()
    {
      this.businessSelected=[]
      this.businesses=[]
      this.loadingBusinesses=true;
      this.getBusinessSearch(this.location).then((data)=>{
      data.forEach(element => {
        this.businesses.push(element.name+','+element.id)
      });
      this.loadingBusinesses=false;
    })
    },
    searchFilter(){
        this.getProd();
    }
    ,getProd(){
      let businesses=[]
      if(this.businessSelected.length>0){
        this.businessSelected.forEach((element)=>{
          let val = element.split(',')
           businesses.push(val[1]) 
        })
      }
      businesses.join();
      this.getViewProducts(
        {
        number:this.page,
        search:this.search,
        productCategory:this.get_search_category,
        businesses:businesses,
        maxPrice:this.maxPrice,
        minPrice:this.minPrice})
    }
    ,resetFilters(){

        this.page=1
        this.search=''
        this.get_search_category=[]
        this.maxPrice=''
        this.minPrice=0
        this.businessSelected=[]
        this.getProd()
    }
  },
  computed:{
    ...mapGetters(['get_view_products','get_search_category','get_locations','get_search_business']),
      getPageLength(){
        return Math.ceil(this.get_view_products.count/10)
      },
     
    },
  created(){
    this.getProd();
  },
  mounted(){
    
    this.getLocations()
    this.loadingBusinesses=true;
    this.getBusinessSearch('').then((data)=>{
       data.forEach(element => {
        this.businesses.push(element.name+","+element.id)
      });
      this.loadingBusinesses=false;
    })
  }
}
</script>
<style  scoped>
.filter-chip{
    margin :auto;
    overflow :auto;
    width :100%;
    height: 32px;
    padding: 2px;
    border-radius:15px;
    align-content: center;
    border: solid 1px #9e9e9e;
    margin-top: 2px
}

</style>