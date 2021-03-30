import antdEnUs from 'ant-design-vue/es/locale-provider/en_US'
import user from './en-US/user'

const components = {
    antLocale: antdEnUs,
}

export default {
    message: '-',
    ...components,
    ...user,
}