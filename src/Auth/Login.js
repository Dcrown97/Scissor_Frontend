import React from 'react'
import LoginComponent from './Component/LoginComponent'
import NavBar from '../LandingPage/Components/NavBar'
import Footer from '../LandingPage/Components/Footer'

function Login() {
    return (
        <div>
            <NavBar />
            <LoginComponent />
            <Footer />
        </div>
    )
}

export default Login