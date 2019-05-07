<template>
    <div>list</div>
</template>

<script>
import pageList from "@/mixins/pageList";
export default {
    mixins:[pageList],
    created(){
        this.initList()
    },
    methods:{
        loadData(){
            console.log('请求数据')
        }
    }
}
</script>

<style>

</style>
