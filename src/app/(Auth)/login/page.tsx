import React from 'react'
import { LoginPage } from './Login'
import { Metadata } from 'next'
export const metadata: Metadata = {
    title: 'Login',
    description:'Login to see creativity of your friends and Others'
}
function Login() {
    return (
        <LoginPage />
    )
}
export default Login