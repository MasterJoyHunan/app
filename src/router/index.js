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
                        showBottom: true,
                        keepAlive: true
                    }
                },
                {
                    path: "product",
                    name: "product",
                    component: () =>
                        import("@/components/index/ProductDetail/index")
                },
                {
                    path: "cate",
                    name: "cate",
                    component: () => import("@/components/cate/index"),
                    meta: {
                        showBottom: true,
                        keepAlive: true
                    }
                },
                {
                    path: "cart",
                    name: "cart",
                    component: () => import("@/components/cart/index"),
                    meta: {
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
                        showBack: true
                    }
                },
                {
                    path: "member",
                    name: "member",
                    component: () => import("@/components/member/index"),
                    meta: {
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
                        showBack: true
                        // keepAlive: true,
                    }
                },
                {
                    path: "orderDetail",
                    name: "orderDetail",
                    component: () =>
                        import("@/components/member/order/orderDetail"),
                    meta: {
                        title: "订单详情",
                        showTitle: true,
                        showBack: true
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
                        showBack: true
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
                        showBack: true
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
