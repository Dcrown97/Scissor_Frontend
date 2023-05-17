import React from 'react'
import DashboardNav from './Components/DashboardNav'
import Footer from '../LandingPage/Components/Footer'
import Home from './Components/Home'

function Dashboard() {
    return (
        <div>
            <DashboardNav />
            <Home />
            <Footer />
        </div>
    )
}

export default Dashboard