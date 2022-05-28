import React, {useState, useRef} from "react";
import { BrowserRouter as Router, Link, useNavigate } from "react-router-dom";
import miniature from "../assets/winxp.jpg";
import avatar from "../assets/psiun.jpg";

import "./mpVideoContainer.css";
import Videos from "../services/video.service";

export default function MpVideoContainer(props){

    const wideo = props.wideo
    const vid = useRef(null);
    let navigate = useNavigate();
    function CoursesPage (){
        vid.current.pause();
        navigate(`/Play/${wideo.id}`);
    }

    var timer=0;

    function stopMovie () {
        
        clearTimeout(timer);
        vid.current.pause();
      }
      
    function playMovie (){
        timer = setTimeout(()=>{vid.current.play();},500);
        
      }

    return (
        <div className="container">
            <div className="miniatureContainer">
                <video className="miniature" ref={vid} alt="miniature"  onClick={CoursesPage} onMouseOver={playMovie} onMouseOut={stopMovie} muted="muted">
                    <source src={wideo.fileurl} type="video/mp4"></source>
                </video>
            </div>
            <div className="aboutVideo">
                <img src={avatar} alt="avatar" className="avatar"/>
                <div className="aboutText">
                <Link className="titleVideo"  to={{pathname: `/Play/${wideo.id}`}}>{wideo.name}</Link>
                {/* TU MA BYĆ TEN SUPER MEGA OPIS */}
                <div className="describeMP">
                    {wideo.description} 
                </div>
                <a className="canalName" >{wideo.user? wideo.user.username : ""}</a>
                </div>
                
            </div>
        </div>
    );
}