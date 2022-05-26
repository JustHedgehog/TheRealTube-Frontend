import React, { useEffect, useState } from "react";
import "./MyVideos.css";
import Navbar from "./components/navbar";
import MpVideoContainer from "./components/mpVideoContainer";
import Videos from "./services/video.service";

export default function MyVideos() {

  const [czyPobrano, setCzyPobrano] = useState(false);
  const [listaVideo, setListaVideo] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));


  useEffect(() => {
    if (!user) {
      window.location.href = '/';
    }
  });

  useEffect(() => {
    Videos.getVideosByUser().then(
      (response) => {
        setListaVideo(response.data)
        setTimeout(() => { setCzyPobrano(true); }, 200);
      }
    )
  }, []);

  const films = () => {
    return <div className="myFilms">
      {listaVideo && listaVideo.map(video => <MpVideoContainer key={video.objectKey} wideo={video}></MpVideoContainer>)}
    </div>
  };

  const showMessage = () => {
    if (czyPobrano) {
      return <div className="statsMyFilms">Nie posiadasz żadnyh filmów</div>
    }
  };

  return (
    <div>
      <Navbar />
      <div className="myVideosBody">
        {listaVideo.length !== 0 ? films() : showMessage()}
      </div>
    </div>
  );
}
