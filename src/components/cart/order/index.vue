<template>
    <div id="cart-order">
        <div class="address"></div>
        <div class="product-list"></div>
        <div class="total"></div>
        <div class="submit">结算</div>
    </div>
</template>

<script>
import request from '@/components/common/js/request'
export default {
    name: 'cart-order',
    data() {
        return {

        }
    },
    created() {
        request({
            url: '/api/order/getChooseGoods',
            method: 'get'
        }).then(res => {
            console.log(res)
        }).catch(err => {
            // 没有默认收货地址的情况下
            if (err.status == -1) {
                setTimeout(() => {
                    this.$router.push('/addAddress')
                }, 1000)
            }
        })
    },
}
</script>

<style lang="less">
#cart-order {
}
</style>
