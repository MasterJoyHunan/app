import * as types from "./mutation-types"
import request from "@/components/common/js/request"

export const reloadUser = ({ commit }) => {
    request({ url: "/shop/user/index" })
        .then(res => {
            commit(types.SET_USER_INFO, res.data.user)
        })
        .catch(err => {
            console.log(err)
        })
}

export const initCart = ({ commit }) => {
    request({ url: "/shop/cart/index" })
        .then(res => {
            commit(types.INIT_CART, res.data ? res.data : [])
        })
        .catch(err => {
            console.log(err)
        })
}

export const cartChange = ({ commit }, { cart_id, index, flag }) => {
    request({
        url: "/shop/cart/changeCartNumber",
        method: "post",
        data: {
            cart_id,
            type: flag
        }
    })
        .then(res => {
            commit(types.CHANGE_CART_NUMBER, { index, flag })
        })
        .catch(err => {
            console.log(err)
        })
}

export const initAddress = ({ commit }) => {
    request({
        url: "/shop/address/index",
        method: "get"
    })
        .then(res => {
            commit(types.SET_ADDRESS, res.data)
        })
        .catch(err => {
            console.log(err)
        })
}
