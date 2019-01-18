import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const state = {
    vuexTest:0
}

const getters = {
    isVuexTest: state => {
        return state.vuexTest
    }
}

const mutations = {
    increment (state,payload) {
        state.vuexTest += payload.amount
    },
    clearVuexTest () {
        state.vuexTest = 0
    }
}

const actions = {
    addIncrement ({commit}, payload) {
        commit({
            type:'increment',
            amount:payload.amount
        })
    }
}

const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})

export default store
