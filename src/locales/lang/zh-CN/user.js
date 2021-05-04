export default {
    user: {
        'email': {
            required: '电子邮箱是必填项'
        },
        'password': {
            required: '密码是必填项',
            strength: {
                'short': '你的密码太端了',
                'low': '你的密码太弱了',
                'medium': '密码强度中等',
                'strong': '你的密码很强',
                'msg': '你的密码是无效的'
            },
        },
        login: {
            'login': '登录',
            'remember-me': '记住我',
            'forgot-password': '忘记密码',
            'tab-login-credentials': '用户名密码',
            'signup': '注册一个新账号',
            'message-invalid-credentials': '账号或密码错误',
            'mobile': {
                'verification-code':{
                    'placeholder': '请输入6位验证码'
                }
            }
        },
        register: {
            'get-verification-code': '发送验证码',
            'sign-in': '前往登录',
            'register': '注册',
            'email': {
                'placeholder': '请输入电子邮箱',
            },
            'password': {
                'placeholder': '请输入密码',
                'popover-message': '密码至少6位',
                'required': '密码是必填项'
            },
            'confirm-password': {
                'placeholder': '请再次输入密码'
            },
        }
    }
}