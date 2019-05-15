import Vue from 'vue'

Vue.filter('datetimeToDate',function(value){
    if (!value) return ''
    value = value.toString()
    return value.slice(0,11);
})