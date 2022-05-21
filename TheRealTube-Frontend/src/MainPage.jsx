import React, { useEffect, useState } from "react";

import "./MainPage.css";
import Navbar from "./components/navbar";
import MpVideoContainer from "./components/mpVideoContainer";
import Videos from "./services/video.service";

 export default function MainPage(){

    const [listaVideo,setListaVideo] = useState([]);

    useEffect(()=>{
        Videos.getAllVideos().then(
            (response) =>{
                setListaVideo(response.data)
            }
        )
    },[])

    return (
        <div>
            <Navbar/>
            <div className="mainPageBody">
                <div className="films">
                    {listaVideo && listaVideo.map(video => <MpVideoContainer key={video.objectKey} wideo={video}></MpVideoContainer>)}
                </div>
           </div>
        </div>
      );
}
