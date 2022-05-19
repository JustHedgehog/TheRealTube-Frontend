import React, {useState, useRef} from "react";
import { BrowserRouter as Router, Link, useNavigate } from "react-router-dom";
import miniature from "../assets/winxp.jpg";
import avatar from "../assets/psiun.jpg";

import "./mpVideoContainer.css";

export default function MpVideoContainer(props){

    const wideo = props.wideo
    const vid = useRef(null);
    let navigate = useNavigate();
    function CoursesPage (){
        vid.current.play();
        navigate(`/Play/${wideo.id}`);
        
        
    }

    return (
        <div className="container">
            <div className="miniatureContainer">
                <video className="miniature" ref={vid} alt="miniature" controls onClick={CoursesPage}>
                    <source src={wideo.fileurl} type="video/mp4"></source>
                </video>
            </div>
            <div className="aboutVideo">
                <img src={avatar} alt="avatar" className="avatar"/>
                <div className="aboutText">
                <Link className="titleVideo"  to={{pathname: `/Play/${wideo.id}`}}>{wideo.name}</Link>
                <a className="canalName" href="">Poradniki instalacyjne</a>
                </div>
                
            </div>
        </div>
    );
}