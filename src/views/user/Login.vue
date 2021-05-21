<template>
  <div class="main">
    <a-form id="formLogin" class="user-layout-login" ref="formLogin" :form="form" @submit="handleSubmit">
      <a-tabs :tabBarStyle="{ textAlign: 'center', borderBottom: 'unset' }">
        <!--        用户名密码登录-->
        <a-tab-pane key="tab1" :tab="$t('user.login.tab-login-credentials')">
          <!--          错误提示-->
          <a-alert v-if="isLoginError" type="error" showIcon style="margin-bottom: 24px;"
                   :message="$t('user.login.message-invalid-credentials')"/>
<!--          用户名-->
          <a-form-item>
            <a-input size="large" type="text" :placeholder="$t('user.login.username.placeholder')"
                     v-decorator="[
                         'username', {
                           rules: [
                               { required: true, message: $t('user.userName.required') },
                               { validator: handleUsernameOrEmail }
                               ],
                                validateTrigger: 'change'
                         }]">
              <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }"/>
            </a-input>
          </a-form-item>
<!--          密码-->
          <a-form-item>
            <a-input-password
                size="large"
                :placeholder="$t('user.login.password.placeholder')"
                v-decorator="[
                'password',
                {rules: [{ required: true, message: $t('user.password.required') }], validateTrigger: 'blur'}
              ]">
              <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }"/>
            </a-input-password>
          </a-form-item>
        </a-tab-pane>
      </a-tabs>

      <!--      记住我，忘记密码-->
      <a-form-item>
        <a-checkbox v-decorator="['rememberMe', { valuePropName: 'checked' }]">
          {{ $t('user.login.remember-me') }}
        </a-checkbox>
<!--        TODO 忘记密码-->
<!--        <router-link :to="{ name: 'Recover', params: { user: 'aaa'} }" class="forge-password" style="float: right;">-->
<!--          {{ $t('user.login.forgot-password') }}-->
<!--        </router-link>-->
      </a-form-item>

      <!--      登录按钮-->
      <a-form-item style="margin-top:24px">
        <a-button size="large" type="primary" htmlType="submit" class="login-button" :loading="state.loginBtn"
                  :disabled="state.loginBtn">
          {{ $t('user.login.login') }}
        </a-button>
      </a-form-item>

      <!--      注册链接-->
      <div class="user-login-other">
        <router-link class="register" :to="{ name: 'Register' }">{{ $t('user.login.signup') }}</router-link>
      </div>
    </a-form>
  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  data() {
    return {
      loginBtn: false,
      // user type: 0 email, 1 username
      loginType: 0,
      isLoginError: false,
      form: this.$form.createForm(this),
      state: {
        time: 60,
        loginBtn: false,
        loginType: 0,
      }
    }
  },
  created() {

  },
  methods: {
    ...mapActions(['Login', 'Logout']),
    // handler
    handleUsernameOrEmail(rule, value, callback) {
      const {state} = this
      const regex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
      if (regex.test(value)) {
        state.loginType = 0
      } else {
        state.loginType = 1
      }
      callback()
    },
    handleSubmit(e) {
      e.preventDefault()
      const {
        form: {validateFields},
        state,
        Login
      } = this
      state.loginBtn = true
      // 表单校验 username 和 password
      // Function([fieldNames: string[]], [options: object], callback: Function(errors, values))
      validateFields(['username', 'password'], {force: true}, (err, values) => {
        if (err) {
          setTimeout(() => state.loginBtn = false, 600)
          return;
        }
        Login(values)
            .then((res) => {
              if (res.status === 200) {
                if (res.data.isAdmin) {
                  this.$store.commit("IS_ADMIN", true)
                  this.$store.commit("SET_ROLES", res.data.roles)
                  document.location='/admin'
                }
                else {
                  document.location = "/"
                  this.$store.commit("IS_ADMIN", false)
                }
                // 延迟 1 秒显示欢迎信息
                setTimeout(() => {
                  this.$notification.success({
                    message: '欢迎',
                    description: `${res.data.username}，` + this.$t('views.home.welcome'),
                  })
                }, 1000)
                this.isLoginError = false
              }
              else
              {
                this.isLoginError = true;
                this.$message.error(res.message)
              }
            })
            .catch((err) => {
              this.isLoginError = true
              console.log(err)
            })
            .finally(() => state.loginBtn = false)
      })
    },
  }
}
</script>

<style scoped>
.user-layout-login label {
  font-size: 14px;
}

.user-layout-login .forge-password {
  font-size: 14px;
}

.user-layout-login button.login-button {
  padding: 0 15px;
  font-size: 16px;
  height: 40px;
  width: 100%;
}

.user-layout-login .user-login-other {
  text-align: left;
  margin-top: 24px;
  line-height: 22px;
}

.user-layout-login .user-login-other .register {
  float: right;
}
</style>