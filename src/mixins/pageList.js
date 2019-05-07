export default {
    data() {
        return {
            list: [], //数据集合
            page: 0, //当前页码
            limit: 10,   //每页显示的条数
            total: 0 //数据总条数
        }
    },
    methods: {
        /**
         * 获取请求参数 默认只传递page(页码) limit(每页条数) 可以由调用方传递指定对象合并(或者覆盖)原参数
         * @param params
         * @returns {*}
         */
        getParams(params) {
            return Object.assign({
                page: this.page,
                limit: this.limit
            }, params)
        },
        /**
         * 加载更多
         */
        loadMore() {
            this.page++
        },
        /**
         * 推送到list中 因为vue的监听特性 只能用push进行数据的添加 如果有特殊处理 通过传递一个filter来过滤数据
         * @param list
         * @param filter
         */
        pushToList(list, filter) {
            list.forEach((item) => {
                if (typeof filter === 'function') {
                    this.list.push(filter(item))
                } else {
                    this.list.push(item)
                }
            })
        },
        /**
         * 初始化列表
         */
        initList() {
            this.page = 1
            this.list = []
            this.loadData()
        },
        /**
         * @overwrite
         * 加载数据方法 用到该mixin的都应该重写该方法 否则无法实现加载数据
         */
        loadData() {
            // 每个列表自己的获取数据的方法需要重写
        }
    }
}