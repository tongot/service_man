<template>
    <v-container class="mx-5">
        <v-form ref="form_data">
        <v-row class="mt-2">
            <v-flex  md8 lg8 class="pa-2">
                <v-row>   
                    <v-flex md12 lg12>
                <h3 class="headline">Business Logo</h3>
                <v-divider></v-divider>
                </v-flex>
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
                    max-width="500"
                    max-height="500"
                    min-height="200"
                    min-width="200"
                    >
                            <img 
                                ref="image"
                                :src="url"
                                style="max-height:500px; max-width:500px"
                                />   
                        <v-card 
                            flat
                            class="mb-1 d-flex justify-center"
                            max-height="100"
                            max-width="100"
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
                            Upload Logo
                            <v-icon right dark>mdi-cloud-upload</v-icon>
                            </v-btn>
                        </v-flex>
                    </v-row>
                 
                </v-flex>
                <v-flex md2 lg2 class="py-4">
                    <h5>Selected logo</h5>
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
        </v-row>
        <v-row>
            <v-flex md12 lg12>
                <h3 class="headline">Business Information</h3>
                <v-divider></v-divider>
            </v-flex>
             <v-flex md6 lg6  class ="pa-2" id="busineeInfor">
                <v-card class="pa-2 mt-4" flat>
                       <v-text-field
                     prepend-icon="mdi-google-my-business"
                     label="Business Name/Organisation"
                     outlined
                     v-model="business.name"
                     :rules="[rules.required]"
                    >
                    </v-text-field>
                    <v-textarea
                    prepend-icon="mdi-details"
                    label="Decription"
                    outlined
                    v-model="business.description"
                    :rules="[rules.required]"
                    >
                    </v-textarea>
                   <v-overflow-btn outlined   
                                label="Select your city"
                                target="#busineeInfor"
                                width="auto"
                                class="ma-5"
                                :items="get_locations"
                                prepend-icon="mdi-city"
                                v-model="location_id"
                                item-value="id"
                                item-text="city"
                                :rules="[rules.required]"
                                >
                                </v-overflow-btn>
                     <v-overflow-btn outlined   
                                label="Select your business line"
                                target="#busineeInfor"
                                width="auto"
                                class="ma-5"
                                :items="get_businessCategory"
                                prepend-icon="mdi-city"
                                v-model="categoryId"
                                item-value="id"
                                item-text="name"
                                :rules="[rules.required]"
                                >
                                </v-overflow-btn>
                    <v-text-field
                    prepend-icon="mdi-email"
                    label="Email address"
                    outlined
                    v-model="business.email"
                    :rules="[rules.required,rules.email]"
                    ></v-text-field> 
                </v-card>
                 
            </v-flex>
            <v-flex md6 lg6 class ="pa-2">
                <v-card
                flat
                class="pa-2 mt-4" 
                >
                     <v-textarea
                        min-height="400"
                        prepend-icon="mdi-mailbox"
                        label="Address"
                        outlined
                        v-model="business.address"
                        :rules="[rules.required]"
                    >
                     </v-textarea>
                     <v-text-field
                        prepend-icon="mdi-deskphone"
                        label="Business Line"
                        outlined
                        v-model="business.phone"
                        :rules="[rules.required]"
                    >
                    </v-text-field>

                      <v-text-field
                        prepend-icon="mdi-account"
                        label="Contact Person Full name"
                        outlined
                        v-model="business.contact_persona_name"
                        :rules="[rules.required]"
                    >
                      </v-text-field>
                    <v-text-field
                        prepend-icon="mdi-card-account-phone"
                        label="Contact Phone Number"
                        outlined
                        v-model="business.contact_persona_phone"
                        :rules="[rules.required]"
                    >
                    </v-text-field>
                </v-card>
            </v-flex>
        </v-row>
        <v-row>
             <v-flex md12 lg12 class="d-flex justify-end">
               <v-btn :loading="loading" color="success" @click="postBusiness()">
                   save business
               </v-btn>
            </v-flex>
        </v-row>
        </v-form>
    </v-container>
</template>
<script>
import Cropper from "cropperjs"
import {mapGetters,mapActions} from 'vuex'
import axios from 'axios'
export default {
    name:"add_new_product",
    data:()=>({
        isEditing:false,
        location_id:0,
        categoryId:0,
        cropper:{},
        image:null,
        destination_image:null,
        url:'',
        canvas_logo:null,
        selected_image:null,
        disable_btn_upload:true,
        cropped_image:null,
        images_to_post:[],
        overlay:false,
        error:{
            text:'',
            color:''
        },
        loading:false,
        business:{
            name:'',description:'',city:null,address:'',phone:'',contact_persona_name:'',contact_persona_phone:'',email:'',business_logo:null,id:null
        },
        //validations for the form
        rules: {
          required: value => !!value || 'This field is requierd.',
          counter: value => value.length <= 20 || 'Max 20 characters',
          email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Invalid e-mail.'
          },
        }
    }),

    methods:{ 
        ...mapActions(['getLocations','getBusinessById','getBusinessCategory','notify']),
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
                    aspectRatio:1,
                })
           this.disable_btn_upload=false;
        },
        upload(){
                this.error.text=''
                if(this.images_to_post.length===1){
                    this.error.text="You have reached maxmum images allowed remove the other to change"
                    this.error.color="warning"
                    return
                }
                const canvas = this.cropper.getCroppedCanvas();
                this.destination_image = canvas.toDataURL("image/png")
                this.canvas_logo=canvas
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
        },
        async postBusiness()
        {   
            
            if(this.$refs.form_data.validate())
            {
                this.loading=true;
                let response;
                const formData = new FormData
                if(Object.keys(this.cropper).length!==0)
                {
                    this.canvas_logo.toBlob((blob)=>{
                    formData.append("business_logo",blob,"business_logo.png")
                },"image/png")
                }
                
              setTimeout(async()=>{
                    if(this.isEditing)
                    {
                     formData.append("id",this.business.id)
                    }
                    formData.append("name",this.business.name)
                    formData.append("location",this.location_id)
                    formData.append("category",this.categoryId)
                    formData.append("email",this.business.email)
                    formData.append("contact_persona_name",this.business.contact_persona_name)
                    formData.append("contact_persona_phone",this.business.contact_persona_phone)
                    formData.append("description",this.business.description)
                    formData.append("phone",this.business.phone)
                    formData.append("address",this.business.address)
                    formData.append("owner",this.get_user.id)


                    try{
                        if(this.isEditing)
                        {
                             response = await  axios.put('/business_api/business/'+this.business.id+'/',formData)
                        }
                        else{
                                 response = await  axios.post('/business_api/business/',formData)
                        }
                        if(response.status=="201"||response.status=="200"){
                            this.loading=false
                            this.notify({text:"Save : )", color:"success", open:true})
                            this.$router.push({name:'my-business'})
                        }
                        else{
                            this.loading=false
                            console.log(response.data)
                        }
                    }catch(e){
                        this.loading=false
                        console.log(e.response)
                    }

              },500)
                   
                }
            

        }
        
    },
     computed:mapGetters(['get_locations','get_user','get_business','get_businessCategory']),
    created(){
        if (typeof  this.$route.params.businessId != 'undefined'){
            this.isEditing=true;
            this.getBusinessById(this.$route.params.businessId)
            .then(()=>{
                this.business=this.get_business
                if(this.business.business_logo!=null){
                         this.images_to_post.push(this.business.business_logo);
                }
                this.location_id=this.business.location
                this.categoryId =this.business.category

            })
        }
    },
    mounted(){
         this.getLocations()
         this.getBusinessCategory()
    },
   
}
</script>