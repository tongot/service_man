import axios from 'axios'

const state = {
    rating : null
}
const getters = {

}
const actions = {
    async postRating({commit},comment)
    {
        console.log(comment)
        let response
        try {
             response=  axios.post('/business_api/rate-business/',{
            comment: comment.comment,
            stars: comment.number_of_stars>0?comment.number_of_stars:0,
            user: comment.user,
            business: comment.businessId
        });
        } catch (error) {
            console.log(error.response)
        }
     
        try {
            commit('set_rating',response.data)
            return await response;
        } catch (error) {
            console.log(error.response)
        }
    }
}
const mutations = {
    set_rating:(state,data)=>(state.rating= data)
}

export default{
    state,
    actions,
    getters,
    mutations
}