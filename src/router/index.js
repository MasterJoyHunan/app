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
                    meta: {title: '主页', showMore: true, showTitle: true, showBottom: true}
                },
                {
                    path: 'cate',
                    name: 'cate',
                    component: () => import('@/components/cate/index'),
                    meta: {title: '分类', showMore: true, showTitle: true, showBottom: true}
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
