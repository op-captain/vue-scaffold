import _ from 'lodash'
export default {
    //图片上传
    uploadFile:()=>{    

    },
    getUrlAllParams(){
            // 解决乱码问题
            var url = decodeURIComponent(window.location.href)
            var res = {}
            var url_data = _.split(url, '?').length > 1 ? _.split(url, '?')[1] : null ;
            if (!url_data) return null
            var params_arr = _.split(url_data, '&')
            _.forEach(params_arr, function(item) {
                var key = _.split(item, '=')[0]
                var value = _.split(item, '=')[1]
                res[key] = value
            }); 
            return res
    }
}