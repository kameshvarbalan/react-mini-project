import React, {useState} from 'react'
import { loginUser } from '../util/localStorage'
import { useNavigate } from 'react-router-dom'
import '../css_files/login.css'
import Logo from '../images/logo.png'

export default function Login() {
    const navigate = useNavigate()

    const [username,setUsername] = useState('')
    const [password, setPassword] = useState('')
    function attemptloginUser(event) {
        event.preventDefault()
        const response = loginUser({username,password})

        if(response.status === 'success') {
            navigate("/main", {replace: true})
            alert("Login Successful")
        }
        else {
            alert(response.error)
        }
    }

    return (
    <div className="login_body">
        <form className="login_form" onSubmit={attemptloginUser}>
            <div className="login_head">
                <h1 className="login_header">Threadin</h1>
                <img src={Logo} className='login_logo' alt='logo'></img>
            </div>
            <input type="text" placeholder="Username" value={username} onChange={event => setUsername(event.target.value)}/><br/>
            <input type="password" placeholder="Password" value={password} onChange={event => setPassword(event.target.value)}/><br/>
            <input type= "submit" value="Login" /><br/>
        </form>
    </div>)
}