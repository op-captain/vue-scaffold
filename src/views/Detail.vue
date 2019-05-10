<template>
    <div>
        <h2>detaile page</h2>
        <ul>
            <li>
                <img src="../assets/images/test1.jpg" alt="">
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    mounted(){
        console.log(this.$route.params)

        let {id,token} = this.$route.params.id
        this.id = id
        this.token = token
    }
}
</script>

<style>

</style>
