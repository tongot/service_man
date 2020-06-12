<template>
    <v-container>
     <v-list> 
        <v-card @click="viewOrder(index,order)" outlined v-for="(order,index) in get_orders" :key="order.id">
      <v-list-group
        no-action
      >
        <template v-slot:activator>
           <v-list-item-avatar>
               <v-avatar :color="isOrderViewed(order.viewed)" size="48">
                   <span v-if="order.viewed==true" class="white--text">seen</span>
                   <span v-if="order.viewed==false" class="white--text">new</span>
               </v-avatar>
           </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title><v-chip><strong> Product name :</strong>{{order.product_detail.name}} </v-chip>
                                <v-chip><strong>Customer name :</strong>{{order.first_name+' '+order.last_name}}</v-chip></v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
        >
          <v-list-item-content>
            <v-row>
                <v-col md="6" xs="12" sm="12">
                <dl>
                    <dt><strong>Country</strong></dt>
                    <dd>{{order.country}}</dd>
                     <v-divider></v-divider>
                      <br>
                    <dt><strong>Street Address</strong></dt>
                    <dd>{{order.street_address}}</dd>
                    <v-divider></v-divider>
                      <br>
                    <dt><strong>Street Address 2</strong></dt>
                    <dd>{{order.street_address2}}</dd>
                    <v-divider></v-divider>
                      <br>
                    <dt><strong>Email Address</strong></dt>
                    <dd>{{order.email_address}}</dd>
                    <v-divider></v-divider>
                      <br>
                    <dt><strong>Phone Number</strong></dt>
                    <dd>{{order.phone_number}}</dd>
                </dl>
                </v-col>
                  <v-col md="6" xs="12" sm="12">
                      <dl>
                    <dt><strong>Date</strong></dt>
                    <dd>{{order.customer}}</dd>
                    <v-divider></v-divider>
                      <br>
                    <dt><strong>Product Name</strong></dt>
                    <dd>{{order.product_detail.name}}</dd>
                    <v-divider></v-divider>
                      <br>
                    <dt><strong>Product Id</strong></dt>
                    <dd>{{order.product_detail.id}}</dd>
                    <v-divider></v-divider>
                      <br>
                    <dt><strong>Order Date</strong></dt>
                    <dd v-text="getDate(order.date_of_order)"></dd>
                </dl>
                </v-col>
            </v-row>
         
          </v-list-item-content>
        </v-list-item>
        
      </v-list-group>
      </v-card>
    </v-list>
    </v-container>
</template>
<script>
import {mapActions,mapGetters} from 'vuex'
import {formartDate} from '../../scripts/otherScripts'
export default {
    data:()=>({
        loading:false
    }),
    methods:{
        ...mapActions(['getOrders','setOrderAsViewed']),
        getDate(date)
        {
          return formartDate(date);
        },
        isOrderViewed(order){
          return order?'grey lighten-1':'success'
        },
        viewOrder(postion,order)
        {
          if(order.viewed==false){
             var order1 ={
            id:order.id,
            businessId:order.business,
            index:postion
          }
          this.setOrderAsViewed(order1)
          }
         
        }

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