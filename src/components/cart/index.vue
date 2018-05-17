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
                            color="red"
                            size="26"></svg-icon>
                    </swipeout-button>
                </div>
                <div class="content"
                    slot="content">
                    <check-icon :value.sync="item.check"></check-icon>
                    <div class="img"
                        :style="{backgroundImage: `url(${getImg(item)})`}">
                    </div>
                    <div class="text-content">
                        <p class="title"
                            @click="gotoPro(item.id)">{{item.pro.title}}</p>
                        <p v-if="getSku(item)"
                            class="sku">规格: {{getSku(item)}}</p>
                        <p v-else> &nbsp;</p>
                        <p class="price">价格:
                            <span>¥{{getPrice(item)}}</span>
                            <number size="15"></number>
                        </p>

                    </div>
                </div>
            </swipeout-item>
        </swipeout>
        <div class="settlement">
            <div class="choose-all">全选</div>
            <div class="total">合计:
                <span>99999.99</span>
            </div>
            <div class="button-container">
                <div class="button delete">删除</div>
                <div class="button submit">结算</div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { Swipeout, SwipeoutItem, SwipeoutButton, CheckIcon } from 'vux'
import number from '@/components/common/base/number'
export default {
    name: 'cart',
    data() {
        return {
            a: 1,
            cdn: process.env.CDN
        }
    },
    created() {
        if (this.cart.length == 0) {
            this.initCart()
        }
        console.log(this.cart.length)
    },
    computed: {
        ...mapGetters(['cart'])
    },
    methods: {
        getImg(item) {
            return (item.pro_sku != null ? this.cdn + item.pro_sku.img : this.cdn + item.img).replace(/\\/g, "/")
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
        ...mapActions(['initCart']),
    },
    components: {
        Swipeout,
        SwipeoutItem,
        SwipeoutButton,
        CheckIcon,
        number
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
        .content {
            font-size: 15px;
            display: flex;
            justify-content: center;
            align-items: center;
            .vux-check-icon {
                flex-basis: 10%;
            }
            .img {
                margin: 5px;
                flex-basis: 30%;
                padding-bottom: 30%;
                background-size: 100% 100%;
                background-color: #fff;
                border-radius: 5px;
                box-shadow: 0 0 3px #000;
            }
            .text-content {
                flex-basis: 60%;
                display: flex;
                font-size: 12px;
                justify-content: center;
                flex-direction: column;
                align-items: flex-start;
                p {
                    flex: 1;
                }
                .title {
                    font-size: 15px;
                    color: #000;
                }
                .vux-inline-x-number {
                    align-self: flex-end;
                    margin-right: 15px;
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
        background-color: #000;
        color: #fff;
        div {
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .choose-all {
            width: 25%;
        }
        .button-container {
            width: 40%;
            .button {
                width: 50%;
            }
            .delete {
                background-color: #ccc;
            }
            .submit {
                background-color: #345ff1;
            }
        }
    }
}
</style>
