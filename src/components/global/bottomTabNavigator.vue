<template>
<div>
    <P>{{BASE_URL}}</p>
    <P>{{IMG_URL}}</p>
</div>
</template>

<script>
import {mapActions} from 'vuex'

//底部导般
export default {
    mounted:function(){
        this.TOKEN({username:'zj',password:'123'}).then(()=>{
            console.log(this.$store.state.TOKEN)
        })
    },
    methods:{
        ...mapActions(['TOKEN'])
    },
    data:function(){
        return {
            BASE_URL:process.env.API_BASE_URL,
            IMG_URL:process.env.AJAX_TIMEOUT,

        }
    }
}
</script>

<style>

</style>
