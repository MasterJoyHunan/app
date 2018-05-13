<template>
    <div id="cate">
        <div>
        <div class="img">
            <div class="box"></div>
        </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'cate',
}
</script>

<style lang="less">
#cate {
    .img{
        margin: 20px auto 0 auto;
        filter: blur(20px);
        background-image: url('https://cdn-masterjoy.oss-cn-shanghai.aliyuncs.com/20180109/Koala.jpg');
        width: 200px;
        height: 200px;
        background-size: 100% 100%;
        .box{
            width: 100%;
            height: 100%;
            border: 1px solid #fff;
            z-index: 1;
        }
    }
}
</style>
