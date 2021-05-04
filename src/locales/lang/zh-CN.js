import antdZhCn from 'ant-design-vue/es/locale-provider/zh_CN'
import user from './zh-CN/user'
import layouts from "@/locales/lang/zh-CN/layouts";
import views from "@/locales/lang/zh-CN/views";

const components = {
    antLocale: antdZhCn,
}

export default {
    message: '-',
    ...components,
    ...user,
    ...layouts,
    ...views
}