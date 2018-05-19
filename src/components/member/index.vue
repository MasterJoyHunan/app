<template>
    <div id="member">
        <div class="header">
            <div class="header-content">
                <div class="header-img">
                    <img src="./headerimg.png">
                </div>
                <p class="name">灭霸</p>
            </div>
            <div class="setting">
                <!-- <svg-icon icon-class="message"
                    color="#fff"
                    size="18"></svg-icon> -->
                <svg-icon icon-class="setting"
                    color="#fff"
                    size="18"></svg-icon>
            </div>
        </div>
        <div class="body">
            <div class="my-order">
                <div class="order-icon">
                    <div class="all">
                        <svg-icon icon-class="order-all"
                            size="30"
                            color="#8fcd34"></svg-icon>
                        <p>全部</p>
                    </div>
                    <div class="wait-pay">
                        <svg-icon icon-class="order-wait-pay"
                            size="30"
                            color="#8fcd34"></svg-icon>
                        <p>待付款</p>
                    </div>
                    <div class="wait-send">
                        <svg-icon icon-class="order-wait-send"
                            size="30"
                            color="#8fcd34"></svg-icon>
                        <p>待发货</p>
                    </div>
                    <div class="send">
                        <svg-icon icon-class="order-send"
                            size="30"
                            color="#8fcd34"></svg-icon>
                        <p>发货中</p>
                    </div>
                    <div class="finish">
                        <svg-icon icon-class="order-finish"
                            size="30"
                            color="#8fcd34"></svg-icon>
                        <p>完成</p>
                    </div>
                </div>
            </div>
            <div class="list-box">
                <div class="list"
                    @click="gotoUrl('/address')">
                    <div class="left">
                        <svg-icon icon-class="address"
                            color="#8fcd34"
                            size="25"></svg-icon>
                        <p>收货地址管理</p>
                    </div>
                    <div class="right">
                        <svg-icon icon-class="right"
                            color="#8fcd34"
                            size="25"></svg-icon>
                    </div>
                </div>
                <div class="list">
                    <div class="left">
                        <svg-icon icon-class="express"
                            color="#8fcd34"
                            size="25"></svg-icon>
                        <p>物流信息</p>
                    </div>
                    <div class="right">
                        <svg-icon icon-class="right"
                            color="#8fcd34"
                            size="25"></svg-icon>
                    </div>
                </div>
                <div class="list">
                    <div class="left">
                        <svg-icon icon-class="message"
                            color="#8fcd34"
                            size="25"></svg-icon>
                        <p>消息中心</p>
                    </div>
                    <div class="right">
                        <svg-icon icon-class="right"
                            color="#8fcd34"
                            size="25"></svg-icon>
                    </div>
                </div>
                <div class="list">
                    <div class="left">
                        <svg-icon icon-class="setting"
                            color="#8fcd34"
                            size="25"></svg-icon>
                        <p>设置</p>
                    </div>
                    <div class="right">
                        <svg-icon icon-class="right"
                            color="#8fcd34"
                            size="25"></svg-icon>
                    </div>
                </div>
                <div class="list">
                    <div class="left">
                        <svg-icon icon-class="help"
                            color="#8fcd34"
                            size="25"></svg-icon>
                        <p>帮助中心</p>
                    </div>
                    <div class="right">
                        <svg-icon icon-class="right"
                            color="#8fcd34"
                            size="25"></svg-icon>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import request from '@/components/common/js/request'
import { mapGetters, mapActions } from 'vuex'
export default {
    name: 'member',
    data() {
        return {

        }
    },
    created() {
        if (Object.keys(this.user).length == 0) {
            this.reloadUser()
        }
    },
    activated() {
        if (Object.keys(this.user).length == 0) {
            this.reloadUser()
        }
    },
    methods: {
        gotoUrl(url) {
            this.$router.push(url)
        },
        ...mapActions(['get'])
    },
    computed: {
        ...mapGetters(['user'])
    }
}
</script>

<style lang="less">
#member {
    .header {
        background-color: rgba(0, 0, 0, 0.8);
        padding-bottom: 40%;
        border-radius: ~"0px 0px 50% 50% / 0px 0px 20% 20%;";
        position: relative;
        .header-content {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translateX(-50%) translateY(-50%);
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            .header-img {
                width: 80px;
                height: 80px;
                border-radius: 50%;
                background-color: #fff;
                display: flex;
                justify-content: center;
                align-items: center;
                img {
                    height: 90%;
                    width: 90%;
                    border-radius: 50%;
                }
            }
            .name {
                font-size: 15px;
                text-align: center;
                color: #fff;
            }
        }
        .setting {
            position: absolute;
            right: 10px;
            top: 10px;
            // .svg-icon:first-child {
            //     margin-right: 10px;
            // }
        }
    }
    .body {
        .my-order {
            margin: 20px 0;
            .order-icon {
                display: flex;
                justify-content: center;
                align-items: center;
                div {
                    flex: 1;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;
                    font-size: 12px;
                    .svg-icon {
                        margin: 10px 0;
                    }
                }
            }
        }
        .list-box {
            padding: 0 10px 10px;
            .list {
                // background-color: rgba(232, 245, 233, 0.3);
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 10px 20px;
                margin: 10px 0;
                border-radius: 3px;
                border: 1px solid #ddd;
                &:last-child {
                    margin-bottom: 0;
                }
                // border-bottom: 1px solid #ccc;
                // &:first-child {
                //     border-top: 1px solid #ccc;
                // }
                div {
                    margin: 5px 0;
                }
                .left {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 13px;
                    p {
                        margin-left: 10px;
                    }
                }
                .right {
                    line-height: 0;
                }
            }
        }
    }
}
</style>

