import axios from 'axios'

const state={
            locations:[],
            productCategory:[],
            businessCategory:[],
            productCategorySearch:[],
            businessesSearch:[]
}
const getters={
    get_search_category:(state)=>state.productCategorySearch,
    get_locations:(state)=>state.locations,
    get_productCategory:(state)=>state.productCategory,
    get_businessCategory:(state)=>state.businessCategory,
    get_search_business:(state)=>state.businessesSearch
}
const actions={
    addToSearch({commit},category)
    {
        commit('set_search_category',category)
    },
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
    async getBusinessSearch({commit},search){
        let response
        try{
            response= await axios.get('/business_api/business/?search='+search)
        }catch
        {
            response=null
        }
        try{
            commit('set_search_business',response.data)
            return await response.data;
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
            return await response.data
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
            return await response.data;
        }
        catch(e){
            return response 
        }
    }
}
const mutations={
    set_locations:(state,data)=>(state.locations=data),
    set_productCategory:(state,data)=>(state.productCategory=data),
    set_businessCategory:(state,data)=>(state.businessCategory=data),
    set_search_category:(state,data)=>{
        if(data.selected){
            state.productCategorySearch.push(data)
        }
        else{
            state.productCategorySearch.splice(state.productCategorySearch.indexOf(data),1 )
        }
        
    },
    set_search_business:(state,data)=>state.businessesSearch=data
}
export default{
    state,
    getters,
    actions,
    mutations
};