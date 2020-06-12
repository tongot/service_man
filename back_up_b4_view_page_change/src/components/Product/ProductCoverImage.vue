<template>
    <v-card>
        <pictureCropper/>
    </v-card>
</template>
<script>
import pictureCropper from '../sizedPicture'
export default {
    components:{
        'pictureCropper':pictureCropper
    },
}
</script>