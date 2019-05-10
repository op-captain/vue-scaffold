<template>
    <div @click="sendLogin">
        login
    </div>
</template>

<script>
import {mapActions} from 'vuex'
import utils from '../utils/utils'
export default {
    methods:{
        ...mapActions(['Login']),
        sendLogin(){
            this.Login({username:'zz',password:'123'}).then((res)=>{

                //登录成功后，跳转到之前的页面
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
