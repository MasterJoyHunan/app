<template>
    <div id="order-detail">
        <div class="order-status">
            <div class="status">{{label(order.status)}}</div>
            <div class="btn-container">
                <div class="btn"
                    v-if="order.status == 0"
                    @click="handelCancel(order.id, index)">删除订单</div>
                <div class="btn"
                    v-if="order.status == 0"
                    @click="payFlag = true">立即付款</div>
                <div class="btn"
                    v-if="order.status == 2"
                    @click="handelGetOrder(order.id)">确认收货</div>
            </div>
        </div>
        <div class="address">
            <div class="name">
                <div>收件人: {{order.post_name}}</div>
                <div>TEL: {{order.post_tel}}</div>
            </div>
            <div class="address-detail">
                <div class="">{{order.post_address}}</div>
            </div>
        </div>
        <div class="order">
            <div class="header">
                <div class="no">订单编号: {{order.no}}</div>
                <div class="label">{{label(order.status)}}</div>
            </div>
            <div class="content"
                v-for="(info, i) in order.info"
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
                共 {{order.info.length}} 件商品&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;合计: ¥{{order.amount}}
            </div>
            <div class="action">
            </div>
        </div>
        <div class="other-info">
            <div class="flex-between"
                v-if="order.status >= 1">
                <span>支付方式: </span>
                <span>{{payWay[order.pay_way]}}</span>
            </div>
            <div class="flex-between">
                <span>下单时间: </span>
                <span>{{order.add_date}}</span>
            </div>
            <div class="flex-between"
                v-if="order.status >= 1">
                <span>支付时间: </span>
                <span>{{order.pay_date}}</span>
            </div>
            <div class="flex-between"
                v-if="order.status >= 2">
                <span>发货时间: </span>
                <span>{{order.send_date}}</span>
            </div>
            <div class="flex-between"
                v-if="order.status >= 3">
                <span>收货时间: </span>
                <span>{{order.get_date}}</span>
            </div>
            <!-- <div>优惠金额: </div> -->
        </div>

        <div class="express"
            v-if="order.status >= 2">
            <div class="flex-between">
                <span>快递公司: </span>
                <span>{{order.express}}</span>
            </div>
            <div class="flex-between">
                <span>快递单号:
                    <span style="font-size: 12px;">(点击单号查看物流)</span>
                </span>
                <span class="express-no">{{order.express_no}}</span>
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
</template>

<script>
import request from '@/components/common/js/request'
import { payWayMixin } from '@/components/common/js/mixin'
import { XDialog, Checklist } from 'vux'
export default {
    name: 'order-detail',
    mixins: [payWayMixin],
    data() {
        return {
            cdn: process.env.CDN,
            order: {
                info: []
            },
            payWay: { 1: '内置支付', 2: '线上支付' },
            payFlag: false
        }
    },
    created() {
        this._getData()
    },
    methods: {
        // 计算属性
        label(status) {
            const arr = { '-1': '取消订单', '0': '待付款', '1': '待发货', '2': '待收货', '3': '已完成' }
            return arr[status]
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
                data: { id: this.order.id, pay_way: this.checklist[0] }
            }).then(res => {
                this.order.status = 1
            }).catch(err => {
                console.log(err)
            })
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
        // 获取订单数据
        _getData() {
            request({
                url: '/api/order/getOrderDetail',
                params: { id: this.$route.query.id }
            }).then(res => {
                this.order = res.data
            }).catch(err => {
                setTimeout(() => {
                    this.$router.back()
                }, 1000)
            })
        }
    },
    components: {
        XDialog,
        Checklist
    }
}
</script>

<style lang="less">
#order-detail {
    font-size: 14px;
    padding: 0 10px 10px 10px;
    min-height: "~calc(100% - 20px)";
    .flex-between {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border: 1px dashed #ccc;
        border-top: none;
        padding: 10px 5px;
        line-height: 1em;
        background-color: #f5f5f5;
        &:first-child {
            border-top: 1px dashed #ccc;
        }
    }
    // background: linear-gradient(to left bottom, #e9f6fe, #bbdefb);
    .order-status {
        height: 80px;
        margin-bottom: 5px;
        padding: 5px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        // background: linear-gradient(to left bottom, #e9f6fe, #bbdefb);
        background-color: #64bb72;
        color: #fff;
        .status {
            margin-left: 20px;
            font-size: 20px;
        }
        .btn-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .btn {
                border: 1px solid #fff;
                padding: 5px 10px;
                margin-right: 10px;
            }
        }
    }
    .address {
        padding: 10px 5px;
        border-top: 1px solid #f5f5f5;
        border-bottom: 1px solid #f5f5f5;
        .name {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }
    .order {
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
    .express {
        margin-top: 20px;
        .express-no {
            color: blue;
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
}
</style>
