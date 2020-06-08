import axios from 'axios'
import router from '../../router'
const state = {

            products :[],
            product : {
                other_properties: [],
                product_images:[],
                name: '',
                description:'' ,
                price: null,
                quantity: null,
                product_new: false,
                product_available: false,
                price_neg: false,
                product_category: null,
                business: null,
                id:null
            }
}
const getters = {
    get_product:(state)=>state.product,
    get_products:(state)=>state.products
}
const actions = {
    async getProductById({commit},productId)
    {
        let response
        try{
            response = await axios.get('/business_api/product/'+productId+'/')
            if(response.status=="200"){
                commit('set_product',response.data)
                return await response.data;
            }
        }catch(error)
        {
            console.log(error.response)
        }
    },

    async postProduct({commit},data){
        let response
        try {
             response = await axios.post('/business_api/product/',{
            other_properties:data.other_properties,
            name: data.name,
            description: data.description,
            price: data.price,
            quantity: data.quantity,
            product_new: data.product_new,
            product_available: data.product_available,
            price_neg: data.price_neg,
            product_category: data.product_category,
            business: data.business
        });
        } catch (error) {
             console.log(error.response)
        }
         
        try {
            if(response.status=="201"){
                commit('set_product',response.data)
                router.push({name:'coverPhoto', params:{productId:response.data.id,businessId:response.data.business}})
          }
       } catch (error) {
           console.log("error")
        }
    },
    //updating the product
    async updateProduct({commit},data){   

        let response
        try {
             response = await axios.put('/business_api/product/'+data.id+'/',{
            id:data.id,
            other_properties:data.other_properties,
            name: data.name,
            description: data.description,
            price: data.price,
            quantity: data.quantity,
            product_new: data.product_new,
            product_available: data.product_available,
            price_neg: data.price_neg,
            product_category: data.product_category,
            business: data.business
        });
        } catch (error) {
             console.log(error.response)
        }
         
        try {
            if(response.status=="200"){
                commit('set_product',null)
                router.push({name:'own-product-list', params:{businessId:response.data.business}})
          }
       } catch (error) {
           console.log("error")
        }
    },

    //get business product
    async getBusinessProduct({commit},businessId){
        let response =  await axios.get('/business_api/products-own/?businessId='+businessId);
        try {
            if(response.status=="200")
            {
                commit('set_products',response.data)
               // router.push({name:'own-product-list', params:{businessId:response.data.businessId}})
            }
        } catch (error) {
            console.log(error.response)
        }
    },
    //get product for edit
    async getProductToEdit({commit},productId){
        let response 
        try{

         response =  await axios.get('/business_api/product/'+productId);
            if(response.status=="200")
            {
              commit('set_product',response.data)
              return await response;
            } 
        }
        catch(errors)
        {
            console.log(errors.response)
            router.push('/business/my-business/')
        }}
}
const mutations = {
    set_product:(state,data)=>state.product=data,
    set_products:(state,data)=>state.products= data,
    set_is_editing:(state,data)=>state.productOnEdit=data,
}
export default{
    state,
    getters,
    actions,
    mutations,
}