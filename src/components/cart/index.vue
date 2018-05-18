<template>
    <div id="cart">
        <swipeout>
            <swipeout-item transition-mode="follow"
                v-for="(item, index) in cart"
                :key="index">
                <div class="menu-container"
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
                            slot="content">
                            <div class="text-content"
                                slot="content">
                                <div class="content-box">
                                    <div class="title"
                                        @click="gotoPro(item.id)">{{item.pro.title}}</div>
                                    <div v-if="getSku(item)"
                                        class="sku">规格: {{getSku(item)}}</div>
                                    <div v-else> &nbsp;</div>
                                    <div class="price">价格: ¥{{getPrice(item)}}</div>
                                    <number size="15"
                                        @add="add(item, 1)"
                                        @min="add(item, 0)"></number>
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
                <span>¥ 99999.99</span>
            </div>
            <div class="button-container">结算</div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import { Swipeout, SwipeoutItem, SwipeoutButton, CheckIcon } from 'vux'
import number from '@/components/common/base/number'
import plant from '@/components/common/base/plant'
export default {
    name: 'cart',
    data() {
        return {
            chooseAll: false,
        }
    },
    created() {
        if (this.cart.length == 0) {
            this.initCart()
        }
    },
    computed: {
        ...mapGetters(['cart'])
    },
    methods: {
        getImg(item) {
            return item.pro_sku != null ? item.pro_sku.img : item.img
        },
        getPrice(item) {
            return item.pro_sku != null ? item.pro_sku.price : item.price
        },
        getSku(item) {
            return item.pro_sku != null ? item.pro_sku.name : ''
        },
        gotoPro(id) {
            this.$router.push({ path: '/product', query: { id: id } })
        },
        checked(item, index) {
            this.setCartChecked({ index: index, flag: !item.check })
            for (const item of this.cart) {
                if (item.check === false) {
                    this.chooseAll = false
                    return
                }
            }
            this.chooseAll = true
        },
        add(item, flag) {
            console.log(item)
            console.log(flag)
        },
        setAll() {
            this.cart.map((item, index) => {
                this.setCartChecked({ index: index, flag: !this.chooseAll })
            })
        },
        ...mapActions(['initCart']),
        ...mapMutations({
            setCartChecked: 'SET_CART_CHECKED'
        })
    },
    watch: {
        cart: {
            handler(newVal, oldVal) {
                for (const item of newVal) {
                    if (item.check === false) {
                        this.chooseAll = false
                        return
                    }
                }
                this.chooseAll = true
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
        overflow: scroll;
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
