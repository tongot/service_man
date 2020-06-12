<template>
    <v-container
     class="py-0"
    >
    <v-card
     class="mx-auto"
    >
     <v-img
      
      class="white--text align-end mt-4"
      height="200px"
      src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
    >
       <v-card-title>Business in Bots</v-card-title>
    </v-img>
    </v-card>
        <v-list nav dense>
            <v-subheader>Sections</v-subheader>
          <v-list-group
            prepend-icon="mdi-google-my-business"
          >
            <template v-slot:activator>
                <v-list-item-title >Businesses</v-list-item-title>
            </template>
            <v-list-item-group>
                    <v-list-item >
                <v-list-item-content class="text-capitalize caption">all</v-list-item-content>
            </v-list-item>
                <v-list-item v-for="category in get_businessCategory" :key="category.name">
                <v-list-item-content class="text-capitalize caption">{{category.name}}</v-list-item-content>
            </v-list-item>
            </v-list-item-group>

          </v-list-group>
        </v-list>
        <v-list dense nav>
            
            <v-list-group
                no-action
                prepend-icon="mdi-group"
                value=""
            >
            <template v-slot:activator>
                <v-list-item-title to="/Products/list">Products groups</v-list-item-title>
            </template>
            <v-list-item-group>
                <v-list-item v-for="prod in get_productCategory" :key="prod.name">
                <v-list-item-icon>
                    <v-icon>mdi-ungroup</v-icon>
                </v-list-item-icon>
                <v-list-item-content class="text-capitalize caption">{{prod.name}}</v-list-item-content>
                <v-list-item-action>
                    <input type="checkbox" @change="setSearch(prod)" v-model="prod.selected"/>
                </v-list-item-action>
            </v-list-item>
            </v-list-item-group>

            </v-list-group>
        </v-list>
    </v-container>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
export default {
    data:()=>({
        product_categories:[
            {"icon":"mdi-clock","name":"Small Medium cars"},
            {"icon":"mdi-clock","name":"Electronics"},
            {"icon":"mdi-clock","name":"Catlary"}
        ],
        business_type:[
            {"icon":"mdi-dashboard","name":"Glossaries"},
            {"icon":"mdi-clock","name":"Car dealing"},
            {"icon":"mdi-clock","name":"Building"}
        ]
    }),
    methods:{
        ...mapActions(['getBusinessCategory','getProductCategory','addToSearch']),
        setSearch(category){
            this.addToSearch(category)
        }
    },
    computed:mapGetters(['get_businessCategory','get_productCategory']),
    mounted(){
        this.getBusinessCategory();
        this.getProductCategory().then((data)=>{
            data.forEach(element => {
                this.addToSearch(element)
            });
        })
    }
}
</script>