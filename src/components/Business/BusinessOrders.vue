<template>
    <v-container>
        <v-list>
      <v-list-group
        no-action
      >
        <template v-slot:activator>
           <v-list-item-avatar>
               <v-avatar color="success" size="48">
                   <span class="white--text">new</span>
               </v-avatar>
           </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>kakaka</v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
        >
          <v-list-item-content>
            <v-row>
                <v-col md="6" xs="12" sm="12">
                <dl>
                    <dt><strong>Country</strong></dt>
                    <dd>Black hot drink</dd>
                     <v-divider></v-divider>
                      <br>
                    <dt><strong>Street Address</strong></dt>
                    <dd>Black hot drink</dd>
                    <v-divider></v-divider>
                      <br>
                    <dt><strong>Street Address 2</strong></dt>
                    <dd>Black hot drink</dd>
                    <v-divider></v-divider>
                      <br>
                    <dt><strong>Email Address</strong></dt>
                    <dd>Black hot drink</dd>
                    <v-divider></v-divider>
                      <br>
                    <dt><strong>Phone Number</strong></dt>
                    <dd>Black hot drink</dd>
                </dl>
                </v-col>
                  <v-col md="6" xs="12" sm="12">
                      <dl>
                    <dt><strong>Date</strong></dt>
                    <dd>Black hot drink</dd>
                    <v-divider></v-divider>
                      <br>
                    <dt><strong>Product Name</strong></dt>
                    <dd>Black hot drink</dd>
                    <v-divider></v-divider>
                      <br>
                    <dt><strong>Product Id</strong></dt>
                    <dd>Black hot drink</dd>
                    <v-divider></v-divider>
                      <br>
                    <dt><strong>Approved</strong></dt>
                    <dd>Black hot drink</dd>
                </dl>
                </v-col>
            </v-row>
         
          </v-list-item-content>
        </v-list-item>
        
      </v-list-group>
        <v-list-group
        no-action
      >
        <template v-slot:activator>
           <v-list-item-avatar>
               <v-avatar color="success" size="48">
                   <span class="white--text">new</span>
               </v-avatar>
           </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>kakaka</v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
        >
          <v-list-item-content>
            <v-row>
                <v-col md="6" xs="12" sm="12">
                <dl>
                    <dt><strong>Country</strong></dt>
                    <dd>Black hot drink</dd>
                     <v-divider></v-divider>
                      <br>
                    <dt><strong>Street Address</strong></dt>
                    <dd>Black hot drink</dd>
                    <v-divider></v-divider>
                      <br>
                    <dt><strong>Street Address 2</strong></dt>
                    <dd>Black hot drink</dd>
                    <v-divider></v-divider>
                      <br>
                    <dt><strong>Email Address</strong></dt>
                    <dd>Black hot drink</dd>
                    <v-divider></v-divider>
                      <br>
                    <dt><strong>Phone Number</strong></dt>
                    <dd>Black hot drink</dd>
                </dl>
                </v-col>
                  <v-col md="6" xs="12" sm="12">
                      <dl>
                    <dt><strong>Date</strong></dt>
                    <dd>Black hot drink</dd>
                    <v-divider></v-divider>
                      <br>
                    <dt><strong>Product Name</strong></dt>
                    <dd>Black hot drink</dd>
                    <v-divider></v-divider>
                      <br>
                    <dt><strong>Product Id</strong></dt>
                    <dd>Black hot drink</dd>
                    <v-divider></v-divider>
                      <br>
                    <dt><strong>Approved</strong></dt>
                    <dd>Black hot drink</dd>
                </dl>
                </v-col>
            </v-row>
         
          </v-list-item-content>
        </v-list-item>
        
      </v-list-group>
    </v-list>
    </v-container>
</template>
<script>
import {mapActions,mapGetters} from 'vuex'
export default {
    data:()=>({
        loading:false
    }),
    methods:{
        ...mapActions(['getOrders']),

    },
    computed:mapGetters(['get_orders']),
    mounted(){
        this.loading= true
        this.getOrders(this.$route.params.businessId).then((response)=>{
            if(response.status=="200")
            {
                this.loading= false;
            }
        
        }).catch((error)=>{
            console.log(error.response)})
    }
}
</script>