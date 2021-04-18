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
        'phone-number': {
            'required': 'Mobile number is required'
        },
        login: {
            'login': 'Login',
            'remember-me': 'Remember Me',
            'forgot-password': 'Forget Password',
            'tab-login-credentials': 'Using Credentials',
            'tab-login-mobile': 'Using Phone',
            'signup': 'Sign up a new account',
            'mobile': {
                'placeholder': 'Input your mobile number',
                'verification-code': {
                    'placeholder': 'Input the code you received',
                }
            },
            'message-invalid-credentials': 'Invalid credentials'
        },
        register: {
            'get-verification-code': 'Get Code',
            'sign-in': 'Goto Sign in',
            'register': 'Register',
            'email': {
                'placeholder': 'Input your email address'
            },
            'password': {
                'placeholder': 'Input your password',
                'popover-message': 'The password must contains at least 6 characters'
            },
            'confirm-password': {
                'placeholder': 'Repeat the password'
            },
        }
    }
}