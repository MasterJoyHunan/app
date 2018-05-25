import * as types from "./mutation-types"
import vue from "vue"
const mutations = {
    // 头部导航 and 底部按钮 相关
    [types.SET_TITLE](state, title) {
        state.title = title
    },
    [types.SET_SHOW_BACK](state, flag) {
        state.showBack = flag
    },
    [types.SET_SHOW_TITLE](state, flag) {
        state.showTitle = flag
    },
    [types.SET_SHOW_MORE](state, flag) {
        state.showMore = flag
    },
    [types.SET_USER_INFO](state, user) {
        state.user = user
    },
    [types.SET_SHOW_BOTTOM](state, flag) {
        state.showBottom = flag
    },

    // 购物车相关
    [types.INIT_CART](state, cart) {
        cart.map(item => {
            item.check = false
        })
        state.cart = cart
    },
    [types.JOIN_TO_CART](state, pro) {
        state.cart.push(pro)
    },
    [types.DROP_TO_CART](state, index) {
        state.cart.splice(index, 1)
    },
    [types.CLEAR_CART](state) {
        state.cart = []
    },
    [types.SET_CART_CHECKED](state, { index, flag }) {
        state.cart[index].check = flag
    },
    [types.CHANGE_CART_NUMBER](state, { index, flag }) {
        flag === 0 ? state.cart[index].num-- : state.cart[index].num++
    },
    [types.DELETE_CART](state, index) {
        state.cart.splice(index, 1)
    },

    // 收货地址相关
    [types.SET_ADDRESS](state, addressList) {
        state.addressList = addressList
    },
    [types.ADD_NEW_ADDRESS](state, address) {
        if (state.addressList.length > 0) {
            state.addressList.map(item => {
                return (item.is_default = 0)
            })
        }
        address.is_default = 1
        state.addressList.push(address)
    },
    [types.DELETE_ADDRESS](state, index) {
        state.addressList.splice(index, 1)
    },
    [types.SET_ADDRESS_DEFAULT](state, index) {
        if (state.addressList.length > 0) {
            state.addressList.map((item, i) => {
                if (i == index) {
                    item.is_default = 1
                } else {
                    item.is_default = 0
                }
            })
        }
    },
    [types.EDIT_ADDRESS](state, { address, index }) {
        vue.set(state.addressList, index, address)
    },

    // 订单相关
    [types.SET_ORDER_CURRENT_INDEX](state, index) {
        state.order_current_index = index
    },

    // 退出登录.初始化
    [types.LOGOUT](state) {
        state.user = {} //用户信息
        state.cart = []
        state.addressList = [] // 用户地址信息
    }
}

export default mutations
