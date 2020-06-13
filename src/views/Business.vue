<template>
<div>
  <v-row> 
    <v-col :class="content">
      <v-toolbar class="mb-2">
        <v-app-bar-nav-icon @click="showSideBar()"></v-app-bar-nav-icon>
        <v-toolbar-title>Stores</v-toolbar-title>
        <v-spacer></v-spacer>
           <v-text-field
          prepend-inner-icon="mdi-magnify"
          class="mt-6"
          placeholder="search"
          v-model="searchText"
          >
          </v-text-field>
          <v-btn class="pink lighten-2 white--text">
            search
          </v-btn>
       {{get_search_categoryBusiness}}
      </v-toolbar>
       <v-chip class="ml-1">
            <strong>{{get_businessCategory.length}} categories</strong>
          <v-chip small color="grey darken-1" class="ml-1 white--text" @click="removeCategory(search)" v-for="search in get_businessCategory" :key="search.id">
            <span v-if="search.selected">{{search.name}}</span>
          </v-chip>
      </v-chip >

      <router-view></router-view>
    </v-col>

    <div  :class="sidebar">
        <v-card>
          <v-img   src="https://cdn.vuetifyjs.com/images/cards/store.jpg">
            <v-card-title class="white--text">Stores</v-card-title>
          </v-img>
          <v-card-text>
            <v-list dense>
              <!--<v-overflow-btn outlined label="Select Location" target="#filters" width="auto"
                            class="ma-5" :items="get_locations" prepend-icon="mdi-city" v-model="location"
                            item-value="city" item-text="city">
                        </v-overflow-btn>
                        <v-divider></v-divider>-->
              <v-subheader>CATEGORIES</v-subheader>
              <v-list-item-group>
                <v-list-item v-for="item in get_businessCategory" :key="item.id">
                  <v-list-item-content>{{item.name}}</v-list-item-content>
                  <v-list-item-action>
                    <v-checkbox v-model="item.selected" @change="setCategorySearch(item)"></v-checkbox>
                  </v-list-item-action>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card-text>
        </v-card> 
    </div>
    
  </v-row>
</div>
</template>
<script>
import { mapGetters,mapActions } from 'vuex'
export default {
    data:()=>({
     
      sidebar:'sidebar'
      ,content:'content',
       location:'',
       categories:[],
       searchText:''
    }),
    methods:{
      ...mapActions(['getLocations','getBusinessCategory','addToBusinessSearch',]),
      showSideBar(){
          if(this.sidebar=='sidebar'){
             this.sidebar='sidebar-leave'
             this.content='content-leave'
          } 
          else{
            this.content='content'
             this.sidebar='sidebar'
          }
      },
      setCategorySearch(category){
         this.addToBusinessSearch(category)
      },
      getBuss()
      {
        
      },
      removeCategory(element)
    {
      element.selected=false
      this.addToBusinessSearch(element)
    }
    },
    
    computed:mapGetters(['get_businessCategory','get_locations','get_search_categoryBusiness']),
    mounted(){
      this.get_search_categoryBusiness=[]
        this.getBusinessCategory().then((data)=>{
          data.forEach((element)=>{
                this.addToBusinessSearch(element)   
          })
      })
    }
}
</script>
<style scoped>
  *{
    padding: 2px;
    margin: 0;
  }

  .sidebar{
    position:absolute; 
    width:15%;
    animation: slide-in 400ms;
    visibility:visible;
  } @keyframes slide-in{
    0%{
      width: 0%;
    }
     100%{
      width: 15%;
    }
  }
  .sidebar-leave{
    position:absolute; 
    width: 0%;
    display: none;
    animation: slide-out 400ms
  }  @keyframes slide-out{
    0%{
      width: 15%;
    }
     100%{
      width: 0%;
    }
  }
 

  .content-leave{
    width: 100%;
    margin-left:0%;
    animation: content-out 400ms;
  } @keyframes content-out{
    0%{
      width: 82%;
      margin-left:15%;
    }
     100%{
      width: 100%;
      margin-left:0%;
    }
  }
  .content{ 
    margin-left:15%;
    width:82%;
    animation: content-in 400ms;
  }@keyframes content-in{
    0%{
      width: 100%;
      margin-left:0%;
    }
     100%{
      width: 82%;
      margin-left:15%;
    }
  }
  @media  (max-width: 600px){
    .sidebar{
        position:absolute; 
        width:80%;
        animation: slide-in 400ms;
        visibility:visible;
      } @keyframes slide-in{
        0%{
          width: 0%;
        }
        100%{
          width: 80%;
        }
      }
      .sidebar-leave{
        position:absolute; 
        width: 0%;
        display: none;
        animation: slide-out 400ms
      }  @keyframes slide-out{
        0%{
          width: 80%;
        }
        100%{
          width: 0%;
        }
      }
    

      .content-leave{
        width: 100%;
        margin-left:0%;
        animation: content-out 400ms;
      } @keyframes content-out{
        0%{
          width: 20%;
          margin-left:78%;
        }
        100%{
          width: 100%;
          margin-left:0%;
        }
      }
      .content{ 
        margin-left:88%;
        width:20%;
        animation: content-in 400ms;
      }@keyframes content-in{
        0%{
          width: 100%;
          margin-left:0%;
        }
        100%{
          width: 20%;
          margin-left:78%;
        }
      }
  }

</style>