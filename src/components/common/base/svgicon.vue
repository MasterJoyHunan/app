<template>
    <svg :class="svgClass" aria-hidden="true" :style="style">
        <use :xlink:href="iconName"></use>
    </svg>
</template>

<script>
export default {
    name: 'svg-icon',
    props: {
        iconClass: {
            type: String,
            required: true
        },
        className: {
            type: String
        },
        size: {
            type: String,
            default: 18
        },
        color: {
            type: String,
            default: `currentColor`
        }
    },
    computed: {
        iconName () {
            return `#icon-${this.iconClass}`
        },
        svgClass () {
            if (this.className) {
                return 'svg-icon ' + this.className
            } else {
                return 'svg-icon'
            }
        },
        style () {
            return `width: ${this.size}px; height: ${this.size}px; fill: ${this.color}`
        }
    }
}
</script>

<style scoped>
.svg-icon {
  overflow: hidden;
}
</style>
