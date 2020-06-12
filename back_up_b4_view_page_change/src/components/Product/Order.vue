<template>
    <v-container class="d-flex justify-center">
      <v-form ref="orderForm">
  <v-card class="pa-2">

            <v-img aspect-ratio="1" :src="coverImage" class="mb-2 white--text">
              <v-card-title>{{get_view_product.name}}</v-card-title>
            </v-img> 
            <v-card-title>{{get_view_product.name}}</v-card-title> 
              <v-row>  
                  <v-col md="6" sm="12">
                         <v-text-field label="First Name" placeholder="First name" :rules="[rules.required]" outlined v-model="order.name">    
                             </v-text-field>
                              <v-text-field label="Street address 1" placeholder="Street address 1" :rules="[rules.required]" outlined v-model="order.address">    
                             </v-text-field>
                               <v-text-field label="Email address" placeholder="Email address" :rules="[rules.required]"  outlined v-model="order.email">    
                             </v-text-field>
                               <v-text-field label="City" placeholder="City" :rules="[rules.required]"  outlined v-model="order.city">    
                             </v-text-field>
                   </v-col>   
                    <v-col md="6" sm=12>
                            <v-text-field label="Last name" placeholder="Last name" :rules="[rules.required]"  outlined v-model="order.surname">    
                             </v-text-field>
                                <v-text-field label= "Street address 2" placeholder="Street address 2" outlined v-model="order.address1">    
                             </v-text-field>
                               <v-text-field label="Confirm email" placeholder="Confirm Email" :rules="ruleMatch"  outlined v-model="order.email2">    
                             </v-text-field>
                               <v-text-field label="Phone Number" placeholder="Phone Number" :rules="[rules.required]"  outlined v-model="order.phone">    
                             </v-text-field>    
                   </v-col>           
            </v-row>
             <v-text-field label="Quantity" placeholder="Qantity" :rules="[rules.required]" outlined type="number" v-model="order.quantity">    
                             </v-text-field>
              <v-btn depressed color="success" block @click="Order"
              :loading="loading"
              :disabled="loading"
              >
                  <v-icon left>
                      mdi-cube-send
                  </v-icon>
                  submit
              </v-btn>
        </v-card>
      </v-form>
      
    </v-container>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'

export default {

  data:()=>({
      coverImage:'',
      order:{
        name:'',
        address:'',
        email:'',
        city:'',
        surname:'',
        address1:'',
        email2:'',
        phone:'',
        quantity:'',
        productId:'',
        businessId:'',
        owner:''
      },
      match:'',
      rules:{
        required:v=>!!v||"this field is required",
      },
      loader:null,
      loading:false
  }),
  methods:{
    ...mapActions(['postOrder','getUserDetails','getProductDetail','notify']),

    Order(){
    
        
      if(this.$refs.orderForm.validate())
      {  this.loading=true;
        this.order.businessId= this.get_view_product.business
        this.order.productId = this.get_view_product.id
        if(this.get_user!=null)
        {
           this.order.owner = this.get_user.id
        }
        this.postOrder(this.order).then((data)=>
        {
          if(data.status=="201")
          {
            this.loading=false;
            this.notify({text:"Order submited",color:'success',open:true})
            this.$router.push({name:'productDetails',params:{productId:this.order.productId}})
          }
        });
      }
        
    }
  },
  mounted(){
    this.getProductDetail(this.$route.params.productId).then(()=>{
      if(this.get_view_product.product_images.length>0)
      {
        this.coverImage = this.get_view_product.product_images.filter(item=>item.is_cover==true)[0].image
      }
    });

    this.getUserDetails().then(()=>{
      if(this.get_user!=null)
      {
        this.order.name=this.get_user.name
        this.order.address=this.get_user.address
        this.order.email=this.get_user.email
        this.order.surname=this.get_user.surname
        this.order.address1=this.get_user.address2
        this.order.phone=this.get_user.phone_number
      }

    })
   
  },
 computed:{
   ...mapGetters(['get_user','get_view_product']),
   ruleMatch(){
     const rules =[]
      if(this.order.email)
      { const rule =
            v => (!!v && v) === this.order.email ||
              'Email do not match'
          rules.push(rule)

      }
        
     return rules
   }
 }
}
</script>