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
                    meta: {title: '主页', showBack: true, showMore: true, showTitle: true, showBottom: true}
                },
                {
                    path: 'map',
                    name: 'map',
                    component: () => import('@/components/map/map'),
                    meta: {title: '地图', showBack: true, showMore: false, showTitle: true, showBottom: false}
                },
            ],
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/components/index/index'),
        },
        {
            path: '/404',
            name: 'page404',
            component: () => import('@/components/error'),
        },
    ],
})
