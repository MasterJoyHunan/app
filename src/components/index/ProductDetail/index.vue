<template>
    <transition name="detail">
        <div id="detail">
            <div class="back"
                @click="back()">
                <svg-icon icon-class="back"
                    size="20"
                    color="#fff"></svg-icon>
            </div>
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
                :class="{'show-choose-sku-masker': buyPlant}">
                <div class="plant"
                    :class="{'show-plant': buyPlant}"
                    ref="plant">
                    <div class="close"
                        @click="close()">
                        <svg-icon icon-class="close"
                            size="30"></svg-icon>
                    </div>
                    <div class="top vux-1px-b">
                        <div class="img">
                            <img :src="cdn + miniImg"
                                alt="">
                        </div>
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
                                radio-required
                                @on-change="resetInfo()"
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
                                radio-required
                                @on-change="resetInfo()"
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
                                :max="stock"
                                v-model="buyNum"></inline-x-number>
                        </div>
                    </div>
                    <div class="button"
                        ref="submitBtn"
                        :style="{backgroundColor: buyDisable ? '#ccc' : '#ff0036'}"
                        @click="onSubmit()">{{buyFlag == 1 ? '立即购买' : '加入购物车'}}</div>
                </div>
            </div>
            <div class="bottom">
                <div class="cart"
                    @click="gotoCart()">
                    <svg-icon icon-class="cart2"
                        color="52b983"
                        size="40"></svg-icon>
                    <badge class="badge"
                        v-if="cartNum > 0"
                        :text="cartNum"></badge>
                </div>
                <div class="buy">
                    <div class="put-cart"
                        @click="buyNow(0)">加入购物车</div>
                    <div class="buy-now"
                        @click="buyNow(1)">立即购买</div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import { Swiper, SwiperItem, Rater, Badge, InlineXNumber, Checker, CheckerItem } from 'vux'
import { mapGetters, mapActions } from 'vuex'
import request from '@/components/common/js/request'
import { trueImgUrl } from '@/components/common/js/public'
const cdn = process.env.CDN
export default {
    name: 'detail',
    data() {
        return {
            cdn: cdn,
            product: {},
            banner: [],
            buyPlant: false,
            buyNum: 1,
            sku1: [],
            sku2: [],
            chooseSku1: {},
            chooseSku2: {},
            miniImg: '',
            price: 0,
            stock: 0,
            sales: 0,
            pro_sku_id: 0,
            buyDisable: false,
            buyFlag: 0, // 0加入购物车, 1立即购买
        }
    },
    created() {
        this._getData()
    },
    methods: {
        // 返回
        back() {
            this.$router.back()
        },
        //filter方法
        trueImgUrl(url) {
            return cdn + trueImgUrl(url)
        },
        // 跳转到购物车
        gotoCart() {
            this.$router.push('/cart')
        },
        // 加入到购物车
        // 加入到购物车/立即购买
        buyNow(flag) {
            this.buyPlant = true
            this.buyFlag = flag
        },
        // 关闭购买
        close() {
            this.buyPlant = false
        },
        // 购物提交, 立即购买提交
        onSubmit() {
            if (this.buyDisable) {
                return
            }
            request({
                url: "/shop/cart/addToCart",
                method: 'post',
                data: { pro_id: this.product.id, num: this.buyNum, pro_sku_id: this.pro_sku_id, buy_now: this.buyFlag }
            }).then(res => {
                this.initCart()
                this.buyPlant = false
                if (this.buyFlag === 1) {
                    this.$router.push('/cartOrder')
                }
            }).catch(err => {
                console.log(err)
            })
        },
        // 重新渲染图片, 销量,库存
        resetInfo() {
            if (this.sku1.length > 0 && this.sku2.length == 0) {
                if (Object.keys(this.chooseSku1).length > 0) {
                    for (const item of this.product.sku) {
                        if (item.sku_id_1 == this.chooseSku1.id) {
                            this.miniImg = item.img
                            this.price = item.price
                            this.stock = item.stock
                            this.sales = item.sales_volume
                            this.pro_sku_id = item.id
                            return
                        }
                    }
                }
            } else if (this.sku1.length > 0 && this.sku2.length > 0) {
                if (Object.keys(this.chooseSku1).length > 0 && Object.keys(this.chooseSku2).length > 0) {
                    for (const item of this.product.sku) {
                        if (item.sku_id_1 == this.chooseSku1.id && item.sku_id_2 == this.chooseSku2.id) {
                            this.miniImg = item.img
                            this.price = item.price
                            this.stock = item.stock
                            this.sales = item.sales_volume
                            this.pro_sku_id = item.id
                            return
                        }
                    }
                }
            } else if (this.sku1.length == 0 && this.sku2.length > 0) {
                if (Object.keys(this.chooseSku2).length > 0) {
                    for (const item of this.product.sku) {
                        if (item.sku_id_2 == this.chooseSku2.id) {
                            this.miniImg = item.img
                            this.price = item.price
                            this.stock = item.stock
                            this.sales = item.sales_volume
                            this.pro_sku_id = item.id
                            return
                        }
                    }
                }
            }
        },
        // 获取数据
        _getData() {
            request({
                url: '/shop/shop/getProductDetail',
                method: 'get',
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
                this.miniImg = this.product.img
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
                this.buyDisable = (this.stock == 0)
            }).catch(err => {
                this.$vux.alert.show('系统异常')
            })
        },
        ...mapActions(['initCart'])
    },
    computed: {
        ...mapGetters(['cartNum'])
    },
    watch: {
        // CSS不熟, 只能用JS解决SKU选择菜单的时候的高度
        buyPlant(newVla, oldVal) {
            if (newVla === true) {
                this.$nextTick(() => {
                    this.$refs.body.style.height = this.$refs.plant.clientHeight - 203 + 'px'
                })
            }
        },
        stock(newVal) {
            this.buyDisable = (newVal == 0)
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
// 进入动画
.detail-enter-active {
    transition: all 0.3s;
}
.detail-enter {
    transform: translateX(100%);
}
// 离开动画
.detail-leave-active {
    transition: all 0.3s;
}
.detail-leave-to {
    transform: translateX(100%);
}

#detail {
    padding-bottom: 53px;
    min-height: ~"calc(100% - 53px)";
    .back {
        position: absolute;
        left: 10px;
        top: 10px;
        height: 30px;
        width: 30px;
        border-radius: 50%;
        background: rgba(0, 0, 0, 0.2);
        display: flex;
        justify-content: center;
        align-items: center;
    }
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
        z-index: -1;
        opacity: 0;
        .plant {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            min-height: 50%;
            max-height: 80%;
            padding-bottom: 53px;
            background-color: #fff;
            transition: all 0.5s;
            opacity: 0;
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
                    background: #fff;
                    position: absolute;
                    left: 20px;
                    top: -20px;
                    width: 150px;
                    height: 150px;
                    border-radius: 5px;
                    box-shadow: 0 0 3px #000;
                    img {
                        border-radius: 5px;
                        width: 100%;
                        height: 100%;
                    }
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
        .show-plant {
            opacity: 1;
        }
    }
    .show-choose-sku-masker {
        opacity: 1;
        z-index: 2;
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
