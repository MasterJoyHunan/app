<template>
    <div ref="wrapper">
        <div>
            <slot></slot>
        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
    name: "scroll",
    data() {
        return {
        }
    },
    props: {
        probeType: {
            type: Number,
            default: 1
        },
        click: {
            type: Boolean,
            default: true
        },
        data: {
            type: Array,
            default: function () {
                return []
            },
        },
        listenScrollChange: {
            type: Boolean,
            default: false
        },
        // 是否派发顶部下拉的事件，用于下拉刷新
        pullDown: {
            type: Boolean,
            default: false
        },
        // 是否派发滚动到底部的事件，用于上拉加载
        pullUp: {
            type: Boolean,
            default: false
        },
    },
    mounted() {
        setTimeout(() => {
            this._initScroll()
        }, 20)
    },
    methods: {
        _initScroll() {
            const _this = this
            if (!this.$refs.wrapper) {
                console.log('not init')
                return
            }
            this.scroll = new BScroll(this.$refs.wrapper, {
                probeType: this.probeType,
                click: this.click,
                pullDownRefresh: this.pullDownRefresh,
                pullUpLoad: this.pullUp
            })
            // 监听滚动
            if (this.listenScrollChange) {
                this.scroll.on('scroll', (pos) => {
                    _this.$emit('scroll', pos)
                })
            }
            // 监听下拉刷新事件
            if (this.pullDown) {
                this.scroll.on('pullingDown', () => {
                    _this.$emit('pullingDown')
                })
            }
            // 监听上拉加载事件
            if (this.pullUp) {
                this.scroll.on('pullingUp', () => {
                    _this.$emit('pullingUp')
                })
            }
        },
        enable() {
            this.scroll && this.scroll.enable()
        },
        disable() {
            this.scroll && this.scroll.disable()
        },
        refresh() {
            this.$nextTick(() => {
                this.scroll && this.scroll.refresh()
            })
        },
        scrollTo(...arg) {
            this.scroll && this.scroll.scrollTo(...arg)
        },
        scrollToElement(...arg) {
            this.scroll && this.scroll.scrollToElement(...arg)
        },
        // 下拉刷新调用此方法
        finishPullDown() {
            this.scroll && this.scroll.finishPullDown()
        },
        // 上拉加载完成调用此方法
        finishPullUp() {
            this.scroll && this.scroll.finishPullUp()
        }
    },
    watch: {
        data() {
            setTimeout(() => {
                this.refresh()
            }, 20)
        }
    },
    computed: {
        pullDownRefresh() {
            // 下拉60 并且在距离顶部60停住
            return this.pullDown ? { threshold: 60, stop: 60 } : this.pullDown
        },
    }
}
</script>

<style lang="less">
</style>