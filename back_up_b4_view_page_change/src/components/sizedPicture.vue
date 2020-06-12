<template>
    <v-container>
        <v-card flat>
            <v-card-title>
                uploaad your cover picture here
            </v-card-title>
                <v-file-input @change="addImageToCanvas" v-model="imageToCrop"
                 prepend-icon="mdi-camera"
                 label="Select Image"
                 outlined accept="image/png,image/jpeg"></v-file-input>
            <v-card-text>
                <div>
                <img :src="imageSource" alt="" style="height:100%; width:100%" ref="image">
                </div>
            </v-card-text>
            <v-card-actions class="d-flex justify-end">
                <v-btn depressed :disabled="canNotUpload" @click="cropAndPostImage()">
                    upload
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
</template>
<script>
import  cropper from 'cropperjs'
import {mapActions} from 'vuex'
export default {
    data:()=>({
            currentImage:'',
            imageSource:'',
            cropper:null,
            imageToCrop:null,
            imageCanvas:null,
            canNotUpload:true,

    }),
    methods:{
        ...mapActions(['uploadPicture']),
        addImageToCanvas()
        {
            this.canNotUpload=true;
            if(this.cropper!=null)
            {
                 this.cropper.destroy()
            }
            if(this.imageToCrop!=null)
            {
                this.imageSource = URL.createObjectURL(this.imageToCrop)
                setTimeout(() => {
                    this.setCropper()
                },500);
                setTimeout(() => {
                    if(this.cropper!=null)
                    {
                     this.canNotUpload=false
                    }
                }, 600);
            }
        },
        setCropper(){
            this.cropper = new cropper(this.$refs.image,{
                       zoomable:false,
                    scalable:false,
                    aspectRatio:1,
            })
        },
        cropAndPostImage(){
           let formData = new FormData();
            formData.append('product',this.$route.params.productId)
            formData.append('is_cover',true)
            this.cropper.getCroppedCanvas().toBlob((blob)=>{
                formData.append('image',blob,'image.png')
            })
            setTimeout(() => {
                var payload={
                    data:formData,
                    business:this.$route.params.businessId
                }
                this.uploadPicture(payload)
            }, 500);
        }
        
    },
   
}
</script>