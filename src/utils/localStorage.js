export default {
    /**
   * 设置cookie
   * @param {[type]} key   [键名]
   * @param {[type]} value [键值]
   * @param {[type]} days  [保存的时间（天）]
   */
    setLocalStorage: (key, value, days) => {
        // 设置过期原则
        if (!value) { //值传空就是清除
            localStorage.removeItem(key)
        } else {
            var Days = days || ""; // 默认保留永久保存
            var exp = new Date().getTime() + Days * 24 * 60 * 60 * 1000;

            if (!Days) {
                exp = ""
            }

            localStorage[key] = JSON.stringify({
                value,
                expires: exp
            })
        }
    },
    getLocalStorage: (name) => {
        try {

            if(!localStorage[name]) return null

            let o = JSON.parse(localStorage[name])

            //无对象; 无过期时间; 已过期
            if (!o || (o.expires && o.expires < Date.now())) {
                return null
            } else {
                return o.value
            }
        } catch (e) {
            // 兼容其他localstorage 
            console.log(e)
            return localStorage[name]
        } finally {
        }
    }
}