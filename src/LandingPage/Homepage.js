import React from 'react'
import HeroComponent from './Components/HeroComponent'
import Footer from './Components/Footer'
import NavBar from './Components/NavBar'

function HomePage() {
    return (
        <>
            <NavBar />
            <HeroComponent />
            <Footer />
        </>
    )
}

export default HomePage