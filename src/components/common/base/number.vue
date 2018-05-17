<template>
    <div class="inline-number">
        <div class="border"
            @click="doIng(0)"
            :style="{width:size+'px', height:size+'px', border: `1px solid ${nowMinColor}`}">
            <svg-icon icon-class="min"
                :color="nowMinColor"
                :size="size"></svg-icon>
        </div>
        <input type="number"
            :style="{width:width+'px', fontSize:size+'px'}"
            class="input-text"
            :min="min"
            :value="value"
            :max="max"
            disabled
            readonly>
        <div class="border"
            @click="doIng(1)"
            :style="{width:size+'px', height:size+'px', border: `1px solid ${nowAddColor}`}">
            <svg-icon icon-class="add"
                :color="nowAddColor"
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
            default: 25
        },
        min: {
            type: Number,
            default: 0
        },
        max: {
            type: Number,
            default: 9999999
        },
        value: {
            type: Number,
            default: 1
        },
        color: {
            type: String,
            default: '#09BB07'
        },
        disableColr: {
            type: String,
            default: '#ccc'
        }
    },
    methods: {
        doIng(flag) {
            flag ? this.$emit('add') : this.$emit('min')
        }
    },
    computed: {
        nowMinColor() {
            return this.value == this.min ? this.disableColr : this.color
        },
        nowAddColor() {
            return this.value == this.max ? this.disableColr : this.color
        }
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
        border-radius: 3px;
        text-align: center;
        // border: none;
        outline: none;
        background-color: #fff;
    }
    .border {
        border-radius: 50%;
        margin: 0 5px;
    }
}
</style>
