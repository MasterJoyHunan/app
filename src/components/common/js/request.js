import axios from "axios"
import vue from "vue"
import router from "@/router"

// 创建axios实例
const service = axios.create({
    baseURL: process.env.BASE_API, // api的base_url
    timeout: 15000 // 请求超时时间
})

// respone拦截器
service.interceptors.response.use(
    response => {
        const res = response.data
        if (res.status == 404 || res.status == 304) {
            //被挤掉线
            // vue.$vux.toast.show({
            //     text: res.msg,
            //     type: 'warn',
            //     width: '80%'
            // })
            // 判断是否在是登录和注册页面
            if (
                location.href.indexOf("/login") === -1 &&
                location.href.indexOf("/reg") === -1
            ) {
                router.push({ path: "/login" })
            }
        }
        if (res.status == 500) {
            //服务器维护
            vue.$vux.toast.show({
                text: res.msg,
                type: "warn",
                width: "80%"
            })
            router.push({ path: "/login" })
        }
        if (res.status !== 1) {
            if (res.msg !== '') {
                vue.$vux.toast.text(res.msg)
            }
            return Promise.reject(response.data)
        }
        return response.data
    },
    error => {
        console.log("err" + error) // for debug
        return Promise.reject(error)
    }
)

export default service
