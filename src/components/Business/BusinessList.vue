<template>

  <v-card flat class="ma-4 pa-1">
      <!--
          dialog box for rating the business
      -->
    <v-dialog

      v-model="dialog_rate"
      width="600"
      persistent
      >
        <v-card class="pa-2">
            <v-card-title>
                Comment
                <v-spacer>
                </v-spacer>
                <v-btn icon @click="closeModalRate()">
                    <v-icon color="pink darken-1">mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <span>
                <v-icon color="pink">
                        mdi-exclamation-thick
                </v-icon>
            </span>
            <span class="subtitle pink--text">Please select at list 1 start or give a comment</span>
            <v-textarea v-model="comment">

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
                <v-btn color="success mx-2" :loading="postLoading" @click="postReview()">
                    <v-icon left>mdi-email</v-icon>
                    post
                </v-btn>
            </v-card-text>
        </v-card>
      </v-dialog>

<div fluid>
<v-row class="justify-space-around align-start">

<v-hover
 v-slot:default="{hover}"
   v-for="business in get_search_business"
    :key="business.id"
>
<v-card
    class="mb-2"
    width="430"
    outlined
    :elevation="hover? 12 : 1"
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
        <v-btn text color="blue"  @click.stop="openModalRate(business.id)">
            <v-icon left>mdi-star</v-icon>
            <u>Rate Business</u> 
        </v-btn>
        </v-flex>
        <v-flex  class="d-flex justify-end">
                <v-icon color="orange lighten-1">mdi-star</v-icon>
        </v-flex>
        
          
    </v-card-actions>
  </v-card>
</v-hover>

</v-row>
</div>
  </v-card>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    name:'business_list',
  data:()=>({
            postLoading:false,
            dialog_rate:false,
            star_color:'orange lighten-1',
            review:{
                number_of_stars:0,
                comment:'',
                user:""
                ,businessId:''
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
      ...mapActions(['getBusinessSearch','showLogIn,','postRating']),
      mouseEnterStar(value)
      {
          //if value is 0 that means we are living  from the stars
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
          if(this.get_user!=null){
                this.review.number_of_stars=this.stars_clicked;
                 this.review.comment=this.comment;
                 this.review.user=this.get_user.id
                this.postLoading=true
            this.postRating(this.review).then(()=>{
                this.postLoading=false
                this.dialog_rate=false
            })
          }else{
              this.showLogIn()
          }
        
      },
      cancel()
      {
          this.rate_stars.forEach(item =>{
              item.color=''
          })
          this.review.number_of_stars=0;
          this.review.comment='';
          this.stars_clicked=0;
      },
      closeModalRate(){
          this.dialog_rate= false;
      },
      openModalRate(id){
          this.comment=''
          this.dialog_rate= true;
          this.review.businessId=id;
          this.rate_stars.forEach(element=>{
              element.color=''
          })
          this.stars_clicked=0;
      },

      getLogo(logo)
      {
          if(logo===null)
          {
              return require('../../assets/dummy/productDummy.png')
          }
          return logo
      },
  },
  computed:mapGetters(['get_search_business','get_locations','get_user']),
  created()
  {
      this.getBusinessSearch({search:'',categories:''})
  }
}
</script>