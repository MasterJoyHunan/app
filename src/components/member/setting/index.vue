<template>
    <transition name="setting">
        <div id="setting">
            <div class="img-box">
                <div class="img">
                    <img src="./headerimg.png">
                </div>
            </div>
            <div class="text-content">
                <div class="name">灭霸</div>
                <div class="tel">13212345678</div>
            </div>
            <div class="logout"
                @click="logout()">退出登录</div>
        </div>
    </transition>
</template>

<script>
import { mapMutations } from 'vuex'
import request from '@/components/common/js/request'
export default {
    name: 'setting',
    methods: {
        logout() {
            request({
                url: "/shop/login/logout",
                method: "post",
            }).then(res => {
                this.$router.push('/login')
                this.init()
            })
        },
        ...mapMutations({ init: 'LOGOUT' })
    },
}
</script>

<style lang="less">
// 进入动画
.setting-enter-active {
    transition: all 0.3s;
}
.setting-enter {
    transform: translateX(100%);
}
// 离开动画
.setting-leave-active {
    transition: all 0.3s linear;
}
.setting-leave-to {
    transform: translateY(100%);
}
#setting {
    width: 100%;
    height: 100%;
    background: linear-gradient(to left bottom, #e9f6fe, #bbdefb);
    .img-box {
        padding-bottom: 40%;
        position: relative;
        .img {
            width: 80px;
            height: 80px;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translateX(-50%) translateY(-50%);
            background-color: #fff;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            img {
                height: 90%;
                width: 90%;
                border-radius: 50%;
            }
        }
    }
    .text-content {
        height: 40%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        div {
            margin: 20px 0;
        }
    }
    .logout {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        margin: 20px;
        padding: 10px;
        font-size: 15px;
        text-align: center;
        background-color: #dc7433;
        color: #fff;
        border-radius: 25px;
    }
}
</style>
