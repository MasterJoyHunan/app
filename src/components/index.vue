<template>
    <div style="height: 100%" id="my-index">
        <view-box ref="viewBox" :body-padding-bottom="leftButton" :body-padding-top="leftTop">
            <x-header
                    :title="title" slot="header"
                    :left-options="{showBack:showBack, backText: '', showMore: showMore}"
                    v-show="showTitle"
                    class="my-header"
                    style="width:100%;position:absolute;left:0;top:0;z-index:100;"
            >
                <div @click="backItem()" slot="overwrite-left" v-if="showBack">
                    <svg-icon icon-class="back"  size="16" color="#babfc9" ></svg-icon>
                </div>
                <svg-icon icon-class="more"  size="20" slot="right" color="#babfc9" v-if="showMore"></svg-icon>
            </x-header>
            <keep-alive>
                <router-view  v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
            <router-view v-if="!$route.meta.keepAlive"></router-view>

            <tabbar slot="bottom" class="bottom" v-show="showBottom">
                <tabbar-item :link="{path:'/index'}" :selected="active1">
                    <svg-icon icon-class="aeqdeal" size="26" slot="icon"></svg-icon>
                    <span slot="label">AEQ交易</span>
                </tabbar-item>
                <tabbar-item :link="{path:'/shop'}" :selected="active2">
                    <svg-icon icon-class="shop" size="26" slot="icon"></svg-icon>
                    <span slot="label">商城</span>
                </tabbar-item>
                <tabbar-item :link="{path:'/cart'}" :selected="active3">
                    <svg-icon icon-class="cart" size="26" slot="icon"></svg-icon>
                    <span slot="label">购物车</span>
                </tabbar-item>
                <tabbar-item :link="{path:'/member'}" :selected="active4">
                    <svg-icon icon-class="member" size="26" slot="icon"></svg-icon>
                    <span slot="label">个人中心</span>
                </tabbar-item>
            </tabbar>
        </view-box>
    </div>
</template>

<script>
    import { XHeader, Tabbar, TabbarItem, ViewBox, Drawer } from 'vux'
    import { mapGetters } from 'vuex'

    export default {
        name: 'index',
        data () {
            return {
                showMenu: false,
                showCateFlag: true,
                active1: true,
                active2: false,
                active3: false,
                active4: false,
            }
        },
        created() {
            this.active1 = false
            this.active2 = false
            this.active3 = false
            this.active4 = false
        },
        methods: {
            backItem () {
                this.$router.back()
            },
            fetchDate (to, from) {
                if (to.path == '/index') {
                    this.active1 = true
                } else if (to.path == '/shop') {
                    this.active2 = true
                } else if (to.path == '/cart') {
                    this.active3 = true
                } else if (to.path == '/member') {
                    this.active4 = true
                }
            }

        },
        computed: {
            leftButton () {
                return this.showBottom ? '53px' : '0px'
            },
            leftTop () {
                return this.showTitle ? '46px' : '0px'
            },
            ...mapGetters(['title', 'showBack', 'showMore', 'showTitle', 'showBottom'])
        },
        components: {
            XHeader,
            Tabbar,
            TabbarItem,
            ViewBox,
            Drawer,
        },
        watch: {
            // 如果路由有变化，会再次执行该方法
            "$route": "fetchDate",
        }
    }
</script>

<style lang="less">
</style>
