<template>
  <div id="wrap">
    <cube-validator
      ref="username"
      :model="username"
      :rules="usernameRule"
      v-model="resutlValidator.username"
    >
      <cube-input
        v-model="username"
        :clearable="clearable"
        :autocomplete="autocomplete"
        :placeholder="placeholder.username"
      ></cube-input>
    </cube-validator>

    <cube-validator
      ref="password"
      :model="password"
      :rules="passwordRule"
      v-model="resutlValidator.password"
    >
      <cube-input v-model="password" :clearable="clearable" :placeholder="placeholder.password"></cube-input>
    </cube-validator>

    <cube-button :primary="true" @click="sendLogin">登 录</cube-button>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import _ from "lodash";
import utils from "../utils/utils";
import { Validator } from "cube-ui";

//对应表单的数据 和验证规则
let inputs = {
  username: "",
  password: ""
};

let inputs2 = ["username", "password"];

export default {
  created() {
    console.log(this.placeholder);
  },
  data() {
    return {
      ...inputs,
      placeholder: {
        username: "填写用户名",
        password: "填写密码"
      },
      autocomplete: true,
      clearable: {
        //清除按钮的设置
        visible: true,
        blurHidden: true
      },
      usernameRule: {
        //用户名的验证规则
        required: true,
        username: true,
        notWhitespace: true //不允许全是空白字符
      },
      passwordRule: {
        //密码的验证规则
        required: true,
        password: true,
        notWhitespace: true //不允许全是空白字符
      },
      resutlValidator: _.clone(inputs) //验证的结果 (有几个需要验证的表单，就创建几个存放验证结果的空位)
    };
  },
  methods: {
    ...mapActions(["Login"]),
    //验证全部表单
    submitValidator() {
      let validatorAllResultPromise = Object.keys(inputs).map(item =>
        this.$refs[item].validate()
      );

      return Promise.all(validatorAllResultPromise).then(() => {
        let res = _.map(this.resutlValidator, val => val);
        return res.every(v => v);
      });
    },
    //发送登录请求
    sendLogin() {
      this.submitValidator().then(validator => {
        if (validator) {
          this.Login({ username: "zz", password: "123" }).then(res => {
            //登录成功后，跳转到之前的页面
            let redirect = decodeURIComponent(
              this.$route.query.redirect || "/"
            );
            this.$router.push({
              //你需要接受路由的参数再跳转
              path: redirect
            });
          });
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
#wrap{
  margin-top: 60px;
}
.cube-validator_warn {
  input {
    border: solid 1px red;
  }
}
</style>
