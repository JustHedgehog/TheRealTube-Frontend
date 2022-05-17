import React, { useEffect, useState } from "react";

import "./MainPage.css";
import Navbar from "./components/navbar";
import MpVideoContainer from "./components/mpVideoContainer";
import Videos from "./services/video.service";

 export default function MainPage(){

    var [listaVideo,setListaVideo] = useState(null);

    useEffect(()=>{
        Videos.getAllVideos().then(
            (response) =>{
                setListaVideo(response.data)
            }
        )
    })

    return (
        <div>
            <Navbar/>
            <div className="films">
                {listaVideo && listaVideo.map(video => <MpVideoContainer key={video} wideo={video}></MpVideoContainer>)}
            </div>
            
        </div>
      );
}
