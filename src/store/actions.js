import * as types from './mutation-types'
import request from '@/components/common/js/request'

export const reloadUser = ({commit})=>{
    request({url: '/api/user/index'}).then(res=>{
        commit(types.SET_USER_INFO, res.data.user)
    })
}

export const initCart = ({commit})=>{
    request({url: '/api/cart/index'}).then(res=>{
        commit(types.INIT_CART, res.data ? res.data : [])
    })
}

export const cartChange = ({commit}, {cart_id, index, flag})=>{
    request({
        url: '/api/cart/changeCartNumber',
        method: 'post',
        data: {
            cart_id, type: flag
        }
    }).then(res=>{
        commit(types.CHANGE_CART_NUMBER, {index, flag})
    }).catch(err => {
        console.log(err)
    })
}