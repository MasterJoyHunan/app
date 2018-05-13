import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
import '@/components/common/icon' // icon
import './permission'

fastclick.attach(document.body)

import  { ConfirmPlugin, ToastPlugin, AlertPlugin } from 'vux'
Vue.use(ConfirmPlugin)
Vue.use(ToastPlugin)
Vue.use(AlertPlugin)

import 'vux/src/styles/reset.less'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})
