import axios from 'axios'

const state= {
    products:[]
}
const getters= {
    get_home_products:(state)=>state.products,
}
const actions= {
    async getHomeProducts({commit},getPage){
        let response
        try{
            response= await axios.get('/business_api/product/getHomeProducts/?page='+getPage.page+'&category='+getPage.category+'&pageLength='+getPage.pageSize)
        }catch
        {
            response=null
        }
        try{
            commit('set_home_product',response.data)
            return await response.data;
        }
        catch(e){
            return response 
        }
    },
}
const mutations= {
 set_home_product:(state,data)=>state.products=data
}

export default{
    state,
    getters,
    actions,
    mutations
}