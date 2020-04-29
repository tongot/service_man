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
        <v-list nav>
            <v-subheader>Sections</v-subheader>
          <v-list-group
            prepend-icon="mdi-google-my-business"
          >
            <template v-slot:activator>
                <v-list-item-title>Business</v-list-item-title>
            </template>
            <v-list-item-group>
                <v-list-item v-for="prod in product_categories" :key="prod.name">
                <v-list-item-icon>
                    <v-icon>{{prod.icon}}</v-icon>
                </v-list-item-icon>
                <v-list-content class="text-capitalize caption">{{prod.name}}</v-list-content>
            </v-list-item>
            </v-list-item-group>

          </v-list-group>
        </v-list>
        <v-list nav>
            
            <v-list-group
                no-action
                prepend-icon="mdi-tag-multiple"
                value=""
            >
            <template v-slot:activator>
                <v-list-item-title>Products</v-list-item-title>
            </template>
            <v-list-item-group>
                <v-list-item v-for="prod in product_categories" :key="prod.name">
                <v-list-item-icon>
                    <v-icon>{{prod.icon}}</v-icon>
                </v-list-item-icon>
                <v-list-content class="text-capitalize caption">{{prod.name}}</v-list-content>
            </v-list-item>
            </v-list-item-group>

            </v-list-group>
        </v-list>
    </v-container>
</template>
<script>
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
    })
}
</script>