import Vue from "vue"
import Router from "vue-router"

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: "/",
            name: "index",
            component: () => import("@/components/index"),
            redirect: "/index",
            children: [
                {
                    path: "index",
                    name: "home",
                    component: () => import("@/components/index/index"),
                    meta: {
                        // title: "主页",
                        // showTitle: true,
                        showBottom: true,
                        keepAlive: true
                    }
                },
                {
                    path: "product",
                    name: "product",
                    component: () =>
                        import("@/components/index/ProductDetail/index")
                    // meta: {title: '商品详情', showTitle: true, showBack: true}
                },
                {
                    path: "cate",
                    name: "cate",
                    component: () => import("@/components/cate/index"),
                    meta: {
                        // title: "分类",
                        // showTitle: true,
                        showBottom: true,
                        keepAlive: true
                    }
                },
                {
                    path: "cart",
                    name: "cart",
                    component: () => import("@/components/cart/index"),
                    meta: {
                        // title: "购物车",
                        // showTitle: true,
                        showBottom: true,
                        keepAlive: true
                    }
                },
                {
                    path: "cartOrder",
                    name: "cartOrder",
                    component: () => import("@/components/cart/order/index"),
                    meta: {
                        title: "订单提交",
                        showTitle: true,
                        // showBottom: true,
                        showBack: true
                        // keepAlive: true
                    }
                },
                {
                    path: "member",
                    name: "member",
                    component: () => import("@/components/member/index"),
                    meta: {
                        // title: "个人中心",
                        // showTitle: true,
                        showBottom: true,
                        keepAlive: true
                    }
                },
                {
                    path: "order",
                    name: "order",
                    component: () => import("@/components/member/order/index"),
                    meta: {
                        title: "订单列表",
                        showTitle: true,
                        // showBottom: true,
                        // keepAlive: true
                    }
                },
                {
                    path: "address",
                    name: "address",
                    component: () =>
                        import("@/components/member/address/index"),
                    meta: {
                        title: "收货地址",
                        showTitle: true,
                        // showBottom: true,
                        showBack: true,
                        keepAlive: true
                    }
                },
                {
                    path: "addAddress",
                    name: "addAddress",
                    component: () =>
                        import("@/components/member/address/addAddress"),
                    meta: {
                        title: "编辑收货地址",
                        showTitle: true,
                        // showBottom: true,
                        showBack: true
                        // keepAlive: true
                    }
                },
                {
                    path: "setting",
                    name: "setting",
                    component: () =>
                        import("@/components/member/setting/index"),
                    meta: {
                        title: "设置",
                        showTitle: true,
                        // showBottom: true,
                        showBack: true
                        // keepAlive: true
                    }
                }
            ]
        },
        {
            path: "/login",
            name: "login",
            component: () => import("@/components/member/login/index")
        },
        {
            path: "/reg",
            name: "reg",
            component: () => import("@/components/member/reg/index")
        },
        {
            path: "/404",
            name: "page404",
            component: () => import("@/components/error")
        }
    ]
})
