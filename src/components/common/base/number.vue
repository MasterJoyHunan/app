<template>
    <div class="inline-number">
        <div class="border"
            :style="{width:size+'px', height:size+'px'}">
            <svg-icon icon-class="min"
                :size="size"></svg-icon>
        </div>
        <input type="text"
            :style="{width:width+'px', fontSize:size+'px'}"
            class="input-text"
            disabled
            readonly>
        <div class="border"
            :style="{width:size+'px', height:size+'px'}">
            <svg-icon icon-class="add"
                :size="size"></svg-icon>
        </div>
    </div>
</template>

<script>
export default {
    name: 'number',
    props: {
        size: {
            type: String,
            required: true
        },
        width: {
            default: 50
        },
        min: {
            type: Number,
            default: 0
        },
        max: {
            type: Number,
            default: 9999999
        }
    },
    computed: {
    }
}
</script>

<style lang="less">
.inline-number {
    display: flex;
    justify-content: center;
    align-items: center;
    .input-text {
        border: 1px solid #ccc;
        // border: none;
        outline: none;
        background-color: #fff;
    }
    .border {
        border: 1px solid #ccc;
        border-radius: 50%;
    }
}
</style>
