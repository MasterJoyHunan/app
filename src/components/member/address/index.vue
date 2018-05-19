<template>
    <div id="address-list">
        <div class="not-address">
            <svg-icon icon-class="address"
                color="#dc7433"
                size="100"></svg-icon>
            <p class="text">暂时没有添加地址</p>
            <div class="add-new-address"
                @click="addnew">添加新的地址</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'address-list',
    methods: {
        addnew() {
            this.$router.push('/addAddress')
        }
    }
}
</script>

<style lang="less">
#address-list {
    .not-address {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: #f5f4f7;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        .text {
            margin-top: 10px;
        }
        .add-new-address {
            color: #fff;
            margin-top: 20px;
            // border: 1px solid #dc7433;
            background-color: #dc7433;
            padding: 5px 20px;
            border-radius: 3px;
        }
    }
}
</style>
