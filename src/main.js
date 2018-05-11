import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
import BaiduMap from 'vue-baidu-map'
import '@/components/common/icon' // icon
import './permission'

fastclick.attach(document.body)

import  { ConfirmPlugin } from 'vux'
Vue.use(ConfirmPlugin)

Vue.use(BaiduMap, {
    ak: 'DGDperaGV8p6ZjIEG1x6w9MjgplT7KHT'
})
import 'vux/src/styles/reset.less'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})
