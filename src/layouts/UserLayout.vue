<template>
  <div id="userLayout" class="user-layout-wrapper">
    <div class="container">
<!--      语言-->
      <div class="user-layout-lang">
        <select-lang class="select-lang-trigger" />
      </div>
<!--      主内容-->
      <div class="user-layout-content">
<!--        顶部标题-->
        <div class="top">
          <div class="header">
            <a href="/">
              <img src="~@/assets/logo.png" class="logo" alt="logo">
              <span class="title">{{ $t('layouts.userLayout.title') }}</span>
            </a>
          </div>
          <div class="desc">
            {{ $t('layouts.userLayout.subtitle') }}
          </div>
        </div>

        <router-view />
<!--        底部-->
        <div class="footer">
          <div class="links">
            <a href="#">帮助</a>
            <a href="#">隐私</a>
            <a href="#">条款</a>
          </div>
          <div class="copyright">
            Copyright &copy; 2021 TCM
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SelectLang from '@/components/SelectLang';
export default {
  name: "UserLayout",
  components: {
    SelectLang
  }
}
</script>

<style scoped>
#userLayout.user-layout-wrapper {
  height: 100%;
}
#userLayout.user-layout-wrapper.mobile .container .main {
  max-width: 368px;
  width: 98%;
}
#userLayout.user-layout-wrapper .container {
  width: 100%;
  min-height: 100%;
  /*background: #f0f2f5 url(~@/assets/background.svg) no-repeat 50%;*/
  background-size: 100%;
  position: relative;
}
#userLayout.user-layout-wrapper .container .user-layout-lang {
  width: 100%;
  height: 40px;
  line-height: 44px;
  text-align: right;
}
#userLayout.user-layout-wrapper .container .user-layout-lang .select-lang-trigger {
  cursor: pointer;
  padding: 12px;
  margin-right: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  vertical-align: middle;
}
#userLayout.user-layout-wrapper .container .user-layout-content {
  padding: 32px 0 24px;
}
#userLayout.user-layout-wrapper .container .user-layout-content .top {
  text-align: center;
}
#userLayout.user-layout-wrapper .container .user-layout-content .top .header {
  height: 44px;
  line-height: 44px;
}
#userLayout.user-layout-wrapper .container .user-layout-content .top .header .badge {
  position: absolute;
  display: inline-block;
  line-height: 1;
  vertical-align: middle;
  margin-left: -12px;
  margin-top: -10px;
  opacity: 0.8;
}
#userLayout.user-layout-wrapper .container .user-layout-content .top .header .logo {
  height: 44px;
  vertical-align: top;
  margin-right: 16px;
  border-style: none;
}
#userLayout.user-layout-wrapper .container .user-layout-content .top .header .title {
  font-size: 33px;
  color: rgba(0, 0, 0, 0.85);
  font-family: Avenir, 'Helvetica Neue', Arial, Helvetica, sans-serif;
  font-weight: 600;
  position: relative;
  top: 2px;
}
#userLayout.user-layout-wrapper .container .user-layout-content .top .desc {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.45);
  margin-top: 12px;
  margin-bottom: 40px;
}
#userLayout.user-layout-wrapper .container .user-layout-content .main {
  min-width: 260px;
  width: 368px;
  margin: 0 auto;
}
#userLayout.user-layout-wrapper .container .user-layout-content .footer {
  width: 100%;
  bottom: 0;
  padding: 0 16px;
  margin: 48px 0 24px;
  text-align: center;
}
#userLayout.user-layout-wrapper .container .user-layout-content .footer .links {
  margin-bottom: 8px;
  font-size: 14px;
}
#userLayout.user-layout-wrapper .container .user-layout-content .footer .links a {
  color: rgba(0, 0, 0, 0.45);
  transition: all 0.3s;
}
#userLayout.user-layout-wrapper .container .user-layout-content .footer .links a:not(:last-child) {
  margin-right: 40px;
}
#userLayout.user-layout-wrapper .container .user-layout-content .footer .copyright {
  color: rgba(0, 0, 0, 0.45);
  font-size: 14px;
}
#userLayout.user-layout-wrapper .container a {
  text-decoration: none;
}
</style>