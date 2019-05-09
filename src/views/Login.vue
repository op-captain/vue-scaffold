<template>
    <div @click="sendLogin">
        login
    </div>
</template>

<script>
import {mapActions} from 'vuex'
import utils from '../utils/utils'
export default {
    mounted(){
        let params = utils.getUrlAllParams()
        console.log(params.redirect)
    },
    methods:{
        ...mapActions(['Login']),
        sendLogin(){
            this.Login({username:'zz',password:'123'}).then((res)=>{
                console.log(this.$route.query.redirect)
                console.log(decodeURIComponent(this.$route.query.redirect))
                let redirect = decodeURIComponent(this.$route.query.redirect || '/');
                    this.$router.push({//你需要接受路由的参数再跳转
                    path: redirect
                });
            })
        }
    }
}
</script>

<style>

</style>
