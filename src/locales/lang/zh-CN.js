import antdZhCn from 'ant-design-vue/es/locale-provider/zh_CN'
import user from './zh-CN/user'

const components = {
    antLocale: antdZhCn,
}

export default {
    message: '-',
    ...components,
    ...user,
}