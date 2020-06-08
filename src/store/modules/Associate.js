import axios from 'axios'

const state={
            locations:[],
            productCategory:[],
            businessCategory:[],
}
const getters={
    get_locations:(state)=>state.locations,
    get_productCategory:(state)=>state.productCategory,
    get_businessCategory:(state)=>state.businessCategory
}
const actions={
    async getLocations({commit}){
        let response
        try{
            response= await axios.get('/business_api/location/')
        }catch
        {
            response=null
        }
        try{
            commit('set_locations',response.data)
        }
        catch(e){
            return response 
        }
    },
    async getBusinessCategory({commit}){
        let response
        try{
            response= await axios.get('/business_api/business-category/')
        }catch
        {
            response=null
        }
        try{
            commit('set_businessCategory',response.data)
        }
        catch(e){
            return response 
        }
    },
    async getProductCategory({commit}){
        let response
        try{
            response= await axios.get('/business_api/product-category/')
        }catch
        {
            response=null
        }
        try{
            commit('set_productCategory',response.data)
        }
        catch(e){
            return response 
        }
    }
}
const mutations={
    set_locations:(state,data)=>(state.locations=data),
    set_productCategory:(state,data)=>(state.productCategory=data),
    set_businessCategory:(state,data)=>(state.businessCategory=data)
}
export default{
    state,
    getters,
    actions,
    mutations
};