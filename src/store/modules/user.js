import storage from "store";
import { login } from "@/api/user";
import { ACCESS_TOKEN } from "@/store/mutation-types";

export default {
  state: {
    token: "",
    username: ""
  },

  getters: {
    isLogin: state => {
      return state.token !== undefined && state.token !== null && state.token.length !== 0
    }
  },

  mutations: {
    SET_TOKEN: (state, param) => {
      state.token = param.token;
      state.username = param.username;
    },
  },

  actions: {
    Login({ commit }, { username, password }) {
      return new Promise((resolve, reject) => {
        login(username, password)
          .then((response) => {
            if (response.status === 200) {
              // 保存token至local storage和vuex store
              storage.set(ACCESS_TOKEN, response.data.token, 7 * 24 * 60 * 60 * 1000);
              commit("SET_TOKEN", response.data);
            }
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    Logout({ commit }) {
      return new Promise((resolve) => {
        // 清空token
        commit("SET_TOKEN", "");
        storage.remove(ACCESS_TOKEN);
        resolve();
      });
    },
  },
};
