import request from "@/utils/request";

const userApi = {
  Login: "/api/auth/login",
  Register: '/api/auth/register',
  Captcha: '/api/auth/captcha'
};

export function login(username, password) {
  return request({
    url: userApi.Login,
    method: "post",
    data: {
      username,
      password,
    },
  });
}

export function register(registerForm) {
  return request({
    url: userApi.Register,
    method: "post",
    data: registerForm
  })
}

export function sendCaptcha(email) {
  return request({
    url: userApi.Captcha,
    method: "post",
    data: email
  })
}