import axios from 'axios'
import router from '../../router'
const state={
    isOnEditing:false,
    uploaded :null
}
const getters={
 get_upload:(state)=>state.uploaded,
 
}
const actions={
    setIsEditing({commit},data)
    {
        commit('set_is_editing',data);
    },
    async uploadPicture({commit},payload){
        let data =payload.data

        let response
        try {
            response = await axios.post('/business_api/product_cover/',data)
        } catch (error)
        {
            console.log(error.response);
        }
        try {
            if(response.status=="201"){
                commit('set_upload',response.data)
                if(state.isOnEditing)
                {
                    router.push({name:'own-product-list',params:{businessId:payload.business}})
                }else{
                    router.push({name:'pictures',params:{productId:response.data.product, businessId:payload.business}})
                }

            }
            
        } catch (error) {
            console.log(error)
        }
    }
}
const mutations={
    set_upload:(state,data)=>state.uploaded=data,
    set_is_editing:(state,data)=>state.isOnEditing=data
}
export default{
    state,
    getters,
    mutations,
    actions
}