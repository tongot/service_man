<template>

  <v-container>
      <!--
          dialog box for rating the business
      -->
    <v-dialog
      v-model="dialog_rate"
      width="600"
      >
        <v-card class="pa-2">
            <v-card-title>
                Comment
            </v-card-title>
            <v-textarea>

            </v-textarea>
            <v-card-text class="d-flex justify-end">
                <span class="headline">Rate</span>
                <v-btn 
                icon v-for="rate_star in rate_stars"
                :key="rate_star.value"
                @mouseover="mouseEnterStar(rate_star.value)"
                @mouseleave="mouseLeaveStar"
                @click.prevent="setStars(rate_star.value)"
                >
                    <v-icon :color="rate_star.color">mdi-star</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                 <v-btn @click="cancel()" color="pink darken-1">
                    <v-icon>mdi-close-circle</v-icon>
                    cancel
                </v-btn>
                <v-btn color="success mx-2">
                    <v-icon left>mdi-email</v-icon>
                    post
                </v-btn>
            </v-card-text>
        </v-card>
      </v-dialog>
    <v-toolbar
    flat
    height="60px"
    >
    <v-toolbar-title>businesses</v-toolbar-title>
    <v-spacer></v-spacer>

    <v-text-field
    prepend-inner-icon="mdi-magnify"
    class="mt-6"
    placeholder="search"
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
        <v-flex class="px-2" md6 sm12>
          <v-card
          class="pa-2"
          outlined
          >
          <p>Category</p>
          <v-combobox
            placeholder="category"
            :items="categories"
            multiple
            chips
            :selected="selectedCategories"
          >
          </v-combobox>
          </v-card>
      </v-flex>
     
       <v-flex class="px-2"  md6 sm12>
         <v-card
          class="pa-2"
          outlined
          >
         <p>Location</p>
      <v-overflow-btn outlined label="Select Location" target="#filters" width="auto"
                            class="ma-5" :items="get_locations" prepend-icon="mdi-city" v-model="location"
                            item-value="city" item-text="city">
                        </v-overflow-btn>
         </v-card>
      </v-flex>
     </v-row>
    
    </v-expansion-panel-content>
</v-expansion-panel>
 </v-expansion-panels>
<v-container fluid>
<v-row class="justify-space-around">

<v-card
    class="mb-2"
    width="430"
    outlined
    v-for="business in get_search_business"
    :key="business.id"
  >
    <v-list-item three-line>
      <v-list-item-content>
        <div class="overline mb-4"></div>
        <v-list-item-title class="headline mb-1">{{business.name}}</v-list-item-title>
        <v-list-item-subtitle>{{business.description}}</v-list-item-subtitle>
      </v-list-item-content>

      <v-img
      class="mt-2"
       aspect-ratio="1"
       max-height="150"
       max-width="150"
       :src="getLogo(business.business_logo)"
      >

      </v-img>
    </v-list-item>

    <v-card-actions >
        <v-flex class="d-flex justify-start">
        <v-btn text color="blue"  @click.stop="dialog_rate= true">
            <v-icon left>mdi-star</v-icon>
            <u>Rate Business</u> 
        </v-btn>
        </v-flex>
        <v-flex  class="d-flex justify-end">
                <v-icon color="orange lighten-1">mdi-star</v-icon>
        </v-flex>
        
          
    </v-card-actions>
  </v-card>
</v-row>
</v-container>
  </v-container>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    name:'business_list',
  data:()=>({
            categories:[],
            selecteCategories:[],
            dialog_rate:false,
            star_color:'orange lighten-1',
            review:{
                number_of_stars:0,
                comment:''
            },
            stars_clicked:0,
            comment:'',
            rate_stars:[
                {'value':1, 'color':''},
                {'value':2, 'color':''},
                {'value':3, 'color':''},
                {'value':4, 'color':''},
                {'value':5, 'color':''}
            ]
  })
  ,methods:{
      ...mapActions(['getBusinessSearch','getLocations','getBusinessCategory']),
      mouseEnterStar(value)
      {
          //if value is 0 that means we are living the from the stars
          this.rate_stars.forEach(element => {
              if(element.value<=value && this.stars_clicked===0)
              {
                  element.color=this.star_color;
              }
              if( this.stars_clicked!==0)
              {
                  if(element.color!=='')
                  {
                      element.color='';
                  }
                  if(element.value<=value)
                     {
                  element.color=this.star_color;
                     }
              }
          });
      },
      mouseLeaveStar()
      {
             this.rate_stars.forEach(element => {
              if(this.stars_clicked===0)
              {
                  element.color='';
              }
              if(this.stars_clicked!==0)
              {
                   if(element.color!=='')
                  {
                      element.color='';
                  }
                  if(element.value<=this.stars_clicked)
                  {
                     element.color=this.star_color;

                  }
              }
              
              
          });
      },
      setStars(id)
      {
          this.stars_clicked=id;
      },
      postReview()
      {
          this.review.number_of_stars=this.stars_clicked;
          this.review.comment=this.comment;

      },
      cancel()
      {
          this.rate_stars.forEach(item =>{
              item.color=''

          })
          this.review.number_of_stars=0;
          this.review.comment='';
      },
      getLogo(logo)
      {
          console.log(logo)
          if(logo===null)
          {
              return require('../../assets/dummy/productDummy.png')
          }
          return logo
      }
  },
  computed:mapGetters(['get_search_business','get_locations']),
  created()
  {
      this.getBusinessSearch('')
  },
  mounted()
  {
      this.getLocations()
      this.getBusinessCategory().then((data)=>{
          data.forEach((element)=>{
              this.categories.push(element.name+','+element.id)
          })
      })
  }
}
</script>