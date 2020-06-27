import axios from "axios";

const state = {
    comments: [],
    comment_dialog: false,
    businessId: 0,
    comment: null,
    commentId: 0,

    rating: null,
    ratings: null,
    rating_dialog: false,
    rateId: 0
};
const getters = {
    get_comments: (state) => state.comments,
    get_rating_dialog: (state) => state.rating_dialog,
    get_ratings: (state) => state.ratings,
    get_comment_dialog: (state) => state.comment_dialog
};
const actions = {
    // _____________________________________comment functions______________________________________
    openCommentDialog({
        commit
    }, comment) {
        commit("set_businessId", comment.businessId);
        commit("set_commentId", comment.commentId);
        state.comment_dialog = ! state.comment_dialog;
    },

    async getComments({
        commit
    }, businessId) {
        const response = await axios.get("/business_api/business-comment/getBusinessComment/?businessId=" + businessId);
        try {
            if (response.status === 200) {
                commit("set_comments", response.data);
                return await response.data;
            } else {
                console.log(response.status);
            }
        } catch (e) {
            console.log(e.response);
        }
    },
    async postComment({
        commit
    }, comment) {
        let response;
        let url;
        let obj;
        if (state.commentId > 0) {
            url = "/business_api/replycomment-business/";
            obj = {
                comment: comment.comment,
                business_comment: state.commentId,
                user: comment.user,
                business: state.businessId
            };
        } else {
            url = "/business_api/business-comment/";
            obj = {
                comment: comment.comment,
                user: comment.user,
                business: state.businessId
            };
        }
        try {
            response = axios.post(url, obj);
        } catch (error) {
            console.log(error.response);
        }
        try {
            state.commentId = 0;
            commit("set_comment", response.data);
            return await response;
        } catch (error) {
            state.commentId = 0;
            console.log(error.response);
        }
    },

    // ________________________________________rating functions______________________________________
    openRatingDialog({
        commit
    }, id) {
        commit("set_rateId", id);
        state.rating_dialog = ! state.rating_dialog;
    },
    async postRating({
        commit
    }, comment) {
        let response;
        try {
            response = axios.post("/business_api/rate-business/", {
                comment: comment.comment,
                stars: comment.number_of_stars > 0 ? comment.number_of_stars : 0,
                user: comment.user,
                business: state.rateId
            });
        } catch (error) {
            console.log(error.response);
        }
        try {
            commit("set_rating", response.data);
            return await response;
        } catch (error) {
            console.log(error.response);
        }
    },

    async getRatings({
        commit
    }, businessId) {
        const response = await axios.get("/business_api/rate-business/getBusinessRating/?businessId=" + businessId);
        try {
            if (response.status === 200) {
                commit("set_ratings", response.data);
                return await response.data;
            } else {
                console.log(response.status);
            }
        } catch (e) {
            console.log(e.response);
        }
    }
};
const mutations = {
    set_rating: (state, data) => (state.rating = data),
    set_rateId: (state, data) => (state.rateId = data),
    set_ratings: (state, data) => (state.ratings = data),

    set_comments: (state, data) => (state.comments = data),
    set_businessId: (state, data) => (state.businessId = data),
    set_comment: (state, data) => (state.comment = data),
    set_commentId: (state, data) => (state.commentId = data)
};

export default {state, actions, getters, mutations};
