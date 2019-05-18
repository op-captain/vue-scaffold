
import { Validator } from 'cube-ui'


/**
 * 修改默认提示信息
 */
Validator.addMessage('required', '必需填写')
Validator.addMessage('notWhitespace', '无效的空白内容')

/**
 * 自定义规则
 */
let rules = [
    {
        name:'username',
        message:'不能少于2个字符',
        ValidatorCallback:(val, config, type)=>{
            return !config || val.length > 2
        }
    },
    {
        name:'password',
        message:'不能少于6个字符',
        ValidatorCallback:(val, config, type)=>{
            return !config || val.length > 6
        }
    }
]

rules.forEach((item)=>{
    Validator.addRule(item.name, item.ValidatorCallback)
    Validator.addMessage(item.name, item.message)
})
