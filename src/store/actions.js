import * as types from './mutation-types'
import request from '@/components/common/js/request'

export const reloadUser = ({commit})=>{
    request({url: '/api/user/index'}).then(res=>{
        commit(types.SET_USER_INFO, res.data.user)
    })
}

export const initCart = ({commit})=>{
    request({url: '/api/cart/index'}).then(res=>{
        commit(types.INIT_CART, res.data)
    })
}