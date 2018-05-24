<template>
    <div id="cate">
        <x-header :title="title"
            class="my-header"
            style="width:100%;position:absolute;left:0;top:0;z-index:1;">
            <div @click="showMore()"
                slot="overwrite-left">
                <svg-icon icon-class="more"
                    size="20"
                    color="#babfc9"></svg-icon>
            </div>
        </x-header>
        <div class="drawer"
            :class="{'show-drawer': showDrawer}">
            <div @click="chooseCate({cate_id: ''})"
                class="cate-item">
                <div class="triangle-top-left"></div>
                <div class="triangle-up"></div>
                <div class="text">全部</div>
            </div>
            <div @click="chooseCate(cate_item)"
                class="cate-item"
                v-for="(cate_item, index) in cate"
                :key="index">
                <div class="triangle-top-left"></div>
                <div class="triangle-up"></div>
                <div class="text">{{cate_item.name}}</div>
            </div>
        </div>
        <div class="mask"
            :class="{'show-mask': showDrawer}"
            @click="showDrawer = false"></div>
        <scroll :data="pro"
            class="content"
            :class="{'show-content': showDrawer}"
            ref="scroll"
            :listenScrollChange="true"
            :probeType="3"
            pullDown
            pullUp
            @pullingDown="reset()"
            @pullingUp="loadMore()"
            @scroll="scrollChange">
            <div @click="choosePro()"
                class="product-item"
                v-for="(pro_item, index) in pro"
                :key="index">
                <div class="img" :style="{backgroundImage: `url(${thisImg(pro_item)})`}">
                </div>
                <div class="title">{{pro_item.title}}</div>
                <div class="text">
                    <div class="sales">999</div>
                    <div class="price">88.00
                        <span class="market-pric">100.00</span>
                    </div>
                </div>
            </div>
            <div class="pull pullup"
                v-show="showLoadMore">
                <spinner type="ios-small"
                    v-if="loadMoreText == '加载更多'"></spinner>{{loadMoreText}}</div>
        </scroll>
        <div class="pull pulldown"
            v-show="showReset">
            <spinner type="ios-small"></spinner>刷新</div>
    </div>
</template>

<script>
import { XHeader, Spinner } from 'vux'
import request from '@/components/common/js/request'
import { pageMixin } from '@/components/common/js/mixin'
import scroll from '@/components/common/base/scroll'
export default {
    name: 'cate',
    mixins: [pageMixin],
    data() {
        return {
            cdn: process.env.CDN,
            showDrawer: false,
            title: '全部',
            cate: [],
            pro: [],
            showReset: false,
            showLoadMore: false,
            tempList: [],
            loadMoreText: '加载更多',
            query: {
                page: 1, // 翻页数据
                cate_id: "" //分类ID
            }
        }
    },
    created() {
        this._getData()
    },
    methods: {
        // 选择分类
        chooseCate(item) {
            this.title = item.name
            this.query.cate_id = item.id
            this._initParam()
            this._getPro()
            this.showDrawer = false
        },
        clickItem() {
            this.showDrawer = false
        },
        // 打开分类菜单
        showMore() {
            this.showDrawer = true
        },
        // 当滑动的位置改变时候
        scrollChange(pos) {
            // console.log(pos)
        },
        // 触发下拉刷新事件
        reset() {
            this.showReset = true
            this.$refs.scroll.disable()
            setTimeout(() => {
                // 下拉刷新完成之后 会到最初的位子
                this._initParam()
                this._getPro()
                this.$refs.scroll.finishPullDown()
                this.$refs.scroll.enable()
            }, 500)
        },
        // 触发上拉加载事件
        loadMore() {
            this.showLoadMore = true
            this.$refs.scroll.refresh()
            if (this.query.page == this.last_page) {
                this.loadMoreText = "...没有更多..."
                this.$refs.scroll.finishPullUp()
                return
            } else {
                this.loadMoreText = "加载更多"
            }
            setTimeout(() => {
                // 上拉加载完成之后 会到最初的位子
                this.query.page++
                request({
                    url: '/api/shop/getAllProduct',
                    method: 'get',
                    params: this.query
                }).then(res => {
                    if (res.data.data.length > 0) {
                        res.data.data.map(item => {
                            this.pro.push(item)
                        })
                        this.last_page = res.data.last_page
                        this.per_page = res.data.per_page
                        this.total = res.data.total
                    }
                }).catch(err => {
                    console.log(err)
                })
                this.showLoadMore = false
                this.$refs.scroll.finishPullUp()
            }, 500)
        },
        thisImg(item) {
            return (this.cdn + item.img).replace(/\\/g, "/")
        },
        // 初始化数据
        _getData() {
            this._getPro()
            this._getCate()
        },
        // 获取商品数据
        _getPro() {
            request({
                url: '/api/shop/getAllProduct',
                method: 'get',
                params: this.query
            }).then(res => {
                this.pro = res.data.data
                this.last_page = res.data.last_page
                this.per_page = res.data.per_page
                this.total = res.data.total
            }).catch(err => {
                console.log(err)
            })
        },
        // 获取分类数据
        _getCate() {
            request({
                url: '/api/shop/getAllCate'
            }).then(res => {
                this.cate = res.data
            }).catch(err => {
                console.log(err)
            })
        },
        // 初始化信息
        _initParam() {
            this.query.page = 1
            this.showReset = false
            this.showLoadMore = false
            this.loadMoreText = "加载更多"
        }
    },
    components: {
        XHeader,
        scroll,
        Spinner
    }
}
</script>

<style lang="less">
#cate {
    position: relative;
    padding-top: 46px;
    background: #f4f2f4;
    height: ~"calc(100% - 46px)";
    .drawer {
        width: 60%;
        background: #ccc;
        position: absolute;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 2;
        transform: translateX(-100%);
        transition: all 500ms;
        overflow: scroll;
        display: flex;
        flex-direction: column;
        .cate-item {
            flex: 1;
            background-color: #64bb72;
            color: #fff;
            margin: 10px 5px;
            line-height: 1em;
            padding: 10px;
            text-align: center;
            position: relative;
            font-size: 18px;
            display: flex;
            justify-content: center;
            align-items: center;
            .triangle-top-left {
                position: absolute;
                top: -5px;
                left: 0;
                width: 0;
                height: 0;
                border-top: 38px solid #8cba34;
                border-right: 38px solid transparent;
            }
            .triangle-up {
                position: absolute;
                top: -5px;
                left: 33px;
                width: 0;
                height: 0;
                border-bottom: 5px solid #64bb72;
                border-left: 5px solid transparent;
                border-right: 5px solid transparent;
            }
        }
    }
    .mask {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: #f5f5f5;
        opacity: 0;
        transition: all 500ms;
    }
    .show-mask {
        opacity: 0.8;
        z-index: 1;
    }
    .show-drawer {
        transform: translateX(0);
    }
    .content {
        height: 100%;
        overflow: hidden;
        transform: translateX(0);
        transition: all 500ms;
        padding: 10px 10px 0 10px;
        .product-item {
            background-color: #fff;
            box-shadow: 0 0 3px #ccc;
            margin-bottom: 10px;
            width: ~"calc(50% - 5px)";
            display: inline-block;
            font-size: 15px;
            &:nth-child(2n){
                margin-left: 10px;
            }
            .img {
                width: 100%;
                padding-bottom: 100%;
                background-size: 100% 100%;
            }
        }
    }
    .show-content {
        transform: translateX(60%);
    }
    .pull {
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2;
    }
    .pulldown {
        height: 60px;
        position: absolute;
        top: 46px;
        left: 0;
        right: 0;
    }
}
</style>
