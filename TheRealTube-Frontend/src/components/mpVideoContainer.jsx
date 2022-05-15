import React, {useState} from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import miniature from "../assets/winxp.jpg";
import avatar from "../assets/psiun.jpg";

import "./mpVideoContainer.css";

export default function mpVideoContainer(){

    return (
        <div className="container">
            <div className="miniatureContainer">
                <img className="miniature" src={miniature} alt="miniature"/>
            </div>
            <div className="aboutVideo">
                <img src={avatar} alt="avatar" className="avatar"/>
                <div className="aboutText">
                <a className="title" href="#">Poradnik jak zainstalować system operacyjny Windows XP </a>
                <a className="canalName" href="#">Poradniki instalacyjne</a>
                </div>
                
            </div>
        </div>
    );
}