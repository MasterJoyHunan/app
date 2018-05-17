export const title = state => state.title
export const showBack = state => state.showBack
export const showTitle = state => state.showTitle
export const showMore = state => state.showMore
export const user = state => state.user
export const showBottom = state => state.showBottom
export const cart = state => state.cart
export const cartNum = state => {
    let i = 0
    state.cart.map(item => {
        i += item.num
    })
    return i
}