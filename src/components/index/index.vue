<template>
    <div id="shop">
        <swiper loop
            auto
            :show-desc-mask="false"
            class="swiper">
            <swiper-item class="swiper-img"
                v-for="(item, index) in ad"
                :key="index">
                <img :src="cdn + item.img">
            </swiper-item>
        </swiper>
        <div class="cate"></div>
        <div class="product-container">
            <plant :item="pro"
                v-for="(pro, index) in hotPro"
                :key="index"
                @clickPlant="proDetail(pro)"
                @clickImg="proDetail(pro)"
                back-color="#fff">
                <div class="text-info"
                    slot="content">
                    <p class="title"
                        @click="proDetail(pro)">{{pro.title}}</p>
                    <span class="price">¥
                        <span class="pro-price">{{pro.price}}</span>
                        <span class="market-price">{{pro.market_price}}</span>
                    </span>
                </div>
            </plant>
        </div>
    </div>
</template>

<script>
import { Swiper, SwiperItem } from 'vux'
import request from '@/components/common/js/request'
import plant from '@/components/common/base/plant'
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
            url: '/shop/shop/index',
            methods: 'get'
        }).then(res => {
            // this.banner = res.data.banner
            this.ad = res.data.ad
            this.cate = res.data.cate
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
        plant,
        SwiperItem
    }
}
</script>

<style lang="less">
#shop {
    .swiper {
        .vux-swiper {
            padding-bottom: 10% !important;
        }
        .swiper-img {
            img {
                width: 100%;
                height: 100%;
            }
        }
    }
    .product-container {
        padding: 0 10px;
        .product {
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
                    font-size: 15px;
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
