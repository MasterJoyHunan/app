export const payWayMixin = {
    data() {
        return {
            payFlag: false, // 是否显示加载
            options: [
                { key: "1", value: "内置支付" },
                { key: "2", value: "微信支付(开发中)" },
                { key: "3", value: "支付宝支付(开发中)" }
            ],
            checklist: []
        }
    },
    methods: {
        // 每页显示条目改变
    }
}
