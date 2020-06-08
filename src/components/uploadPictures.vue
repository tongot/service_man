<template>
    <v-container>
        <v-card flat>
               <v-btn icon :to="{name:'own-product-list', params:{businessId:businessId}}"> 
            <v-icon>
                mdi-arrow-left
            </v-icon>
            <br>
        </v-btn>
            <v-card-title>
                uploaad other pictures here here
            </v-card-title>
                <v-file-input @change="addImage" multiple v-model="files"
                 prepend-icon="mdi-camera"
                 label="Select Image"
                 outlined accept="image/png,image/jpeg"></v-file-input>
            <v-container fluid>
                <v-row justify="space-around">
                    <v-col cols="4" v-for="(file,index) in filePreview"
                    :key="file.name"
                    >
                    <v-img aspect-ratio="1.7"
                        :src="file.source" contain
                    >
                    <v-btn
                    icon
                    color="pink darken-1"
                     @click="removePicture(index)">
                        <v-icon>mdi-delete</v-icon>
                    </v-btn>
                    </v-img>
                    </v-col>
                </v-row>
            </v-container>
            <v-card-actions class="d-flex justify-end">
                <v-btn depressed :disabled="canNotUpload" 
                @click="postImages()">
                    upload <span v-if="filesToUpload.length>0"> {{filesToUpload.length}} pictures</span>
                </v-btn>

            </v-card-actions>
        </v-card>
    </v-container>
</template>
<script>
import axios from 'axios'
import { mapActions} from 'vuex'
export default {
    data:()=>({
        files :null,
        filesToUpload :[],
        filePreview:[],
        canNotUpload:true,
        currentPictures:[],
        businessId:null,
        previewFile:{
            source:'',
            server:false,//this value detemines if the picture is from server or not 
        }
        
    })
    ,methods:{
        ...mapActions(['getProductById']),
        addImage(){
            if (this.files!== null){
                this.files.forEach(element => {
                   var previewFile={
                        source:URL.createObjectURL(element),
                        server:false,//this value detemines if the picture is from server or not 
                        imageid:null
                    }
                    this.filePreview.push(previewFile)
                    this.filesToUpload.push(element);
                });
                this.hasPictures();
            }
        },
        removePicture(index){
      
            let Image= this.filePreview[index]


            console.log(Image)
            if(Image.server===true)
            {
                axios.delete('/business_api/product-images/'+Image.imageid)
               .then((data)=>{
                   if(data.status=="200")
                   {
                     console.log(data.data)
                   }
               },(err)=>{
                   console.log("error"+err)
               })
            }
            this.filesToUpload.splice(index,1)
            this.filePreview.splice(index,1)

            this.hasPictures();
        }
        ,hasPictures()
        {
            if(this.filesToUpload.length>0)
            {
                this.canNotUpload=true;
            }return this.canNotUpload=false;
        },
        async postImages()
        {
            
            if(this.filesToUpload.length>0)
            {
                const formData = new FormData()
            
            this.filesToUpload.forEach((item)=>{
                formData.append('images',item,item.name)     
            })

            formData.append('product',this.$route.params.productId)
            
               axios.post('/business_api/product-images/',formData)
               .then((data)=>{
                   if(data.status=="201")
                   {
                       this.$router.push({name:"own-product-list",params:{businessId:this.$route.params.businessId}})
                   }
               },(err)=>{
                   console.log("error"+err)
               })
            }
        }
    },
    created()
    {
        this.businessId= this.$route.params.businessId;
           this.getProductById(this.$route.params.productId)
           .then((data)=>{
               if(data.product_images.length>0){
                        data.product_images.forEach((item)=>{
                      var previewFile={
                        source:item.image,
                        server:true,//this value detemines if the picture is from server or not 
                        imageid:item.id
                    }
                    if(item.is_cover==false)
                    {
                      this.filePreview.push(previewFile)
                    }
                })
               }
             
           })
    }
}
</script>