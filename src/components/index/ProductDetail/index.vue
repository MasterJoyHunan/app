<template>
    <div id="detail">
        <swiper :list="banner"
            loop
            auto
            :show-dots="false"
            :aspect-ratio="500/800">
        </swiper>
        <div class="content" v-html="product.desc"></div>
        <div class="content" v-html="product.desc"></div>
        <div class="content" v-html="product.desc"></div>
        <div class="bottom"></div>
    </div>
</template>

<script>
import { Swiper } from 'vux'
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
        request({
            url: '/api/shop/getProductDetail',
            methods: 'get',
            params: {id: this.$route.query.id}
        }).then(res => {
            this.product = res.data
            const arr = this.product.imgs.split('|')
            arr.map(item => {
                this.banner.push({img: cdn + trueImgUrl(item), url: 'javascript:;'})
            })
        }).catch(err => {
            this.$vux.alert('系统异常')
        })
    },
    methods: {
        trueImgUrl(url) {
            return cdn + trueImgUrl(url)
        }
    },
    computed: {
    },
    components: {
        Swiper,
    }
}
</script>

<style lang="less">
#detail {
    padding-bottom: 53px;
    .content{
        img{
            width: 100%;
        }
    }
    .bottom{
        width: 100%;
        height: 53px;
        background-color: #ccc;
        overflow-y: scroll;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
    }
}
</style>
