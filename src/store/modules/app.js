import { loadLanguageAsync } from '@/locales'
import storage from 'store'
import {APP_LANGUAGE} from "@/store/mutation-types";

export default {
    state: {
        lang: 'en-US',
    },
    mutations: {
        [APP_LANGUAGE]: (state, lang, antd = {}) => {
            state.lang = lang
            state._antLocale = antd
            storage.set(APP_LANGUAGE, lang)
        },
    },
    actions: {
        setLang ({ commit }, lang) {
            return new Promise((resolve, reject) => {
                commit(APP_LANGUAGE, lang)
                loadLanguageAsync(lang).then(() => {
                    resolve()
                }).catch((e) => {
                    reject(e)
                })
            })
        }
    }
}