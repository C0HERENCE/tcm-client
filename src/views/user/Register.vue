<template>
  <div class="main user-layout-register">
    <h3><span>{{ $t('user.register.register') }}</span></h3>
    <a-form ref="formRegister" :form="form" id="formRegister">
      <a-form-item>
        <a-input
            size="large"
            type="text"
            :placeholder="$t('user.register.email.placeholder')"
            v-decorator="['email', {rules: [{ required: true, type: 'email', message: $t('user.email.required') }], validateTrigger: ['change', 'blur']}]"
        ></a-input>
      </a-form-item>

      <a-popover
          placement="rightTop"
          :trigger="['focus']"
          :getPopupContainer="(trigger) => trigger.parentElement"
          v-model="state.passwordLevelChecked">
        <template slot="content">
          <div :style="{ width: '240px' }" >
            <div :class="['user-register', passwordLevelClass]">{{ $t(passwordLevelName) }}</div>
            <a-progress :percent="state.percent" :showInfo="false" :strokeColor=" passwordLevelColor " />
            <div style="margin-top: 10px;">
              <span>{{ $t('user.register.password.popover-message') }}
              </span>
            </div>
          </div>
        </template>
        <a-form-item>
          <a-input-password
              size="large"
              @click="handlePasswordInputClick"
              :placeholder="$t('user.register.password.placeholder')"
              v-decorator="['password', {rules: [{ required: true, message: $t('user.password.required') }, { validator: this.handlePasswordLevel }], validateTrigger: ['change', 'blur']}]"
          ></a-input-password>
        </a-form-item>
      </a-popover>

      <a-form-item>
        <a-input-password
            size="large"
            :placeholder="$t('user.register.confirm-password.placeholder')"
            v-decorator="['password2', {rules: [{ required: true, message: $t('user.password.required') }, { validator: this.handlePasswordCheck }], validateTrigger: ['change', 'blur']}]"
        ></a-input-password>
      </a-form-item>

<!--      <a-form-item>-->
<!--        <a-input size="large" :placeholder="$t('user.login.mobile.placeholder')" v-decorator="['mobile', {rules: [{ required: true, message: $t('user.phone-number.required'), pattern: /^1[3456789]\d{9}$/ }, { validator: this.handlePhoneCheck } ], validateTrigger: ['change', 'blur'] }]">-->
<!--          <a-select slot="addonBefore" size="large" defaultValue="+86">-->
<!--            <a-select-option value="+86">+86</a-select-option>-->
<!--            <a-select-option value="+87">+87</a-select-option>-->
<!--          </a-select>-->
<!--        </a-input>-->
<!--      </a-form-item>-->

      <a-row :gutter="16">
        <a-col class="gutter-row" :span="16">
          <a-form-item>
            <a-input size="large" type="text" :placeholder="$t('user.login.mobile.verification-code.placeholder')" v-decorator="['captcha', {rules: [{ required: true, message: '请输入验证码' }], validateTrigger: 'blur'}]">
              <a-icon slot="prefix" type="mail" :style="{ color: 'rgba(0,0,0,.25)' }"/>
            </a-input>
          </a-form-item>
        </a-col>
        <a-col class="gutter-row" :span="8">
          <a-button
              class="getCaptcha"
              size="large"
              :disabled="state.smsSendBtn"
              @click.stop.prevent="getCaptcha"
              v-text="!state.smsSendBtn && $t('user.register.get-verification-code')||(state.time+' s')"></a-button>
        </a-col>
      </a-row>

      <a-form-item>
        <a-button
            size="large"
            type="primary"
            htmlType="submit"
            class="register-button"
            :loading="registerBtn"
            :disabled="registerBtn"
            @click.stop.prevent="handleSubmit">{{ $t('user.register.register') }}
        </a-button>
        <router-link class="login" :to="{ name: 'Login' }">{{ $t('user.register.sign-in') }}</router-link>
      </a-form-item>

    </a-form>
  </div>
</template>

<script>
import {register, sendCaptcha} from "@/api/user";

const levelNames = {
  0: 'user.password.strength.short',
  1: 'user.password.strength.low',
  2: 'user.password.strength.medium',
  3: 'user.password.strength.strong'
}
const levelClass = {
  0: 'error',
  1: 'error',
  2: 'warning',
  3: 'success'
}
const levelColor = {
  0: '#ff0000',
  1: '#ff0000',
  2: '#ff7e05',
  3: '#52c41a'
}
export default {
  name: 'Register',
  components: {
  },
  data () {
    return {
      form: this.$form.createForm(this),
      state: {
        time: 60,
        level: 0,
        smsSendBtn: false,
        passwordLevel: 0,
        passwordLevelChecked: false,
        percent: 10,
        progressColor: '#FF0000'
      },
      registerBtn: false
    }
  },
  computed: {
    passwordLevelClass () {
      return levelClass[this.state.passwordLevel]
    },
    passwordLevelName () {
      return levelNames[this.state.passwordLevel]
    },
    passwordLevelColor () {
      return levelColor[this.state.passwordLevel]
    }
  },
  methods: {
    handlePasswordLevel (rule, value, callback) {
      if (value === '') {
        return callback()
      }
      if (value.length >= 6) {
        this.state.level = 3
      } else {
        this.state.level = 0
        callback(new Error(this.$t('user.password.strength.msg')))
      }
      this.state.passwordLevel = this.state.level
      this.state.percent = this.state.level * 33
      callback()
    },
    handlePasswordCheck (rule, value, callback) {
      const password = this.form.getFieldValue('password')
      // console.log('value', value)
      if (value === undefined) {
        callback(new Error(this.$t('user.password.required')))
      }
      if (value && password && value.trim() !== password.trim()) {
        callback(new Error(this.$t('user.password.twice.msg')))
      }
      callback()
    },
    handlePhoneCheck (rule, value, callback) {
      console.log('handlePhoneCheck, rule:', rule)
      console.log('handlePhoneCheck, value', value)
      console.log('handlePhoneCheck, callback', callback)
      callback()
    },
    handlePasswordInputClick () {
      if (!this.isMobile) {
        this.state.passwordLevelChecked = true
        return
      }
      this.state.passwordLevelChecked = false
    },
    // 提交表单
    handleSubmit () {
      const { form: { validateFields }, state, $router } = this
      // 验证表单
      validateFields({ force: true }, (err, values) => {
        console.log(values)
        if (!err) {
          // 验证通过
          this.registerBtn = true
          state.passwordLevelChecked = false
          register(values)
              .then(res => {
                this.$message.info(res.message);
                if (res.status === 200) {
                  $router.push({name: 'Login'})
                }
              })
          .finally(() => this.registerBtn = false)
        }
      })
    },
    getCaptcha (e) {
      e.preventDefault()
      const {form: {validateFields}}  = this
      validateFields(['email'], { force: true }, (err, values) => {
        if (!err) {
          console.log(values)
          sendCaptcha(values).then(res => {
            if (res.status === 200) {
              this.$message.success("验证码已发送，请检查你的邮箱")
            } else {
              this.$message.error(res.message)
            }
          })
        }
      })
    },
    requestFailed (err) {
      this.$notification['error']({
        message: '错误',
        description: ((err.response || {}).data || {}).message || '请求出现错误，请稍后再试',
        duration: 4
      })
    }
  },
  watch: {
    'state.passwordLevel' (val) {
      console.log(val)
    }
  }
}
</script>

<style scoped>
.user-layout-register > h3 {
  font-size: 16px;
  margin-bottom: 20px;
}
.user-layout-register .getCaptcha {
  display: block;
  width: 100%;
  height: 40px;
}
.user-layout-register .register-button {
  width: 50%;
}
.user-layout-register .login {
  float: right;
  line-height: 40px;
}

</style>