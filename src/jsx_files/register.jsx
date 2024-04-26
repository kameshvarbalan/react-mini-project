import React, {useState} from 'react'
import { _dumpLocalStorage, createUser } from '../util/localStorage'
import { useNavigate } from 'react-router-dom'
import '../css_files/register.css'
import Logo from '../images/logo.png'

function Register() {
    const navigate = useNavigate()

    const [username,setUsername] = useState('')
    const [password, setPassword] = useState('')
    function registerUser(event) {
        event.preventDefault()
        const response = createUser({username,password})

        if(response.status === 'success') {
            alert("Registration Successful,  Proceed to Login")
            navigate("/login", {replace: true})
        }
        else {
            alert(response.error)
        }

        _dumpLocalStorage()
    }

    return (
    <div className='register_body'>
        <form className="register_form" onSubmit={registerUser}>
            <div className="register_head">
                <h1 className='register_header'>Create New Account</h1>
                <img src={Logo} className='register_logo' alt='logo'></img>
            </div>
            <input type="text" placeholder="Username" value={username} onChange={event => setUsername(event.target.value)}/><br/>
            <input type="password" placeholder="Password" value={password} onChange={event => setPassword(event.target.value)}/><br/>
            <input type= "submit" value="Register" /><br/>
        </form>
    </div>)
}

export default Register