<template>
    <div class="mj-plant product"
        @click.stop="clickItem(item, 0)">
        <div class="masker"
            @click.stop="clickItem(item, 1)"
            :style="{backgroundImage: `url(${thisImg})`}"></div>
        <div class="blur-container"
            :style="{backgroundColor: backColor}">
        </div>
        <slot name="content"></slot>
    </div>
</template>

<script>
export default {
    name: 'plant',
    data() {
        return {
            cdn: process.env.CDN
        }
    },
    props: {
        backColor: {
            type: String,
            default: '#ddd'
        },
        img: {
            type: String,
            default: ''
        },
        item: {
            type: Object,
            default: () => {
                return { img: '' }
            }
        },
    },
    methods: {
        clickItem(item, flag) {
            flag === 0 ? this.$emit('clickPlant', item) : this.$emit('clickImg', item)
        }
    },
    computed: {
        thisImg() {
            return (this.cdn + (this.img ? this.img : this.item.img)).replace(/\\/g, "/")
        }
    }
}
</script>

<style lang="less">
.mj-plant {
    width: 100%;
    padding-bottom: 40%;
    position: relative;
    background-size: 100%;
    margin: 10px 0;
    // border: 3px solid #e9f6fe;
    // border-radius: 5px;
    z-index: 1;
    .masker {
        position: absolute;
        background-size: 100% 100%;
        background-color: #fff;
        width: 40%;
        top: 0;
        bottom: 0;
        left: 0;
        z-index: 1;
        border-radius: 5px;
        opacity: 0.85;
    }
    .blur-container {
        position: absolute;
        width: 100%;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        overflow: hidden;
        border-radius: 5px;
        box-shadow: 0 0 3px #000;
    }
}
</style>
