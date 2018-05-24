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
    }
}
export const pageMixin = {
    data() {
        return {
            current_page: 1, // 当前页
            last_page: 0, // 后面还有多少页?
            per_page: 10, // 每页条数
            total: 0 // 数据总条数
        }
    },
    methods: {
        // 每页显示条目改变
        _getData() {
            throw new Error("请先请求数据")
        }
    }
}
