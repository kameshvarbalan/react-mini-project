import React, { useEffect } from 'react'
import { useLoggedInUser } from '../util/localStorage'
import { Link, useNavigate } from 'react-router-dom'
import '../css_files/home.css'
import Logo from '../images/logo.png'

function Home() {
    const navigate = useNavigate();
    const isLoggedIn = useLoggedInUser();
    
    useEffect(() => {
        if(isLoggedIn === 'yes') {
            navigate('/dashboard')
        }
    }, [isLoggedIn, navigate])
    if(isLoggedIn === 'unknown') {
        return <div>Loading...</div>
    }
    return (
    <div className="home_body"> 
        <div className="home_navigation">
            <div className="home_head">
                <h1 className="home_header">Welcome to Threadit</h1>
                <img src={Logo} className='logo' alt='logo'></img>
            </div>
            <ul className="home_list">
                <li className="home_element"><Link to="/register">Register</Link></li>
                <li className="home_element"><Link to="/login">Login</Link></li>
            </ul>
        </div>
    </div>)
}

export default Home