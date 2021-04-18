import axios from "axios";
import store from "@/store";
import storage from "store";
import notification from "ant-design-vue/es/notification";
import { ACCESS_TOKEN } from "@/store/mutation-types";

const request = axios.create({
  timeout: 15000,
});

// 异常拦截处理器
const errorHandler = (error) => {
  if (!error.response) return Promise.reject(error);
  const data = error.response.data;
  const token = storage.get(ACCESS_TOKEN);
  // 403：访问被禁止
  if (error.response.status === 403) {
    notification.error({
      message: "Forbidden",
      description: data.message,
    });
  }
  // 401：无权限
  else if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
    notification.error({
      message: "Unauthorized",
      description: "Authorization verification failed",
    });
    if (token) {
      // 登出账号, 刷新
      store.dispatch("Logout").then(() => {
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      });
    }
  }
  // 500 等
  else {
    notification['error']({
      message: '错误',
      description: '请求出现错误，请稍后再试',
      duration: 4
    })
  }

  return Promise.reject(error);
};

// 请求拦截器
request.interceptors.request.use((config) => {
  const token = storage.get(ACCESS_TOKEN);
  // 如果 token 存在
  if (token) {
    config.headers["Authorization"] = "Bearer " + token;
  }
  return config;
}, errorHandler);

// 响应拦截器
request.interceptors.response.use((response) => {
  return response.data;
}, errorHandler);

export default request;
