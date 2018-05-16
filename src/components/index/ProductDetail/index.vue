<template>
    <div id="detail">
        <div class="info">
            <p class="title">{{product.title}}</p>
            <p class="price">¥{{product.price}}
                <span>¥{{product.market_price}}</span>
            </p>
        </div>
        <swiper loop
            auto
            dots-position="center"
            :show-dots="banner.length > 1 ? true : false"
            :show-desc-mask="false"
            class="swiper"
            height="padding-bottom: 40%">
            <swiper-item class="swiper-img"
                v-for="(item, index) in banner"
                :key="index">
                <img :src="item">
            </swiper-item>
        </swiper>
        <div class="divider">商品详情</div>
        <div class="description"
            v-html="product.desc"></div>
        <div class="choose-sku-masker"
            v-show="buyPlant">
            <div class="plant"
                ref="plant">
                <div class="close"
                    @click="close()">
                    <svg-icon icon-class="close"
                        size="30"></svg-icon>
                </div>
                <div class="top vux-1px-b">
                    <div class="img"></div>
                    <div class="content">
                        <p class="price">¥ {{price}}</p>
                        <p class="stock">库存 {{stock}} 件</p>
                        <p class="sales">销量 {{sales}} 件</p>
                    </div>
                </div>
                <div class="body"
                    ref="body">
                    <div class="sku vux-1px-b"
                        v-show="sku1.length > 0">
                        <checker v-model="chooseSku1"
                            type="radio"
                            default-item-class="sku-item"
                            selected-item-class="sku-item-selected">
                            <checker-item :value="item"
                                v-for="(item, index) in sku1"
                                :key="index">{{item.name}}</checker-item>
                        </checker>
                    </div>
                    <div class="sku vux-1px-b"
                        v-show="sku2.length > 0">
                        <checker v-model="chooseSku2"
                            type="radio"
                            default-item-class="sku-item"
                            selected-item-class="sku-item-selected">
                            <checker-item :value="item"
                                v-for="(item, index) in sku2"
                                :key="index">{{item.name}}</checker-item>
                        </checker>
                    </div>
                    <div class="buy-num">
                        <p>购买数量</p>
                        <inline-x-number button-style="round"
                            :min="1"
                            v-model="buyNum"></inline-x-number>
                    </div>
                </div>
                <div class="button">确定</div>
            </div>
        </div>
        <div class="bottom">
            <div class="cart"
                @click="gotoCart()">
                <svg-icon icon-class="cart2"
                    color="52b983"
                    size="40"></svg-icon>
                <badge class="badge"
                    text="99"></badge>
            </div>
            <div class="buy">
                <div class="put-cart"
                    @click="putCart()">加入购物车</div>
                <div class="buy-now"
                    @click="buyNow()">立即购买</div>
            </div>
        </div>
    </div>
</template>

<script>
import { Swiper, SwiperItem, Rater, Badge, InlineXNumber, Checker, CheckerItem } from 'vux'
import request from '@/components/common/js/request'
import { trueImgUrl } from '@/components/common/js/public'
const cdn = process.env.CDN
export default {
    name: 'detail',
    data() {
        return {
            product: {},
            banner: [],
            buyPlant: false,
            buyNum: 1,
            sku1: [],
            sku2: [],
            chooseSku1: [],
            chooseSku2: [],
            price: 0,
            stock: 0,
            sales: 0,
        }
    },
    created() {
        this._getData()
    },
    mounted() {
    },
    methods: {
        trueImgUrl(url) {
            return cdn + trueImgUrl(url)
        },
        gotoCart() {
            this.$router.push('/cart')
        },
        putCart() {
            this.buyPlant = true
            console.log('put')
        },
        buyNow() {
            this.buyPlant = true
            console.log('buy')
        },
        close() {
            this.buyPlant = false
        },
        _getData() {
            request({
                url: '/api/shop/getProductDetail',
                methods: 'get',
                params: { id: this.$route.query.id }
            }).then(res => {
                this.product = res.data
                const arr = this.product.imgs.split('|')
                arr.map(item => {
                    this.banner.push(cdn + trueImgUrl(item))
                })
                this.price = this.product.price
                this.stock = this.product.stock
                this.sales = this.product.sales_volume
                if (this.product.sku.length > 0) {
                    const tempSku1 = []
                    const tempSku2 = []
                    this.product.sku.map(item => {
                        if (item.sku_id_1 > 0) {
                            if (!tempSku1[item.sku_id_1]) {
                                this.sku1.push(item.sku1)
                                tempSku1[item.sku_id_1] = true
                            }
                        }
                        if (item.sku_id_2 > 0) {
                            if (!tempSku2[item.sku_id_2]) {
                                this.sku2.push(item.sku2)
                                tempSku2[item.sku_id_2] = true
                            }
                        }
                    })
                }
            }).catch(err => {
                this.$vux.alert.show('系统异常')
            })
        },
    },
    computed: {
    },
    watch: {
        buyPlant(newVla, oldVal) {
            if (newVla === true) {
                this.$nextTick(() => {
                    this.$refs.body.style.height = this.$refs.plant.clientHeight - 203 + 'px'
                })
            }
        }
    },
    components: {
        Swiper,
        Rater,
        Badge,
        InlineXNumber,
        SwiperItem,
        Checker,
        CheckerItem
    }
}
</script>

<style lang="less">
@import "~vux/src/styles/1px.less";
#detail {
    padding-bottom: 53px;
    .swiper {
        .vux-swiper {
            padding-bottom: 40% !important;
        }
        .swiper-img {
            img {
                width: 100%;
                height: 100%;
            }
        }
    }
    .info {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        p {
            margin-top: 10px;
        }
        .title {
            font-size: 18px;
        }
        .price {
            font-size: 20px;
            margin-bottom: 10px;
            span {
                font-size: 12px;
                color: #ed4434;
                vertical-align: top;
                text-decoration: line-through;
            }
        }
    }
    .description {
        padding: 0 10px;
        img {
            width: 100%;
        }
    }
    .divider {
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin: 15px;
        &::before {
            content: "";
            width: 30%;
            border-top: 1px solid #ccc;
        }
        &::after {
            content: "";
            width: 30%;
            border-top: 1px solid #ccc;
        }
    }
    .choose-sku-masker {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(204, 204, 204, 0.8);
        z-index: 2;
        .plant {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            min-height: 50%;
            max-height: 80%;
            padding-bottom: 53px;
            background-color: #fff;
            .close {
                position: absolute;
                right: 10px;
                top: 10px;
                z-index: 2;
            }
            .top {
                width: 100%;
                height: 150px;
                .img {
                    position: absolute;
                    left: 20px;
                    top: -20px;
                    width: 150px;
                    height: 150px;
                    border-radius: 5px;
                    background-color: #ed4434;
                }
                .content {
                    margin-left: 180px;
                    height: 150px;
                    font-size: 16px;
                    display: flex;
                    justify-content: center;
                    flex-direction: column;
                    align-items: flex-start;
                    .price {
                        color: red;
                        font-size: 18px;
                    }
                }
            }
            .body {
                overflow: scroll;
                .sku {
                    padding: 10px 10px 0 10px;
                    .sku-item {
                        border: 1px solid #ccc;
                        border-radius: 10px;
                        background-color: #e9f6fe;
                        margin: 0 5px 10px 5px;
                        padding: 5px 15px;
                    }
                    .sku-item-selected {
                        border-radius: 10px;
                        background-color: #ff0036;
                        color: #fff;
                        border: 1px solid #ff0036;
                    }
                }
            }
            .buy-num {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                padding: 20px;
            }
            .button {
                width: 100%;
                height: 53px;
                color: #fff;
                position: absolute;
                bottom: 0;
                background-color: #ff0036;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
    }
    .bottom {
        width: 100%;
        height: 53px;
        background-color: #fff;
        overflow-y: scroll;
        position: absolute;
        display: flex;
        left: 0;
        right: 0;
        bottom: 0;
        .cart {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 53px;
            width: 53px;
            position: relative;
            .badge {
                position: absolute;
                right: 0;
                top: 0;
            }
        }
        .buy {
            display: flex;
            justify-content: space-around;
            align-items: center;
            width: calc(100% - 53px);
            height: 100%;
            color: #fff;
            .put-cart {
                display: flex;
                justify-content: space-around;
                align-items: center;
                height: 100%;
                width: 100%;
                background-color: #f5a741;
            }
            .buy-now {
                display: flex;
                justify-content: space-around;
                align-items: center;
                height: 100%;
                width: 100%;
                background-color: #ee4d34;
            }
        }
    }
}
</style>
