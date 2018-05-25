<template>
    <transition name="order">
        <div id="order">
            <tab>
                <tab-item @on-item-click="setIndex(-1)"
                    :selected="order_current_index == -1">全部</tab-item>
                <tab-item @on-item-click="setIndex(0)"
                    :selected="order_current_index == 0">待付款</tab-item>
                <tab-item @on-item-click="setIndex(1)"
                    :selected="order_current_index == 1">待发货</tab-item>
                <tab-item @on-item-click="setIndex(2)"
                    :selected="order_current_index == 2">发货中</tab-item>
                <tab-item @on-item-click="setIndex(3)"
                    :selected="order_current_index == 3">完成</tab-item>
            </tab>
            <div class="order-list loading"
                v-if="showLoading">
                <div class="loading">
                    <spinner type="bubbles"
                        size="40px"></spinner>
                    <div class="text">加载中...</div>
                </div>
            </div>
            <div class="order-list"
                v-else>
                <div class="order-item"
                    v-for="(item, index) in showList"
                    :key="index">
                    <div class="header">
                        <div class="no">订单编号: {{item.no}}</div>
                        <div class="label">{{label(item.status)}}</div>
                    </div>
                    <div class="content"
                        v-for="(info, i) in item.info"
                        :key="i">
                        <div class="img">
                            <img :src="cdn + info.img">
                        </div>
                        <div class="text">
                            <div class="title">{{info.name}}</div>
                            <div class="sku"
                                v-if="info.name_ext">属性 : {{info.name_ext}}</div>
                            <div class="sku"
                                v-else>&nbsp;</div>
                        </div>
                        <div class="info">
                            <div class="price">{{info.price}}</div>
                            <div class="num">x {{info.num}}</div>
                        </div>
                    </div>
                    <div class="footer">
                        共 {{item.info.length}} 件商品&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;合计: ¥{{item.amount}}
                    </div>
                    <div class="action">
                        <div class="btn"
                            @click="handelGetdetail(item.id)">查看订单</div>
                        <div class="btn"
                            v-if="item.status == 0"
                            @click="handelCancel(item.id, item.index)">删除订单</div>
                        <div class="btn"
                            v-if="item.status == 0"
                            @click="handelBeforePay(item, item.index)">立即付款</div>
                        <div class="btn"
                            v-if="item.status == 2"
                            @click="handelGetOrder(item.id, item.index)">确认收货</div>
                    </div>
                </div>
            </div>
            <x-dialog v-model="payFlag"
                hide-on-blur>
                <div class="pay">
                    <checklist label-position="right"
                        required
                        :options="options"
                        :max="1"
                        v-model="checklist"></checklist>
                    <div class="btn"
                        @click="handelPay()">确定</div>
                </div>
            </x-dialog>
        </div>
    </transition>
</template>

<script>
import { Tab, TabItem, Spinner, XDialog, Checklist } from 'vux'
import { payWayMixin } from '@/components/common/js/mixin'
import request from '@/components/common/js/request'
import { mapGetters, mapMutations } from 'vuex'
export default {
    name: 'order',
    mixins: [payWayMixin],
    data() {
        return {
            showLoading: true,
            total: [],
            showList: [],
            cdn: process.env.CDN,
            currendIndex: -1,
            tempItem: {},
            tempIndex: 0,
        }
    },
    created() {
        this._getData()
    },
    methods: {
        itemChange(index) {
            if (index == -1) {
                this.showList = this.total
                return
            }
            this.showList = []
            this.total.map(item => {
                if (item.status == index) {
                    this.showList.push(item)
                }
            })
        },
        // 计算属性
        label(status) {
            const arr = { '-1': '取消订单', '0': '待付款', '1': '待发货', '2': '待收货', '3': '已完成' }
            return arr[status]
        },
        // 取消订单
        handelCancel(id, index) {
            const _this = this
            this.$vux.confirm.show({
                title: '警告',
                content: '确认取消订单',
                onConfirm() {
                    request({
                        url: '/api/order/cancelOrder',
                        method: 'post',
                        data: { id }
                    }).then(res => {
                        _this.total.splice(index, 1)
                    }).catch(err => {
                        console.log(err)
                    })
                }
            })
        },
        // 确认收货
        handelGetOrder(id, index) {
            const _this = this
            this.$vux.confirm.show({
                title: '确认收货',
                content: '是否确认收到货物',
                onConfirm() {
                    request({
                        url: '/api/order/getOrder',
                        method: 'post',
                        data: { id }
                    }).then(res => {
                        const info = _this.total[index]
                        info.status = 3
                        _this.$set(_this.total, index, info)
                    }).catch(err => {
                        console.log(err)
                    })
                }
            })
        },
        // 跳转到详情
        handelGetdetail(id) {
            this.$router.push('/orderDetail?id=' + id)
        },
        // 支付订单之前
        handelBeforePay(item, index) {
            this.payFlag = true
            this.tempItem = item
            this.tempIndex = index
        },
        // 支付订单
        handelPay() {
            this.payFlag = false
            if (this.checklist.length == 0) {
                return
            }
            if (this.checklist[0] == 2 || this.checklist[0] == 3) {
                this.$vux.toast.text('线上支付正在开发中')
                return
            }
            request({
                url: '/api/order/payOrder',
                method: 'post',
                data: { id: this.tempItem.id, pay_way: this.checklist[0] }
            }).then(res => {
                this.tempItem.status = 1
                this.$set(this.total, this.tempIndex, this.tempItem)
            }).catch(err => {
                console.log(err)
            })
        },
        // 获取用户数据
        _getData() {
            request({
                url: '/api/order/index',
            }).then(res => {
                this.showLoading = false
                if (res.data.length > 0) {
                    res.data.map((item, index) => {
                        item.index = index
                    })
                }
                this.total = res.data
                this.itemChange(this.order_current_index)
            }).catch(err => {
                console.log(err)
            })
        },
        ...mapMutations({ setIndex: 'SET_ORDER_CURRENT_INDEX' })
    },
    computed: {
        ...mapGetters(['order_current_index'])
    },
    watch: {
        total: {
            handler(newVal) {
                this.itemChange(this.order_current_index)
            },
            deep: true
        },
        order_current_index(newVal) {
            this.itemChange(newVal)
        },
    },

    components: {
        Tab,
        TabItem,
        Spinner,
        XDialog,
        Checklist
    }
}
</script>

<style lang="less">
// 进入动画
.order-enter-active {
    transition: all 0.3s;
}
.order-enter {
    transform: translateX(100%);
}
// 离开动画
.order-leave-active {
    transition: all 0.3s linear;
}
.order-leave-to {
    transform: translateY(100%);
}
#order {
    height: 100%;
    .order-list {
        height: ~"calc(100% - 44px)";
        overflow: scroll;
        font-size: 14px;
        padding: 0 10px;
        .order-item {
            border-bottom: 1px dashed #eee;
            .header {
                display: flex;
                margin: 8px 0;
                justify-content: space-between;
                align-content: center;
            }
            .content {
                display: flex;
                justify-content: space-between;
                align-items: center;
                .img {
                    width: 80px;
                    height: 80px;
                    margin: 5px 0;
                    background-color: #f5f5f5;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
                .text {
                    background-color: #f5f5f5;
                    flex: 1;
                    padding-left: 10px;
                    height: 80px;
                    display: flex;
                    justify-content: center;
                    align-items: flex-start;
                    flex-direction: column;
                }
                .info {
                    background-color: #f5f5f5;
                    width: 75px;
                    height: 80px;
                    padding-right: 5px;
                    display: flex;
                    justify-content: center;
                    align-items: flex-end;
                    flex-direction: column;
                }
            }
            .footer {
                display: flex;
                justify-content: flex-end;
                align-content: center;
                margin: 8px 0;
            }
            .action {
                margin: 8px 0;
                display: flex;
                justify-content: flex-end;
                align-items: center;
                .btn {
                    color: #fff;
                    background-color: #04be02;
                    // border-radius: 5px;
                    padding: 2px 10px;
                    margin: 0 5px;
                    &:last-child {
                        margin-right: 0;
                    }
                }
            }
        }
    }
    .pay {
        .weui-cell__bd {
            padding-left: 20px;
            text-align: left;
        }
        .btn {
            height: 45px;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #04be02;
            color: #fff;
            margin: 10px 30px;
            border-radius: 5px;
        }
    }
    .loading {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 12px;
    }
}
</style>
