import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./SearchPage.css";
import Navbar from "./components/navbar";
import Videos from "./services/video.service";
import MpVideoContainer from "./components/mpVideoContainer";

export default function MainPage() {

  const { title } = useParams();

  const [listaVideo, setListaVideo] = useState([]);
  const [czyPobrano, setCzyPobrano] = useState(false);

  useEffect(() => {
    Videos.getVideosByTitle(title).then(
      (response) => {
        setListaVideo(response.data)
        setTimeout(() => { setCzyPobrano(true); }, 200);

      }
    )
  }, [])


  const showSearchedData = () => {
    return listaVideo && listaVideo.map(video => <MpVideoContainer key={video.objectKey} wideo={video}></MpVideoContainer>);
  };

  const showMessage = () => {
    if (czyPobrano) {
      return <div className="message">Nie znaleziono żadnych filmów o podanym tytule!</div>
    }
  };
  const showResults = () => {
    return <div>
      <div className="stats">Ilość znalezionych filmów  dla tytułu "{title}" : {listaVideo.length}</div>
      <div className="filmsList">{showSearchedData()}</div>
    </div>

  };

  return (
    <div className="SearchBody">
      <Navbar />
      <div >
        {listaVideo.length !== 0 ? (showResults()) : (showMessage())}
      </div>
    </div>

  );
}