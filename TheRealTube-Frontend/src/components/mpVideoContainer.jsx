import React, {useState} from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import miniature from "../assets/winxp.jpg";
import avatar from "../assets/psiun.jpg";

import "./mpVideoContainer.css";

export default function mpVideoContainer(props){

    const wideo = props.wideo

    console.log(wideo)
    return (
        <div className="container">
            <div className="miniatureContainer">
                <video className="miniature" alt="miniature" controls>
                    <source src={wideo.fileurl} type="video/mp4"></source>
                </video>
            </div>
            <div className="aboutVideo">
                <img src={avatar} alt="avatar" className="avatar"/>
                <div className="aboutText">
                <a className="title" href="#">{wideo.name}</a>
                <a className="canalName" href="#">Poradniki instalacyjne</a>
                </div>
                
            </div>
        </div>
    );
}