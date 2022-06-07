import React, {useState, useRef} from "react";
import { BrowserRouter as Router, Link, useNavigate } from "react-router-dom";
import miniature from "../assets/winxp.jpg";
import avatar from "../assets/psiun.jpg";

import "./spVideoContainer.css";

export default function SpVideoContainer(props){

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
        <div className="sp-container">
            <div className="sp-miniatureContainer">
                <video className="sp-miniature" ref={vid} alt="miniature"  onClick={CoursesPage} onMouseOver={playMovie} onMouseOut={stopMovie} muted="muted">
                    <source src={wideo.fileurl} type="video/mp4"></source>
                </video>
            </div>
            <div className="sp-aboutContainer">
                <Link className="sp-title"  to={{pathname: `/Play/${wideo.id}`}}>{wideo.name}</Link>
                <div className="describe">{wideo.description}</div>
                <div className="from-who-row">
                <img src={wideo.user?.avatarUrl? wideo.user.avatarUrl : wideo?.user ? wideo.user : avatar} alt="avatar" className="sp-avatar"/>
                <a className="sp-canal-name" >{wideo.user?.username ? wideo.user.username : wideo?.user ? wideo.user : null}</a>
                </div>
            </div>
        </div>
    );
}