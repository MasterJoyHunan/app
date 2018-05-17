<template>
    <div style="height: 100%"
        id="my-index">
        <view-box ref="viewBox"
            :body-padding-bottom="leftButton"
            :body-padding-top="leftTop">
            <x-header :title="title"
                slot="header"
                :left-options="{showBack:showBack, backText: '', showMore: showMore}"
                v-show="showTitle"
                class="my-header"
                style="width:100%;position:absolute;left:0;top:0;z-index:100;">
                <div @click="backItem()"
                    slot="overwrite-left"
                    v-if="showBack">
                    <svg-icon icon-class="back"
                        size="16"
                        color="#babfc9"></svg-icon>
                </div>
                <svg-icon icon-class="more"
                    size="20"
                    slot="right"
                    color="#babfc9"
                    v-if="showMore"></svg-icon>
            </x-header>
            <keep-alive>
                <router-view v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
            <router-view v-if="!$route.meta.keepAlive"></router-view>

            <tabbar slot="bottom"
                class="bottom"
                v-show="showBottom">
                <tabbar-item :link="{path:'/index'}"
                    :selected="path == '/index'">
                    <svg-icon icon-class="home"
                        size="26"
                        slot="icon"></svg-icon>
                    <span slot="label">商城</span>
                </tabbar-item>
                <tabbar-item :link="{path:'/cate'}"
                    :selected="path == '/cate'">
                    <svg-icon icon-class="cate"
                        size="26"
                        slot="icon"></svg-icon>
                    <span slot="label">分类</span>
                </tabbar-item>
                <tabbar-item :link="{path:'/cart'}"
                    :selected="path == '/cart'">
                    <svg-icon icon-class="cart"
                        size="26"
                        slot="icon"></svg-icon>
                    <span slot="label">购物车</span>
                </tabbar-item>
                <tabbar-item :link="{path:'/member'}"
                    :selected="path == '/member'">
                    <svg-icon icon-class="member"
                        size="26"
                        slot="icon"></svg-icon>
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
    created() {
        const urlArr = location.href.split('#')
        this.path = urlArr[1]
    },
    data() {
        return {
            path: '/index'
        }
    },
    methods: {
        backItem() {
            this.$router.back()
        },
        fetchDate(to, from) {
            [this.active1, this.active2, this.active3, this.active4] = [false, false, false, false]
            this.path = to.path
        },
    },
    computed: {
        leftButton() {
            return this.showBottom ? '53px' : '0px'
        },
        leftTop() {
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
#my-index {
    // background-color: #e9f6fe;
    .my-header {
        background-color: #fff;
        .vux-header-title {
            color: #0f1e22 !important;
        }
    }
}
</style>
