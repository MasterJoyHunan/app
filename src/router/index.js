import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'index',
            component: () => import('@/components/index'),
            redirect: '/index',
            children: [
                {
                    path: 'index',
                    name: 'home',
                    component: () => import('@/components/index/index'),
                    meta: {title: '主页', showTitle: true, showBottom: true, keepAlive: true }
                },
                {
                    path: 'product',
                    name: 'product',
                    component: () => import('@/components/index/ProductDetail/index'),
                    // meta: {title: '商品详情', showTitle: true, showBack: true}
                },
                {
                    path: 'cate',
                    name: 'cate',
                    component: () => import('@/components/cate/index'),
                    meta: {title: '分类', showTitle: true, showBottom: true, keepAlive: true }
                },
            ],
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/components/member/login/index'),
        },
        {
            path: '/reg',
            name: 'reg',
            component: () => import('@/components/member/reg/index'),
        },
        {
            path: '/404',
            name: 'page404',
            component: () => import('@/components/error'),
        },
    ],
})
