import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../images/logo.png';
import '../css_files/nav.css';
import Src from '../images/search.jpeg';
import Post from '../images/newpost.png';
import Msg from '../images/message.png';
import Notif from '../images/notif.jpeg';
import Logout from '../images/logout.jpeg';
import Profile from '../images/profile.jpeg';

const NavBar = () => {
    
    const handleSearch = () => {
        return (<h2>Searching..</h2>)
    }

    const newPost = () => {

    }

    return (
        <div className="nav">
            <img src={Logo} className="Logo" alt="logo"></img>
            <h3 className="head">Threadit</h3>
            <div className="nav_search">
                <input type="text" placeholder="Browse Threads" id='nav_searchBar'/>
                <img src={Src} alt="logo" className="nav_searchLogo" onClick={handleSearch}></img>
            </div>
            <div className="nav_space"></div>
            <div className="nav_newPost">
                <img src={Post} alt="post" className="nav_post" onClick={newPost}></img>
                <p id="nav_pt">New Thread</p>
            </div>
            <div className="nav_messages">
                <img src={Msg} alt="msg" className="nav_msg"></img>
                <p id="nav_mt">Messages</p>
            </div>
            <div className="nav_notifs">
                <img src={Notif} alt="notification" className="nav_not"></img>
                <p id="nav_nt">Notifications</p>
            </div>
            <Link to='/logout'>
                <div className="nav_logout">
                    <img src={Logout} alt="logout" className="nav_out"></img>
                    <p id="nav_lt">Logout</p>
                </div>           
            </Link>
            <div className="nav_profile">
                <img src={Profile} alt="profile" className="nav_p"></img>
                <p id="nav_pt">My Profile</p>
            </div>
        </div>
    );
}

export default NavBar