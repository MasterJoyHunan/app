<template>
    <div id="detail">
        <div class="info">
            <p class="title">{{product.title}}</p>
            <!-- <p class="sales">
                <rater :value="5"
                    disabled
                    :font-size="17"></rater> <span class="volume">销量: {{product.sales_volume}}</span></p> -->
            <p class="price">¥{{product.price}}
                <span>¥{{product.market_price}}</span>
            </p>
        </div>
        <swiper :list="banner"
            loop
            auto
            dots-position="center"
            :show-dots="banner.length > 1 ? true : false"
            :show-desc-mask="false"
            :aspect-ratio="500/800">
        </swiper>
        <div class="divider">商品详情</div>
        <div class="content"
            v-html="product.desc"></div>
        <div class="plant">

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
import { Swiper, Rater, Badge } from 'vux'
import request from '@/components/common/js/request'
import { trueImgUrl } from '@/components/common/js/public'
const cdn = process.env.CDN
export default {
    name: 'detail',
    data() {
        return {
            product: {},
            banner: [],
        }
    },
    created() {
        this._getData()
    },
    methods: {
        trueImgUrl(url) {
            return cdn + trueImgUrl(url)
        },
        gotoCart() {
            this.$router.push('/cart')
        },
        putCart() {
            console.log('put')
        },
        buyNow() {
            console.log('buy')
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
                    this.banner.push({ img: cdn + trueImgUrl(item), url: 'javascript:;' })
                })
            }).catch(err => {
                this.$vux.alert.show('系统异常')
            })
        }
    },
    computed: {
    },
    components: {
        Swiper,
        Rater,
        Badge
    }
}
</script>

<style lang="less">
#detail {
    padding-bottom: 53px;
    .info {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        // background-color: #fff;
        padding-left: 20px;
        p {
            margin-top: 10px;
        }
        .title {
            font-size: 18px;
        }
        // .sales{
        //     font-size: 15px;
        //     .volume{
        //         color: #767676;
        //         margin-left: 10px;
        //     }
        // }
        .price {
            // color: #ed4434;
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
    .content {
        padding: 0 10px;
        p {
            line-height: 0;
        }
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
    .plant {
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
