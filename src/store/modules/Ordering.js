import axios from 'axios'
const state={
    order : null,
    cart:[],
    orders:[],
    orderProcessed:false
}
const getters={
    get_order_owner:(state)=>state.order,
    get_orders:(state)=>state.orders
}
const actions={
    //get orders for business
    async getOrders({commit},businessId){
        let response
        try{
            response= await axios.get('/business_api/orders-own/?businessId='+businessId)
        }catch
        {
            response=null
        }
        try{
            commit('set_orders',response.data)
            return await response;
        }
        catch(e){
            return response 
        }
    },
    //post order
    async postOrder({commit},order)
    {
       console.log(order)
       let response
        try {
             response = await axios.post('/business_api/order/',{
                country: "Botswana",
                first_name: order.name,
                last_name: order.surname,
                street_address: order.address,
                street_address2: order.address1!=''?order.address1:order.address,
                email_address: order.email,
                phone_number: order.phone,
                customer: order.owner!=''?order.owner:null,
                quantity: order.quantity,
                product: order.productId,
                business: order.businessId
        });
        } catch (error) {
             console.log(error.response)
        }    
        try {
            commit('set_order_processed',true)
            return await response;
       } catch (error) {
           console.log("error")
        }
    },

    setOrderOwner({commit},user){
        commit('set_order_owner',user);
    }
}
const mutations={
        set_order_owner:(state,user)=>(
        state.order.first_name=user.name,
        state.order.last_name = user.surname,
        state.order.street_address = user.address,
        state.order.street_address2 = user.address2,
        state.order.email_address=user.email,
        state.order.customer = user.id
),
    set_order_processed:(state,data)=>state.orderProcessed= data,
    set_orders:(state,data)=>state.orders = data
}
export default{
    state,
    getters,
    actions,
    mutations,
}