import React from 'react'
import { RegisterPage } from './Register'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title:"Register",
    description: "Create an Account"
}
function Register() {
    return (
        <RegisterPage />
    )
}

export default Register