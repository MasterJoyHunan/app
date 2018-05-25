<template>
    <div id="cart">
        <swipeout>
            <swipeout-item transition-mode="follow"
                v-for="(item, index) in cart"
                :key="index">
                <div class="menu-container"
                    @click="handelDelete(item, index)"
                    slot="right-menu">
                    <swipeout-button class="delete-menu">
                        <svg-icon icon-class="delete"
                            color="#ccc"
                            size="26"></svg-icon>
                    </swipeout-button>
                </div>
                <div slot="content"
                    class="pro-container">
                    <check-icon :value="item.check"
                        @click.native="checked(item, index)"></check-icon>
                    <div class="item">
                        <plant :item="item"
                            :img="getImg(item)"
                            back-color="#fff"
                            @clickImg="gotoPro(item.pro_id)"
                            slot="content">
                            <div class="text-content"
                                slot="content">
                                <div class="content-box">
                                    <div class="title"
                                        @click="gotoPro(item.pro_id)">{{item.pro.title}}</div>
                                    <div v-if="getSku(item)"
                                        class="sku">规格: {{getSku(item)}}</div>
                                    <div v-else> &nbsp;</div>
                                    <div class="price">价格: ¥{{getPrice(item)}}</div>
                                    <number size="15"
                                        :min="1"
                                        :max="getStock(item)"
                                        :value="item.num"
                                        @add="add(item, index, 1)"
                                        @min="add(item, index, 0)"></number>
                                </div>
                            </div>
                        </plant>
                    </div>
                </div>
            </swipeout-item>
        </swipeout>
        <div class="settlement">
            <div class="choose-all">
                <check-icon :value="chooseAll"
                    @click.native="setAll()"></check-icon>全选</div>
            <div class="total">合计:
                <span>¥ {{totalPrice}}</span>
            </div>
            <div class="button-container"
                @click="pay()">结算</div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import { Swipeout, SwipeoutItem, SwipeoutButton, CheckIcon } from 'vux'
import number from '@/components/common/base/number'
import plant from '@/components/common/base/plant'
import request from '@/components/common/js/request'
export default {
    name: 'cart',
    data() {
        return {
            chooseAll: false,
            totalPrice: 0,
        }
    },
    created() {
        this.initAddress()
        if (this.cart.length == 0) {
            this.initCart()
        }
    },
    activated() {
        if (this.cart.length == 0) {
            this.chooseAll = false
            this.totalPrice = 0
        }
    },
    computed: {
        ...mapGetters(['cart'])
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
        // 跳转到商城
        gotoPro(id) {
            this.$router.push({ path: '/product', query: { id: id } })
        },
        // vuex 选择购物车
        checked(item, index) {
            this.setCartChecked({ index: index, flag: !item.check })
        },
        // 商品加减
        add(item, index, flag) {
            if (flag == 0 && item.num <= 1) {
                return
            } else if (flag == 1 && item.num >= this.getStock(item)) {
                return
            }

            this.cartChange({ cart_id: item.id, index, flag })
        },
        // 选择所有商品
        setAll() {
            this.cart.map((item, index) => {
                this.setCartChecked({ index: index, flag: !this.chooseAll })
            })
        },
        // 删除商品
        handelDelete(item, index) {
            const _this = this
            this.$vux.confirm.show({
                title: '警告',
                content: '确认删除',
                onConfirm() {
                    request({
                        url: '/api/cart/deleteCart',
                        method: 'post',
                        data: { cart_id: item.id }
                    }).then(res => {
                        _this.deleteCart(index)
                    }).catch(err => {
                        console.log(err)
                    })
                }
            })
        },
        // 结算
        pay() {
            const id = []
            if (this.cart.length > 0) {
                this.cart.map(item => {
                    if (item.check) {
                        id.push(item.id)
                    }
                })
            }
            if (id.length == 0) {
                return
            }
            request({
                url: '/api/order/cartSubmit',
                method: 'post',
                data: { id }
            }).then(res => {
                this.$router.push('/cartOrder')
            }).catch(err => {
                if (err.status == -1) {
                    setTimeout(() => {
                        this.$router.push('/addAddress')
                    }, 1000)
                }
            })
        },
        ...mapActions(['initCart', 'cartChange', 'initAddress']),
        ...mapMutations({
            setCartChecked: 'SET_CART_CHECKED',
            deleteCart: 'DELETE_CART'
        })
    },
    watch: {
        cart: {
            handler(newVal, oldVal) {
                let price = 0
                let chooseAll = true
                if (newVal.length == 0) {
                    return
                }
                for (const item of newVal) {
                    if (item.check === false) {
                        this.chooseAll = false
                        chooseAll = false
                        continue
                    }
                    price += this.getPrice(item) * item.num
                }
                this.totalPrice = price.toFixed(2)
                this.chooseAll = chooseAll
            },
            deep: true
        },
    },
    components: {
        Swipeout,
        SwipeoutItem,
        SwipeoutButton,
        CheckIcon,
        number,
        plant
    }
}
</script>

<style lang="less">
#cart {
    background-color: #fff;
    width: 100%;
    height: 100%;
    position: relative;
    .vux-swipeout {
        height: 90%;
        .pro-container {
            font-size: 15px;
            display: flex;
            justify-content: center;
            align-items: center;
            padding-right: 10px;
            .vux-check-icon {
                align-self: center;
                flex-basis: 10%;
            }
            .item {
                flex-basis: 90%;
                .mj-plant {
                    margin: 5px 0;
                }
                .text-content {
                    position: absolute;
                    font-size: 12px;
                    width: 60%;
                    top: 0;
                    bottom: 0;
                    right: 0;
                    color: #000;
                    .content-box {
                        padding-left: 10px;
                        height: 100%;
                        display: flex;
                        justify-content: center;
                        flex-direction: column;
                        align-items: flex-start;
                        div {
                            justify-content: center;
                            display: flex;
                            align-items: center;
                            overflow: hidden;
                        }
                        .title {
                            flex: 2;
                            margin-right: 10px;
                            line-height: 1em;
                            font-size: 15px;
                            text-align: center;
                            color: #000;
                        }
                        .sku {
                            flex: 1;
                        }
                        .price {
                            flex: 1;
                        }
                        .mj-number {
                            flex: 1;
                            align-self: flex-end;
                        }
                    }
                }
            }
        }
    }
    .menu-container {
        .delete-menu {
            background-color: #fff;
        }
    }
    .settlement {
        height: 10%;
        position: absolute;
        overflow-y: scroll;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: linear-gradient(to right, #80cbc4, #004d40);
        color: #fff;
        div {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 12px;
        }
        .choose-all {
            flex-basis: 20%;
        }
        .total {
            flex-basis: 40%;
        }
        .button-container {
            font-size: 15px;
            flex-basis: 40%;
            background: linear-gradient(to right, #ffcc80, #ff9800);
            height: 80%;
            margin: 5px;
            border-radius: 5px;
        }
    }
}
</style>
