import router from './router'
import store from './store'
import request from '@/components/common/js/request'

router.beforeEach((to, from, next) => {
    if (to.matched.length === 0) {
        next('/404')
    } else {
        if (Object.keys(store.state.user).length === 0) {
            request({
                url: '/shop/user/index'
            }).then(res => {
                if (res.status == 1) {
                    store.commit('SET_USER_INFO', res.data.user)
                }
            })
        }
        store.commit('SET_TITLE', to.meta.title)
        store.commit('SET_SHOW_BACK', to.meta.showBack)
        store.commit('SET_SHOW_MORE', to.meta.showMore)
        store.commit('SET_SHOW_TITLE', to.meta.showTitle)
        store.commit('SET_SHOW_BOTTOM', to.meta.showBottom)
        next()
    }
})