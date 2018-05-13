<template>
    <div id="reg">
        <div class="container">
            <div class="logo"></div>
            <h1 class="title-1">MasterJoy</h1>
            <h1 class="title-2">SHOP</h1>
        </div>
        <div class="container">
            <div class="login-input username">
                <svg-icon icon-class="username"
                    size="24"></svg-icon>
                <input placeholder="请输入手机号"
                    type="text"
                    v-model="info.tel">
            </div>
            <div class="login-input password">
                <svg-icon icon-class="password"
                    size="24"></svg-icon>
                <input placeholder="请输入密码"
                    type="password"
                    v-model="info.password">
            </div>
            <div class="login-input password">
                <svg-icon icon-class="password"
                    size="24"></svg-icon>
                <input placeholder="请再次输入密码"
                    type="password"
                    v-model="info.confirm_password">
            </div>
            <button class="submit"
                @click="doLogin">注册</button>
            <a class="reg" @click="login">已有账号? 去登录</a>
                
        </div>
    </div>
</template>

<script>
import request from '@/components/common/js/request'
export default {
    name: 'reg',
    data() {
        return {
            info: {
                tel: '',
                password: '',
                confirm_password: ''
            }
        }
    },
    methods: {
        doLogin() {
            request({
                url: '/api/login/register',
                method: 'post',
                data: this.info
            }).then(res => {
                this.$router.push('/index')
            }).catch(err => {
                console.log(err)
            })
        },
        login() {
            this.$router.push('/login')
        }
    }
}
</script>

<style lang="less">
#reg {
    height: 100%;
    background-color: #28364d;
    input {
        height: 100%;
        width: 80%;
        color: #fff;
        font-size: 15px;
        line-height: 100%;
        background-color: transparent;
        border: none;
        outline: none;
    }
    .container {
        width: 100%;
        height: 50%;
        color: #fff;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .reg{
            margin-top: 10px;

        }
        .logo {
            width: 120px;
            height: 120px;
            background-image: url("./master1.png");
            background-size: 100%;
        }
        .submit {
            width: 60%;
            height: 15%;
            margin-top: 10px;
            font-size: 17px;
            color: #fff;
            border: 0px;
            border-radius: 3px;
            outline: none;
            background-color: #409a9a;
        }
        .login-input {
            width: 60%;
            height: 15%;
            display: flex;
            color: #fff;
            justify-content: space-between;
            align-items: center;
            border-top: 1px solid #495667;
            border-bottom: 1px solid #495667;
        }
        .password {
            border-top: none;
        }
    }
}
</style>
