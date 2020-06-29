const state = {
    snackBar: {
        open: false,
        color: 'success',
        timeout: 6000,
        y: 'bottom',
        text: "hello snack"
    }
}
const getters = {
    get_snack: (state) => state.snackBar
}
const actions = {
    notify({
        commit
    }, notification) {
        commit('set_snack', notification)
    }
}
const mutations = {
    set_snack: (state, data) => (state.snackBar.open = data.open, state.snackBar.color = data.color, state.snackBar.text = data.text, state.snackBar.y = data.y)
}
export default {state, getters, actions, mutations}
