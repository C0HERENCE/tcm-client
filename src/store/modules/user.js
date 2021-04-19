import storage from "store";
import {login} from "@/api/user";
import {ACCESS_TOKEN} from "@/store/mutation-types";

export default {
    state: {
        token: storage.get(ACCESS_TOKEN),
        username: storage.get("USER_NAME")
    },

    getters: {
        isLogin : state => {
            return state.token != undefined && state.token != null && state.token !== "" && state.token !== false
        }
    },

    mutations: {
        SET_TOKEN: (state, param) => {
            if (param !== null) {
                state.token = param.token;
                state.username = param.username;
                storage.set(ACCESS_TOKEN, param.token, 7 * 24 * 60 * 60 * 1000);
                storage.set("USER_NAME", param.username, 7 * 24 * 60 * 60 * 1000);
            } else {
                state.token = undefined;
                state.username = undefined
                storage.remove("USER_NAME");
                storage.remove(ACCESS_TOKEN);
            }
        },
    },

    actions: {
        Login({commit}, {username, password}) {
            return new Promise((resolve, reject) => {
                login(username, password)
                    .then((response) => {
                        if (response.status === 200) {
                            // 保存token至local storage和vuex store
                            commit("SET_TOKEN", response.data);
                        }
                        resolve(response);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },

        Logout({commit}) {
            return new Promise((resolve) => {
                // 清空token
                commit("SET_TOKEN", null);
                resolve();
            });
        },
    },
};
