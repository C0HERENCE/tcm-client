import antdEnUs from 'ant-design-vue/es/locale-provider/en_US'
import user from './en-US/user'
import layouts from "@/locales/lang/en-US/layouts";
import views from "@/locales/lang/en-US/views";

const components = {
    antLocale: antdEnUs,
}

export default {
    message: '-',
    ...components,
    ...user,
    ...layouts,
    ...views
}