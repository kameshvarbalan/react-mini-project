import React, { useEffect } from 'react';
import { useLoggedInUser } from '../util/localStorage';
import { useNavigate} from 'react-router-dom';
import NavBar from './nav.jsx';
import Panel from './panel.jsx';
import Thread from './thread.jsx';
import '../css_files/main.css';

const Main = () => {
    const [isLoggedIn] = useLoggedInUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn === 'no') {
            navigate('/');
        }
    }, [isLoggedIn, navigate]);

    if (isLoggedIn === 'unknown') {
        return <h2>Loading...</h2>;
    }

    return(
        <div className="main">
            <div className="main_nav">
                <NavBar />
            </div>
            <div className="Sep">
                <div className="main_panel">
                    <Panel />
                </div>
                <div className="main_thread">
                    <Thread />
                </div>
            </div>
        </div>
    );
}

export default Main