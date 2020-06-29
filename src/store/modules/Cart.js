const state = {
    cartItems: {
        businessId: 0,
        items: [],
        totalPrice: 0
    }
}
const getters = {
    get_cart_items: (state) => state.cartItems
}
const actions = {

    removeFromCart({
        commit
    }, index) {
        let cart = JSON.parse(localStorage.getItem("cart"))
        cart.totalPrice -= cart.items[index].price
        cart.items.splice(index, 1)
        commit("remove_item", cart)
        localStorage.setItem('cart', JSON.stringify(cart))
    },
    resetCart({commit}) {
        commit('reset_cart')
        localStorage.removeItem("cart")
    },
    setCart({commit}) {
        let cart = localStorage.getItem("cart")
        if (cart != null) {
            cart = JSON.parse(cart)
            commit('set_cart_item', cart)
        }
    },
    addToCart({
        commit
    }, item) {
        let cart = localStorage.getItem("cart")
        if (cart != null) {
            cart = JSON.parse(cart)
            if (item.businessId == cart.businessId) {
                cart.totalPrice += parseInt(item.item.price)
                cart.items.push(item.item)
            } else {
                cart.businessId = item.businessId;
                cart.items = []
                cart.totalPrice = parseInt(item.item.price)
                cart.items.push(item.item)
            }
            commit('set_cart_item', cart)
            localStorage.setItem('cart', JSON.stringify(cart))
        } else {
            let cartItem = {}
            cartItem.businessId = item.businessId;
            cartItem.totalPrice = parseInt(item.item.price)
            cartItem.items = []
            cartItem.items.push(item.item)
            cart = cartItem
            commit('set_cart_item', cart)
            localStorage.setItem('cart', JSON.stringify(cart))
        }
    }

}
const mutations = {
    set_cart_item: (state, data) => state.cartItems = data,
    reset_cart: (state) => {
        state.cartItems.businessId = 0,
        state.cartItems.items = []
    },
    remove_item: (state, data) => {
        state.cartItems = data
    }

}
export default {state, getters, actions, mutations}
