<template>

  <v-container>
    <v-toolbar
    flat
    height="60px"
    >
    <v-toolbar-title>Products</v-toolbar-title>
    <v-spacer></v-spacer>

    <v-text-field
    prepend-inner-icon="mdi-magnify"
    class="mt-6"
    placeholder="search"
    >
    </v-text-field>


    </v-toolbar>

 <v-expansion-panels
      v-model="panel"
      :disabled="disabled"
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
        <v-flex class="px-2">
          <v-card
          class="pa-2"
          outlined
          >
          <p>Category</p>
          <v-select
            placeholder="category"
          >
          </v-select>
          </v-card>
      </v-flex>
     
       <v-flex class="px-2">
         <v-card
          class="pa-2"
          outlined
          >
         <p>Location</p>
          <v-select
              :items="justifyAvailable"
              placeholder="location"
            ></v-select>
         </v-card>
      </v-flex>
      <v-flex>
        <v-card
          class="pa-2"
          outlined
          >
        <p>Seller</p>
        <v-select
        placeholder="seller"
        >
        </v-select>
        </v-card>
      </v-flex>
  <v-flex  class="px-2">
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
              >
              </v-text-field>
         </v-flex>
           <v-flex md6>
          <v-text-field
              placeholder = "max price"
               class="px-2"
              >
              </v-text-field>
        
         </v-flex>
         </v-row>
         </v-card>     
      </v-flex>

     </v-row>
    
    </v-expansion-panel-content>
</v-expansion-panel>
 </v-expansion-panels>

  <v-card
    max-width="250px"
    max-height= "400px"
    outlined
    class="mt-4"
  >
     <v-img
      src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
      height="150px"
    ></v-img>

    <v-card-title>
      <v-flex>
        <h3 class="body-2"> Mazoe</h3>
          <v-chip outlined class="d-flex subtitle-2 justify-center">P200,000</v-chip>
      </v-flex>
     
    </v-card-title>
    <v-card-text max-height="20">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero... 
            </v-card-text>
    <v-card-actions>
      <v-flex class="d-flex justify-end">
      <v-btn icon color="primary" depressed> 
        <v-icon>mdi-cart</v-icon>
        </v-btn>
         <v-btn icon color="primary">
              <v-icon>mdi-card-account-phone</v-icon>
            </v-btn>
    <v-btn icon color="primary">
              <v-icon>mdi-thumb-up</v-icon>
            </v-btn>
       </v-flex>
    </v-card-actions>
  </v-card>
  </v-container>
</template>
<script>
export default {
  
}
</script>