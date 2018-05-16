<template>
    <div id="shop">
        <swiper :list="banner"
            loop
            auto
            :aspect-ratio="500/800">
        </swiper>
        <div class="cate"></div>
        <div class="product-container">
            <div class="product"
                @click="proDetail(pro)"
                v-for="(pro, index) in hotPro"
                :key="index">
                <div class="masker"
                    :style="{backgroundImage: `url(${pro.img})`}"></div>
                <div class="blur-container">
                    <!-- <div class="blur"
                        :style="{backgroundImage: `url(${pro.img})`}">
                    </div> -->
                </div>
                <div class="text-info">
                    <p class="title">{{pro.title}}</p>
                    <span class="price">¥
                        <span class="pro-price">{{pro.price}}</span>
                        <span class="market-price">{{pro.market_price}}</span>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Swiper } from 'vux'
import request from '@/components/common/js/request'
import { trueImgUrl } from '@/components/common/js/public'
const cdn = process.env.CDN
export default {
    name: 'shop',
    data() {
        return {
            cdn: cdn,
            banner: [
                {
                    url: 'javascript:',
                    img: 'https://cdn-masterjoy.oss-cn-shanghai.aliyuncs.com/20180109/Koala.jpg',
                    title: '轮播图1'
                },
                {
                    url: 'javascript:',
                    img: 'https://cdn-masterjoy.oss-cn-shanghai.aliyuncs.com/20180109/Koala.jpg',
                    title: '轮播图2'
                },
                {
                    url: 'javascript:',
                    img: 'https://cdn-masterjoy.oss-cn-shanghai.aliyuncs.com/20180109/Koala.jpg',
                    title: '轮播图3'
                },
            ],
            ad: [],
            cate: [],
            hotPro: []
        }
    },
    created() {
        request({
            url: '/api/shop/index',
            methods: 'get'
        }).then(res => {
            // this.banner = res.data.banner
            this.ad = res.data.ad
            this.cate = res.data.cate
            if (res.data.product.length > 0) {
                res.data.product.map(item => {
                    item.img = this.cdn + trueImgUrl(item.img)
                })
            }
            this.hotPro = res.data.product
        }).catch(err => {
            this.$vux.alert('系统异常')
        })
    },
    methods: {
        proDetail(item) {
            this.$router.push({ path: '/product', query: { id: item.id } })
        }
    },
    components: {
        Swiper,
    }
}
</script>

<style lang="less">
#shop {
    .product-container {
        padding: 0 10px;
        .product {
            width: 100%;
            padding-bottom: 40%;
            position: relative;
            background-size: 100%;
            margin: 10px 0;
            // border: 3px solid #e9f6fe;
            // border-radius: 5px;
            z-index: 1;
            .masker {
                position: absolute;
                background-size: 100% 100%;
                width: 40%;
                top: 0;
                bottom: 0;
                left: 0;
                z-index: 1;
                border-radius: 5px;
                opacity: 0.85;
            }
            .blur-container {
                position: absolute;
                width: 100%;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                overflow: hidden;
                border-radius: 5px;
                background-color: #ddd;
                box-shadow: 0 0 3px #000;
                .blur {
                    width: 100%;
                    height: 100%;
                    filter: blur(50px);
                    background-size: 100% 100%;
                }
            }
            .text-info {
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
                .title {
                    text-align: center;
                    font-size: 18px;
                }
                .price {
                    font-size: 12px;
                    color: red;
                    .pro-price {
                        font-size: 18px;
                        font-weight: bold;
                    }
                    .market-price {
                        font-size: 12px;
                        vertical-align: top;
                        text-decoration: line-through;
                    }
                }
            }
        }
    }
}
</style>
