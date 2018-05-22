<template>
    <div id="address-list">
        <div class="not-address"
            v-if="addressList.length == 0">
            <svg-icon icon-class="address"
                color="#dc7433"
                size="100"></svg-icon>
            <p class="text">暂时没有添加地址</p>
            <div class="add-new-address"
                @click="addnew">添加新的地址</div>
        </div>
        <div class="address-list"
            v-else>
            <div class="address"
                v-for="(item, index) in addressList"
                :key="index">
                <div class="name">
                    <span>{{item.name}}</span>
                    <span>{{item.tel}}</span>
                </div>
                <div class="address-detail">{{item.province}},{{item.city}},{{item.area}},{{item.address}}</div>
                <div class="action">
                    <div v-if="item.is_default == 1">默认地址</div>
                    <div v-else
                        @click="handelSetDefault(item, index)">
                        <check-icon></check-icon>设为默认</div>
                    <div class="action-btn">
                        <div class="btn"
                            @click="handelEdit(item, index)">
                            <svg-icon size="15"
                                icon-class="edit"></svg-icon>修改</div>
                        <div class="btn"
                            @click="handelDelete(item, index)">
                            <svg-icon size="15"
                                icon-class="delete"></svg-icon>删除</div>
                    </div>
                </div>
            </div>
            <div class="add-new-address2"
                @click="addnew">添加新的地址</div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { CheckIcon } from 'vux'
import request from '@/components/common/js/request'
export default {
    name: 'address-list',
    created() {
        // if (this.addressList.length == 0) {
        //     this.initAddress()
        // }
    },
    methods: {
        //添加新地址
        addnew() {
            this.$router.push('/addAddress')
        },
        handelEdit(item, index) {
            this.$router.push({ path: '/addAddress', query: { id: item.id, index } })
        },
        // 删除地址
        handelDelete(item, index) {
            const _this = this
            if (item.is_default == 1) {
                this.$vux.alert.show('请不要删除默认地址')
                return
            }
            this.$vux.confirm.show({
                title: '警告',
                content: '是否确认删除',
                onConfirm() {
                    request({
                        url: '/api/address/deleteAddress',
                        method: 'post',
                        data: { address_id: item.id }
                    }).then(res => {
                        _this.deleteAddress(index)
                    }).catch(err => {
                        console.log(err)
                    })
                }
            })
        },
        // 设置默认地址
        handelSetDefault(item, index) {
            const _this = this
            this.$vux.confirm.show({
                title: '警告',
                content: '是否将其设为默认地址',
                onConfirm() {
                    request({
                        url: '/api/address/setDefault',
                        method: 'post',
                        data: { address_id: item.id }
                    }).then(res => {
                        _this.setDefautl(index)
                    }).catch(err => {
                        console.log(err)
                    })
                }
            })
        },
        ...mapMutations({ deleteAddress: 'DELETE_ADDRESS', setDefautl: 'SET_ADDRESS_DEFAULT' }),
        ...mapActions(['initAddress'])
    },
    computed: {
        ...mapGetters(['addressList'])
    },
    components: {
        CheckIcon
    }
}
</script>

<style lang="less">
#address-list {
    width: 100%;
    height: 100%;
    background: #eceef0;
    .not-address {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: #f5f4f7;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        .text {
            margin-top: 10px;
        }
        .add-new-address {
            color: #fff;
            margin-top: 20px;
            // border: 1px solid #dc7433;
            background-color: #dc7433;
            padding: 5px 20px;
            border-radius: 3px;
        }
    }
    .address-list {
        width: 100%;
        height: ~"calc(100% - 84px - 9px)";
        padding-top: 5px;
        overflow-y: scroll;
        .address {
            background: #fff;
            font-size: 15px;
            padding: 0 10px;
            margin-bottom: 5px;
            line-height: 35px;
            .name {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .address-detail {
                padding-bottom: 10px;
                border-bottom: 1px solid #ccc;
            }
            .action {
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: 13px;
                .action-btn {
                    color: #ccc;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .svg-icon {
                        margin-right: 5px;
                    }
                    .btn {
                        margin-left: 25px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                }
            }
        }
        .add-new-address2 {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            margin: 20px;
            padding: 10px;
            font-size: 15px;
            text-align: center;
            background-color: #dc7433;
            color: #fff;
            border-radius: 25px;
        }
    }
}
</style>
