 <template>
    <v-container>
        <v-card class="pa-2 mb-2" 
        v-for="bus in get_ownBusiness"
        :key="bus.id"
        outlined
        flat>
        <v-card-title>{{bus.name}}
             <v-chip>{{bus.category_detail.name}}</v-chip>
            <v-spacer></v-spacer>
            <v-btn text :to="{name:'own-product-list', params:{businessId:bus.id}}" depressed small color="success">
                View Products
            </v-btn>
            <v-btn :to="{name:'product-new', params:{businessId:bus.id}}" depressed small color="primary">
                Add product
            </v-btn>
            <v-btn icon color="green darken-1" :to="{name:'business-edit',params:{businessId:bus.id}}">
                <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon color="pink darken-1">
                <v-icon>mdi-delete</v-icon>
            </v-btn>
        </v-card-title>
<v-divider></v-divider>
            <v-row>
                <v-flex md12 sm12 lg12 xl12 xs12 class="">
                    <v-card class="pa-2 ma-2"
                    flat
                    >
                    <v-row>
                        <v-flex md2 sm12 xs12 class="pa-1 d-flex justify-center">
                             <v-img v-if="bus.business_logo!==null" :src="bus.business_logo"
                             height="200"
                             width="200"
                            aspect-ratio="1"
                            contain
                            >
                            </v-img>
                        </v-flex >
                        <v-flex md6 sm12 xs12 class="pa-2"> 
                            
                            <p>
                                <v-icon>mdi-details</v-icon>
                                {{bus.description}}
                            </p>
                            <p>
                                <v-icon>mdi-email</v-icon>
                                {{bus.email}}
                            </p>
                        </v-flex>
                         <v-flex md4 sm12 xs12 class="pa-2">
                             <h4>Contact details</h4>
                             <p>
                                 <v-icon color="blue">mdi-phone</v-icon>
                                 {{bus.phone}}
                             </p>
                            
                             <p>
                                 <v-icon color="blue">mdi-mailbox</v-icon>
                                 {{bus.address}}
                             </p>
                                 <p>
                                 <v-icon color="blue">mdi-city</v-icon>
                                 {{bus.location_detail.city}} | {{bus.location_detail.country}}
                             </p>
                                 <p>
                                 <v-icon color="blue">mdi-account</v-icon>
                                 {{bus.contact_persona_name}}
                             </p>
                                 <p>
                                 <v-icon color="blue">mdi-card-account-phone</v-icon>
                                 {{bus.contact_persona_phone}}
                             </p>
                         </v-flex>
                    </v-row>   
                    <v-card class="pa-2" 
                    flat
                    color="blue lighten-4">
                    <v-row >
                        <v-flex md6 class="pa-2">
                            <h6 class="subtitle">Created:{{bus.date_created}}</h6>
                        </v-flex>
                        <v-flex md6 class="d-flex pa-2 justify-end">
                            <v-icon>mdi-star</v-icon>(455)
                        
                        </v-flex>
                    
                    </v-row>
                    </v-card> 
                    </v-card>
                </v-flex>
            </v-row>
        </v-card>
    </v-container>
</template>
<script>

import {mapActions,mapGetters} from 'vuex'
export default {
    data:()=>({}),
    methods:{
        ...mapActions(['getOwnBusiness'])
    },
    mounted(){
        this.getOwnBusiness()
    },
    computed:mapGetters(['get_ownBusiness'])
}
</script>