<template>
    <div class="img-404">
        <div class="imgs">
            <img :src="src" alt="">
            <p>ERROR 404</p>
            <p>该页面不不存在......</p>
            <x-button type="primary" mini link="/" class="btn" plain>去首页看看?</x-button>
        </div>
    </div>
</template>

<script>
    import png404 from '@/components/common/img/404.png'
    import {XButton} from 'vux'

    export default {
        name: 'error',
        data() {
            return {
                src: png404
            }
        },
        components: {
            XButton,
        }
    }
</script>

<style scoped lang="less">
    .img-404 {
        width: 100%;
        height: 100%;
        .imgs {
            text-align: center;
            position: relative;
            top: 40%;
            transform: translateY(-50%);
            img {
                margin: 0 auto;
                display: block;
            }
            p {
                font-weight: bold;
                color: #f9cc9d;
            }
            .btn {
                color: #ffa100;
                margin-top: 30px;
                width: 60%;
                border: 1px solid #ffa100;
            }
        }
    }
</style>
