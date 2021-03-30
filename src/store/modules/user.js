import storage from "store";
import { login } from "@/api/login";
import { ACCESS_TOKEN } from "@/store/mutation-types";

export default {
  state: {
    token: "",
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
  },

  actions: {
    Login({ commit }, { username, password }) {
      return new Promise((resolve, reject) => {
        login(username, password)
          .then((response) => {
            const token = response.data;
            // 保存token至local storage和vuex store
            storage.set(ACCESS_TOKEN, token, 7 * 24 * 60 * 60 * 1000);
            commit("SET_TOKEN", token);
            resolve();
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
