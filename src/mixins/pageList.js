export default {
    data() {
        return {
            list: [], //数据集合
            page: 0, //当前页码
            limit: 10,   //每页显示的条数
            total: 0 //数据总条数
        }
    },
    computed: {
        totalPage(){
            this.total = this.total - 0;
            return Math.ceil(this.total / this.limit)
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
            this.loadData()
        },
        /**
         * 刷新列表
         */
        refreshList(){
            this.page = 1
            this.list = []
            this.loadData()
        },
        /**
         * 推送到list中 因为vue的监听特性 只能用push进行数据的添加 如果有特殊处理 通过传递一个filter来过滤数据
         * @param list
         * @param filter
         */
        updateList(list, filter) {

            //过滤器处理
            if (typeof filter === 'function') {
                list = list.map((item) => {
                    return filter(item);
                })
            }

            this.list = this.list.concat(list)
        },
        /**
         * 初始化列表
         */
        initList() {
            this.page = 1
            this.list = []
            return this.loadData()
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