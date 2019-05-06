<template>
<div>
    <P>{{BASE_URL}}</p>
    <P>{{IMG_URL}}</p>
</div>
</template>

<script>
//底部导般
export default {
    data:function(){
        return {
            BASE_URL:process.env.BASE_URL,
            IMG_URL:process.env.IMG_URL,

        }
    }
}
</script>

<style>

</style>
