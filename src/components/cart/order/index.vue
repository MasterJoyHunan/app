<template>
    <transition name="cart-order">
        <div id="cart-order">
            <div class="main">
                <div class="address">
                    <div class="left">
                        <div class="name">
                            <span>收货人: {{address.name}}</span>
                            <span>{{address.tel}}</span>
                        </div>
                        <div class="address-detail">{{address.province}},{{address.city}},{{address.area}},{{address.address}}</div>
                    </div>
                    <div class="right"
                        @click="chooseAddress()">
                        <svg-icon icon-class="right2"
                            color="#fff"
                            size="30"></svg-icon>
                    </div>
                </div>
                <div class="bar"></div>
                <div class="product-list">
                    <plant v-for="(item, index) in pro"
                        :key="index"
                        back-color="#fff"
                        :img="getImg(item)">
                        <div class="text-content"
                            slot="content">
                            <div class="name">{{item.pro.title}}</div>
                            <div class="sku"
                                v-if="getSku(item)">属性: {{getSku(item)}}</div>
                            <div class="sku"
                                v-else>&nbsp;</div>
                            <div class="num">{{getPrice(item)}} x {{item.num}}</div>
                            <div class="item-total">小计: {{(getPrice(item) * item.num).toFixed(2)}}</div>
                        </div>
                    </plant>
                </div>
            </div>
            <div class="total">
                <div class="price">共计: ¥{{totalPay}}</div>
                <div class="submit"
                    @click="payFlag = true">付款</div>
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
import request from '@/components/common/js/request'
import plant from '@/components/common/base/plant'
import { payWayMixin } from '@/components/common/js/mixin'
import { mapActions, mapMutations } from 'vuex'
import { XDialog, Checklist } from 'vux'
export default {
    name: 'cart-order',
    mixins: [payWayMixin],
    data() {
        return {
            address: {},
            pro: [],
            __token__: ''
        }
    },
    created() {
        request({
            url: '/api/order/getChooseGoods',
            method: 'get'
        }).then(res => {
            [this.address, this.pro, this.__token__] = [res.data.address, res.data.goods, res.data.__token__]
        }).catch(err => {
            // 没有默认收货地址的情况下
            if (err.status == -1) {
                setTimeout(() => {
                    this.$router.push('/addAddress')
                }, 1000)
                return
            }
            this.$router.back()
        })
    },
    methods: {
        // 计算属性, 获取图片
        getImg(item) {
            return item.pro_sku != null ? item.pro_sku.img : item.pro.img
        },
        // 计算属性, 获取库存
        getStock(item) {
            return item.pro_sku != null ? item.pro_sku.stock : item.pro.stock
        },
        getPrice(item) {
            return item.pro_sku != null ? item.pro_sku.price : item.pro.price
        },
        // 计算属性, 获取属性
        getSku(item) {
            return item.pro_sku != null ? item.pro_sku.name : ''
        },
        // 选择收货地址
        chooseAddress() {
            this.$router.push('/address')
        },
        // 付款
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
                url: '/api/order/orderPay',
                method: 'post',
                data: { __token__: this.__token__, pay_way: this.checklist[0] }
            }).then(res => {
                this.initCart()
                this.setIndex(1)
                this.$router.replace('/order')
            }).catch(err => {
                if (err.status == 0) {
                    this.initCart()
                    this.setIndex(0)
                    this.$router.replace('/order')
                }
                console.log(err)
            })
        },
        ...mapActions(['initCart']),
        ...mapMutations({ setIndex: 'SET_ORDER_CURRENT_INDEX' })
    },
    computed: {
        totalPay() {
            let price = 0
            this.pro.map(item => {
                price += this.getPrice(item) * item.num
            })
            return price.toFixed(2)
        }
    },
    components: {
        plant,
        XDialog,
        Checklist,
    }
}
</script>

<style lang="less">
// 进入动画
.cart-order-enter-active {
    transition: all 0.3s;
}
.cart-order-enter {
    transform: translateX(100%);
}
// 离开动画
.cart-order-leave-active {
    transition: all 0.3s linear;
}
.cart-order-leave-to {
    transform: translateY(100%);
}
#cart-order {
    width: 100%;
    height: 100%;
    .main {
        width: 100%;
        height: 90%;
        overflow: scroll;
        .address {
            display: flex;
            justify-content: space-between;
            align-items: center;
            // margin: 0 10px;
            padding: 20px 10px;
            background-color: #f5f5f5;
            font-size: 15px;
            // border-radius: 5px;
            .left {
                flex-basis: 80%;
                .name {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .address-detail {
                    font-size: 12px;
                }
            }
            .right {
                flex-basis: 10%;
                height: 30px;
            }
        }
        .bar {
            height: 3px;
            // margin: 0 10px;
            background: url(./addressbar.png);
        }
        .product-list {
            padding: 0 10px;
            .text-content {
                position: absolute;
                display: flex;
                justify-content: center;
                flex-direction: column;
                align-items: center;
                width: 60%;
                top: 0;
                bottom: 0;
                right: 0;
                color: #000;
                font-size: 12px;
                .name {
                    font-size: 15px;
                    text-align: center;
                }
            }
        }
    }
    .total {
        height: 10%;
        font-size: 16px;
        font-weight: bold;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: linear-gradient(to right, #e9f6fe, #bbdefb);
        div {
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .price {
            flex-basis: 60%;
        }
        .submit {
            height: 80%;
            flex-basis: 40%;
            margin-right: 10px;
            border-radius: 5px;
            color: #fff;
            background: linear-gradient(to right, #ffcc80, #ff9800);
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

