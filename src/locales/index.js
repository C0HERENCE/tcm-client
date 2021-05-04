import Vue from 'vue'
import VueI18n from 'vue-i18n'
import storage from 'store'

// default lang
import enUS from './lang/en-US'
import zhCN from './lang/zh-CN'

Vue.use(VueI18n)

export const defaultLang = 'en-US'

let lang = defaultLang
if (storage.get('lang') === 'zh-CN' || storage.get('lang') === 'en-US'){
    lang = storage.get('lang')
} else {
    lang = defaultLang;
}

const messages = {
    'en-US': {
        ...enUS
    },
    'zh-CN': {
        ...zhCN
    }
}


const i18n = new VueI18n({
    silentTranslationWarn: true,
    locale: lang,
    fallbackLocale: defaultLang,
    messages
})


const loadedLanguages = [defaultLang]

function setI18nLanguage (lang) {
    i18n.locale = lang
    document.querySelector('html').setAttribute('lang', lang)
    return lang
}
export function loadLanguageAsync (lang = defaultLang) {
    return new Promise(resolve => {
        // 缓存语言设置
        storage.set('lang', lang)
        if (i18n.locale !== lang) {
            if (!loadedLanguages.includes(lang)) {
                return import(/* webpackChunkName: "lang-[request]" */ `./lang/${lang}`).then(msg => {
                    const locale = msg.default
                    i18n.setLocaleMessage(lang, locale)
                    loadedLanguages.push(lang)
                    return setI18nLanguage(lang)
                })
            }
            return resolve(setI18nLanguage(lang))
        }
        return resolve(lang)
    })
}


export function i18nRender (key) {
    return i18n.t(`${key}`)
}

export default i18n