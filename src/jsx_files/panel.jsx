import React from 'react';
import '../css_files/panel.css'
import Home from '../images/home.png'
import Popular from '../images/popular.png'
import All from '../images/all.png'
import Explore from '../images/explore.png'
import Recent from '../images/recents.png'
import More from '../images/more.png'
import Settings from '../images/settings.png'
import Help from '../images/help.png'

const Panel = () => {
  return (
    <div className="panel">
        <div className="panel_div">
            <img src={Home} alt="Home" className="panel_image"></img>
            <p>Home</p>
        </div>
        <div className="panel_div">
            <img src={Popular} alt="Popular" className="panel_image"></img>
            <p>Popular</p>
        </div>
        <div className="panel_div">
            <img src={Explore} alt="Explore" className="panel_image"></img>
            <p>Explore</p>
        </div>
        <div className="panel_div">
            <img src={Recent} alt="Recents" className="panel_image"></img>
            <p>Recents</p>
        </div>
        <div className="panel_div">
            <img src={All} alt="All" className="panel_image"></img>
            <p>All</p>
        </div>
        <div className="panel_div">
            <img src={More} alt="More" className="panel_image"></img>
            <p>More</p>
        </div>
        <div className="panel_div">
            <img src={Help} alt="Help" className="panel_image"></img>
            <p>Help</p>
        </div>
        <div className="panel_div">
            <img src={Settings} alt="Settings" className="panel_image"></img>
            <p>Settings</p>
        </div>
    </div>
  );
};

export default Panel;
