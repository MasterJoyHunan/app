<template>
    <div id="cate">
        <div>动作片</div>
        <div>剧情片</div>
        <div>爱情片</div>
        <div>喜剧片</div>
    </div>
</template>

<script>
export default {
    name: 'cate',
    components: {
    }
}
</script>

<style lang="less">
#cate {
    background-color: #376a39;
    color: #fff;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    div{
        margin: 5px 10px;
    }
    // flex-direction: column;
}
</style>
