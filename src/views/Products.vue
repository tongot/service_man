<template>
<div>
  <v-row> 
    <v-col :class="content">
      

         <v-toolbar class="mb-2">
        <v-app-bar-nav-icon @click="showSideBar()"></v-app-bar-nav-icon>
        <v-toolbar-title>Products</v-toolbar-title>
      </v-toolbar>
   <div :class="hidcontent">
           <router-view></router-view>
   </div>
    </v-col>
    <div  :class="sidebar">
        <v-card>
          <v-img   src="https://cdn.vuetifyjs.com/images/cards/docks.jpg">
            <v-card-title class="white--text">Stores</v-card-title>
          </v-img>
          <v-card-text>
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
          </v-card-text>
        </v-card> 
    </div>
    
  </v-row>
</div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
export default {
    data:()=>({
        sidebar:'sidebar',
        content:'content',
        hidcontent:'hid-content',
        categories:[]
    }),
    methods:{
        ...mapActions(['getBusinessCategory','getProductCategory','addToSearch']),
        setSearch(category){
            this.addToSearch(category)
        },
         showSideBar(){
          if(this.sidebar=='sidebar'){
             this.sidebar='sidebar-leave'
             this.content='content-leave'
             this.hidcontent=''
          } 
          else{
            this.content='content'
             this.sidebar='sidebar'
             this.hidcontent='hid-content'
          }
      },
    },
    computed:mapGetters(['get_businessCategory','get_productCategory']),
    mounted(){
        this.getBusinessCategory();
        this.getProductCategory().then((data)=>{
           this.categories = data
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
    
      .hid-content{
        visibility: collapse;
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