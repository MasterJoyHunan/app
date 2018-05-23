<template>
    <div id="cate">
        <div class="drawer" :class="{'show-drawer': showDrawer}">
            <div @click="clickItem()">动作片</div>
            <div @click="clickItem()">剧情片</div>
            <div @click="clickItem()">爱情片</div>
            <div @click="clickItem()">喜剧片</div>
        </div>
        <div class="mask" :class="{'show-mask': showDrawer}" @click="showDrawer = false"></div>
        <div class="content" :class="{'show-content': showDrawer}">
            <div @click="clickItem()">a</div>
            <div @click="clickItem()">a</div>
            <div @click="clickItem()">a</div>
            <div @click="showDrawer = true">a</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'cate',
    data() {
        return {
            showDrawer: false
        }
    },
    methods: {
        clickItem() {
            console.log(this.showDrawer)
            this.showDrawer = false
        }
    },
    components: {
    }
}
</script>

<style lang="less">
#cate {
    position: relative;
    height: 100%;
    .drawer{
        width: 60%;
        background: #ccc;
        position: absolute;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 2;
        transform: translateX(-100%);
        transition: all 500ms;
    }
    .mask{
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: #f5f5f5;
        opacity: 0;
        transition: all 500ms;
    }
    .show-mask{
        opacity: .8;
        z-index: 1;
    }
    .show-drawer{
        // opacity: 1;
        
        transform: translateX(0);
    }
    .content{
        transform: translateX(0);
        transition: all 500ms;
    }
    .show-content{
        transform: translateX(60%);
    }
}
</style>
