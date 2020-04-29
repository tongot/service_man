<template>
    <v-container>
        <v-toolbar
        flat dark color="blue"
        >
         
            <v-toolbar-title>
                Add new product
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
                <v-icon>mdi-close-circle</v-icon>
            </v-btn>
        </v-toolbar>
        <v-row class="mt-2">
            <v-flex  md8 lg8 class="pa-2">
                <v-row>   
                <v-flex md10 lg10 class="pa-4">
                    <v-alert
                        v-if="error.text!=''"
                        dense
                        border="left"
                        :type="error.color"
                        >
                        {{error.text}}
                    </v-alert>
                    <v-card 
                    flat
                    max-width="900"
                    max-height="500"
                    min-height="200"
                    min-width="200"
                    >
                            <img 
                                ref="image"
                                :src="url"
                                style="max-height:500px; max-width:900px"
                                />   
                        <v-card 
                            flat
                            class="mb-1 d-flex justify-center"
                            max-height="100"
                            max-width="170"
                            style="margin-top:-100px"
                            v-if="disable_btn_upload==false"
                            >
                                 <img 
                                    :src="destination_image"
                                    style="max-height:100px; max-width:170px;"
                                    />         
                        </v-card>
                    </v-card>
                    <v-file-input
                        v-if="disable_btn_upload==true"
                        ref="image_input"
                        label="Click to upload image"
                        accept="image/png,image/jpeg"
                        prepend-icon="mdi-camera"
                        @change="AddImage"
                        v-model="selected_image"
                        outlined
                        class="mt-4"
                    ></v-file-input>
                    <v-row>
                        <v-flex class="pa-2">
                             <v-btn
                            color="pink darken-1"
                            class="ma-2 white--text"
                            block depressed
                            :disabled="disable_btn_upload"
                            @click="cancelUpload"
                            >
                            Cancel
                            <v-icon right dark>mdi-close-circle</v-icon>
                            </v-btn>
                        </v-flex>
                        <v-flex class="pa-2">
                             <v-btn
                            color="blue"
                            class="ma-2 white--text"
                            block depressed
                            :disabled="disable_btn_upload"
                            @click="upload"
                            >
                            Upload Image
                            <v-icon right dark>mdi-cloud-upload</v-icon>
                            </v-btn>
                        </v-flex>
                    </v-row>
                 
                </v-flex>
                <v-flex md2 lg2 class="py-4">
                       <v-card 
                       v-for="image in images_to_post"
                       :key="image"
                    outlined
                    class="mb-1 d-flex justify-center"
                    @mouseenter="showRemove"
                    @mouseleave="showRemove"
                    >
                          <img 
                            :src="image"
                            style="max-height:100%; max-width:100%"
                            />   
                               <v-overlay
                                absolute
                                opacity=".7"
                                :value="overlay"
                                z-index="5"
                                > 
                                 <v-btn icon color="pink darken-1" 
                                 @click="removeFromList(image)"
                                 >
                                    <v-icon>mdi-close-circle</v-icon>
                                </v-btn>
                               </v-overlay>
                     </v-card>
                </v-flex>
                </v-row>
               
            </v-flex>
            <v-flex md4 lg4  class ="pa-2">
                <v-card class="pa-2 mt-4" outlined>
                    <v-card-title  class="blue--text">
                        Product Information
                    </v-card-title>
                       <v-text-field
                     prepend-icon="mdi-tag"
                     label="Product Name"
                     outlined
                    >
                    </v-text-field>
                    <v-textarea
                    prepend-icon="mdi-details"
                    label="Product Details"
                    outlined
                    >
                    </v-textarea>
                     <v-text-field
                     prepend-icon="mdi-cash-100"
                     label="Price"
                     outlined
                    >
            
                    </v-text-field>
                            <v-row class="pa-4" justify="space-around">
                        <v-flex>
                    <v-checkbox
                        label="Available"
                        color="primary"
                        value="available"
                        ></v-checkbox>
                         </v-flex>
                          <v-flex>
                        <v-checkbox
                        label="Price Negotiable"
                        color="primary"
                        value="Negotiable"
                        ></v-checkbox>
                         </v-flex>
                          <v-flex>
                              <v-radio-group>
                                   <v-radio
                                    label="Brand new"
                                    color="success"
                                    value="New"
                                    ></v-radio>
                                    <v-radio
                                    label="Used"
                                    color="warning"
                                    value="used"
                                    ></v-radio>
                              </v-radio-group>
                       
                        </v-flex>
                    </v-row>
                    
                </v-card>
                 
            </v-flex>
        </v-row>
    </v-container>
</template>
<script>
import Cropper from "cropperjs"
export default {
    name:"add_new_product",
    data:()=>({
        cropper:{},
        image:null,
        destination_image:null,
        url:'',
        selected_image:null,
        disable_btn_upload:true,
        cropped_image:null,
        images_to_post:[],
        overlay:false,
        error:{
            text:'',
            color:''
        }

    }),

    methods:{ 
        AddImage(){
            if(this.selected_image!=null)
            {
                this.url=URL.createObjectURL(this.selected_image)
                if(this.url!=''){
                    this.image=this.$refs.image
                }
                setTimeout(()=>{
                    this.setCropper()
                },1000)
            }
            else{
                this.resetUpload()
            }
            
        },
        setCropper(){
                this.cropper= new Cropper(this.image,{
                    zoomable:false,
                    scalable:false,
                    aspectRatio:1.7,
                    crop:()=>{
                        const canvas = this.cropper.getCroppedCanvas();
                        this.destination_image = canvas.toDataURL("image/png")
                    }
                })
           this.disable_btn_upload=false;
        },
        upload(){
                this.error.text=''
                if(this.images_to_post.length===5){
                    this.error.text="You have reached maxmum images allowed"
                    this.error.color="warning"
                    return
                }
                this.images_to_post.push(this.destination_image)
                this.resetUpload()
        },
        cancelUpload(){
            this.resetUpload()
        }
        ,resetUpload()
        {
            this.cropper.destroy()
                this.disable_btn_upload=true;
                this.destination_image=null;
                this.selected_image=null;
                this.url='';
        },
        showRemove(){
            this.overlay = this.overlay == true ? false  : true;
        },
        removeFromList(image){
            this.error.text=''
            let img = this.images_to_post.indexOf(image)
            this.images_to_post.splice(img,1)
        }
        
    },
    mounted(){
         
    }
}
</script>