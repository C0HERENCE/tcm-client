export default {
    user: {
        'email': {
            required: 'Email address is required'
        },
        'password': {
            required: 'Password is required',
            strength: {
                'short': 'Your password is too short',
                'low': 'Your password is weak',
                'medium': 'Your password is medium',
                'strong': 'Your password is strong',
                'msg': 'Your password is invalid'
            },
        },
        login: {
            'login': 'Login',
            'remember-me': 'Remember Me',
            'forgot-password': 'Forget Password',
            'tab-login-credentials': 'Using Credentials',
            'signup': 'Sign up a new account',
            'message-invalid-credentials': 'Invalid credentials',
            'mobile': {
                'verification-code':{
                    'placeholder':  'Input the 6-digit code'
                }
            }
        },
        register: {
            'get-verification-code': 'Get Code',
            'sign-in': 'Goto Sign in',
            'register': 'Register',
            'email': {
                'placeholder': 'Input your email address',
            },
            'password': {
                'placeholder': 'Input your password',
                'popover-message': 'The password must contains at least 6 characters',
                'required': 'Password is required'
            },
            'confirm-password': {
                'placeholder': 'Repeat the password'
            },
        }
    }
}