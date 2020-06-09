import axios from 'axios'
const state={
    products:[],
    product:{},
}
const getters={
    get_view_products:(state)=>state.products,
    get_view_product:(state)=>state.product
}
const actions={
    async getViewProducts({commit},page)
    {
        try {
            const response = await axios.get('/business_api/product/?page='+page.number+'&search='+page.search)
            if(response.status=="200")
            {
                commit('set_view_products',response.data)
            }
        } catch (error) {
            console.log(error.response)
        }
    },
    async getProductDetail({commit},productId)
    {
        try {
            const response = await axios.get('/business_api/product/'+productId)
            if(response.status=="200")
            {
                commit('set_view_product',response.data)
            }
        } catch (error) {
            console.log(error.response)
        }
    }
}
const mutations={
    set_view_products:(state,data)=>state.products=data,
    set_view_product:(state,data)=>state.product=data
}
export default{
    state,
    getters,
    actions,
    mutations,
}