import React, {useState,useEffect} from "react";
import { BrowserRouter as Router, Link, useParams } from "react-router-dom";
import avatar from "./assets/psiun.jpg";
import Videos from "./services/video.service";
import ReactPlayer from 'react-player/lazy';
import Navbar from "./components/navbar";
import "./PlayerPage.css";

export default function PlayerPage(props){

    const {id} =useParams();

    const [video,setVideo] = useState([]);

    useEffect(()=>{
        Videos.getVideo(id).then(
            (response) =>{
                setVideo(response.data)
            }
        )
    },[id])

    return (
        <div>
            <Navbar/>
            <div className="playerContainer">
                <div className="player">
                    <ReactPlayer className="video" controls={true} url={video.fileurl} playing={true} width="100%" height="100%"  >
                    </ReactPlayer>
                </div>
                <div className="aboutVideoPlayer">
                    <img src={video.user ? video.user.avatarUrl==null? avatar: video.user.avatarUrl : avatar} alt="avatarPlayer" className="avatarPlayer"  width="100%" height="100%" />
                    <div className="aboutTextPlayer">
                        <a className="titleVideoPlayer" >{video.name}</a>
                        <div className="describePlayer">{video.description}</div>
                        <a className="canalNamePlayer">{video.user? video.user.username : ""}</a>
                    </div>
                </div>
            </div>
        </div>
    );
}