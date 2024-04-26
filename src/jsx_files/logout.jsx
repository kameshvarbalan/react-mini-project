import React, {useEffect} from 'react'
import {logoutUser} from '../util/localStorage'
import {useNavigate} from 'react-router-dom'

function Logout() {
    const navigate = useNavigate()

    useEffect(()=> {
        const confirmLogout = window.confirm('Are you sure you want to logout ?');
        if (confirmLogout) {
            logoutUser();
            navigate('/', { replace: true });
            alert('Logout Successful');
        }
        else {
            navigate('/main');
        }
    }, [navigate])

    return <h1> Logging Out.. </h1>
}

export default Logout