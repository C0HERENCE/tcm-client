import request from "@/utils/request";

const userApi = {
  Login: "/api/auth/login",
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