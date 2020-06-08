<template>

    <v-container class="justify-center d-flex">
        <v-dialog v-model="guestOrder" max-width="500">
            <v-card>
                <v-card-title class="headline">Continue as Guest</v-card-title>

                <v-card-text>
                    You will miss out promotions and other benefits of having an account
                </v-card-text>

                <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                    color="green darken-1"
                    text
                    @click="loginFirst()"
                >
                    Login now
                </v-btn>

                <v-btn
                    color="warning darken-1"
                    text
                    @click="continueAsGuest()"
                >
                    Continue
                </v-btn>
                 <v-btn
                    color="pink darken-1"
                    text
                    @click="guestOrder=!guestOrder"
                >
                    cancel
                </v-btn>
                </v-card-actions>
      </v-card>

        </v-dialog>
        <v-col md="6">
             <v-row class="justify-center">
            <v-col>
                <v-card class="pa-2">
                    <v-img :src="displayImage" height="500" contain/>
                </v-card>
            </v-col>
        </v-row>
        <v-row class="">
            <v-hover
            v-slot:default="{hover}"
              v-for="picture in get_view_product.product_images"
                        :key="picture.image"        
            >
            <v-card 
               :max-width="hover ? '':'100'"
                flat
                >
                <img 
                @mouseenter="changeImage(picture.image)"
                    :src="picture.image"
                style="max-height:100px; max-width:170px;"
                />         
                </v-card>
            </v-hover>
           
        </v-row>
        <v-divider></v-divider>
        <v-row class="mt-2">
            <v-col md="3" class="pa-1">
                <v-card outlined>
                <v-list-item two-line v-for="property in get_view_product.other_properties"
                :key="property.property_name">
                    <v-list-item-content>
                        <v-list-item-title>{{property.property_name}}</v-list-item-title>
                        <v-list-item-subtitle>{{property.description}}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-card>
            </v-col>
            <v-col md="9" class="pa-1">
                <v-card outlined>
                    <v-card-title>
                        {{get_view_product.name}}
                        <v-spacer> </v-spacer>
                             <v-chip flat outlined class="display-1">
                                <v-avatar color="red" class="white--text" left>
                                    <span class="subtitle-1">P</span>
                                </v-avatar>
                                    {{get_view_product.price}}
                                </v-chip>
                       
                        </v-card-title>
                    <v-card-text>  {{get_view_product.description}}</v-card-text>
                    <v-card-actions>
                         <v-chip
                            class="ma-2"
                            color="success"
                            text-color="white"
                            v-if="get_view_product.price_neg"
                        >
                            <v-avatar left>
                            <v-icon>mdi-checkbox-marked-circle</v-icon>
                            </v-avatar>
                            price negotiable 
                        </v-chip>
                        <v-chip
                     
                            class="ma-2"
                            color="error"
                            text-color="white"
                            v-if="!get_view_product.price_neg"
                        >
                            <v-avatar left>
                            <v-icon>mdi-window-close</v-icon>
                            </v-avatar>
                            price negotiable 
                        </v-chip>
                            <v-chip
                             v-if="get_view_product.product_new"
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
                            v-if="!get_view_product.product_new"
                            class="ma-2"
                            color="error"
                            text-color="white"
                        >
                            <v-avatar left>
                            <v-icon>mdi-window-close</v-icon>
                            </v-avatar>
                            brand new
                        </v-chip>
                      
                    </v-card-actions> 
                     <v-divider></v-divider>
                        <v-col class="d-flex align-center justify-end"> 
                            
                            <v-btn depressed small 
                            @click="orderBtn"
                            class="white--text ma-1" color="indigo">
                                <v-icon left>mdi-cart</v-icon>
                                order
                            </v-btn>
                           
                             <v-btn depressed small :loading="loading" @click="contactSeller(get_view_product.business,get_view_product.id)" 
                             color="pink darken-1 ma-1" class="white--text">
                                <v-icon left>mdi-card-account-phone</v-icon>
                                contact seller
                            </v-btn>
                             <v-btn fab depressed small color="primary" class="ma-1">
                                 <v-icon>
                                   mdi-cart-plus
                                 </v-icon>
                            </v-btn>
                        </v-col>
                </v-card>
            </v-col>
        </v-row>
        </v-col>
    </v-container>
</template>
<script>
import {mapActions,mapGetters} from 'vuex'
export default {
    data:()=>({
        displayImage:'',
        guestOrder:false,
        loading:false,
    }),
    methods:{
        ...mapActions(['getProductDetail','showLogIn','openMessageDialog','getBusinessById']),
        changeImage(image)
        {
            this.displayImage=image
        }
        ,loginFirst()
        {
              this.showLogIn()
            this.$router.push({name:'productOrder',params:{productId:this.get_view_product.id}})            

         },
         continueAsGuest()
         {
            this.$router.push({name:'productOrder',params:{productId:this.get_view_product.id}})            
            
         },
        orderBtn()
        {
              if(this.get_user==null)
            {
            this.guestOrder=true;
            }
            else{
            this.$router.push({name:'productOrder',params:{productId:this.get_view_product.id}})            
            }
        },
        contactSeller(businessId,productId)
        {
            this.loading= true;
            this.getBusinessById(businessId).then(()=>{
                    this.openMessageDialog(productId);
                    this.loading= false;
            })
        }
    }
    ,computed:mapGetters(['get_view_product','get_user'])
    ,mounted()
    {
        this.getProductDetail(this.$route.params.productId).then(()=>{
            if(this.get_view_product.product_images.length>0)
            {
                this.displayImage= this.get_view_product.product_images[0].image
            }

        })
    }
}
</script>