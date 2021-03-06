import React, {useState, useRef} from "react";
import { BrowserRouter as Router, Link, useNavigate } from "react-router-dom";
import avatar from "../assets/psiun.jpg";
import { useLocation } from "react-router-dom";

import "./mpVideoContainer.css";

export default function MpVideoContainer(props){
    const location = useLocation();
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
            {location.pathname === "/MyVideos" 
                    ? 
                    <video className="miniature" ref={vid} alt="miniature"  onMouseOver={playMovie} onMouseOut={stopMovie} muted="muted">
                        <source src={wideo.fileurl} type="video/mp4"></source>
                    </video>
                    : 
                    <video className="miniature" ref={vid} alt="miniature"  onClick={CoursesPage} onMouseOver={playMovie} onMouseOut={stopMovie} muted="muted">
                        <source src={wideo.fileurl} type="video/mp4"></source>
                    </video>
                    }
                
            </div>
            <div className="aboutVideo">
                <img src={wideo.user?.avatarUrl? wideo.user.avatarUrl : wideo?.user ? wideo.user : avatar} alt="avatar" className="avatar"/>
                <div className="aboutText">
                    <Link className="titleVideo"  to={{pathname: `/Play/${wideo.id}`}}>{wideo.name}</Link> 
                    {/* TU MA BYĆ TEN SUPER MEGA OPIS */}
                    <div className="describeMP">
                        {wideo.description} 
                    </div>
                <a className="canalName">{wideo.user?.username ? wideo.user.username : wideo?.user ? wideo.user : null}</a>
                </div>
                
            </div>
        </div>
    );
}