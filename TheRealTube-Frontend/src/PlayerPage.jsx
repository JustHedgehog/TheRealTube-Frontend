import React, {useState,useEffect} from "react";
import { BrowserRouter as Router, Link, useParams } from "react-router-dom";
import avatar from "./assets/psiun.jpg";
import Videos from "./services/video.service";
import ReactPlayer from 'react-player/lazy';
import Navbar from "./components/navbar";
import "./PlayerPage.css";

export default function PlayerPage(props){

    const {id} =useParams();
    console.log(id);

    const [video,setVideo] = useState([]);

    useEffect(()=>{
        Videos.getVideo(id).then(
            (response) =>{
                setVideo(response.data)
            }
        )
    },[])
    console.log(video);

    const urlVideo =video.fileurl;
    console.log(urlVideo);

    return (
        <div className="playerContainer">
            <Navbar></Navbar>
            <div className="player">
                <ReactPlayer className="video" controls={true} url={urlVideo} playing={true} width="100%" height="100%"  >
                </ReactPlayer>
            </div>
            <div className="aboutVideoPlayer">
                <img src={avatar} alt="avatarPlayer" className="avatarPlayer"  width="100%" height="100%" />
                <div className="aboutTextPlayer">
                <a className="titleVideoPlayer" >{video.name}</a>
                <a className="canalNamePlayer" href="">Poradniki instalacyjne</a>
                </div>
                
            </div>
        </div>
    );
}