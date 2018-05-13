import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'
import state from './state'
import createLog from 'vuex/dist/logger'
Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    state,
    actions,
    mutations,
    getters,
    strict: debug,
    plugins: debug ? [createLog()] : []
})