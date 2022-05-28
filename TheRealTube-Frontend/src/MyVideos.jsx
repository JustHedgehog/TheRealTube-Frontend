import React, { useEffect, useState, useRef } from "react";
import "./MyVideos.css";
import Navbar from "./components/navbar";
import MpVideoContainer from "./components/mpVideoContainer";
import Videos from "./services/video.service";

export default function MyVideos() {

  const [czyWybrano, setCzyWybrano] = useState(false);
  const [czyPobrano, setCzyPobrano] = useState(false);
  const [message, setMessage] = useState("");
  const [listaVideo, setListaVideo] = useState([]);
  const [videoID, setVideoID] = useState();
  const user = JSON.parse(localStorage.getItem('user'));
  const [disabled, setDisabled] = useState(true);


  var btn = document.getElementById('btnDelete');

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

  function chosen(index, vidID) {
    if (!czyWybrano) {
      setVideoID(vidID);
      document.getElementsByClassName('film')[index].style.border = '7px solid #2691d9';
      document.getElementsByClassName('film')[index].style.borderRadius = "5px";
      setDisabled(false);
    } else {
      setVideoID();
      var elements = document.getElementsByClassName('film');
      for (var i = 0; i < elements.length; i++) {
        elements[i].style.border = '';
        elements[i].style.borderRadius = "";
      }
      setDisabled(true);
    }
    setCzyWybrano(!czyWybrano);
  };

  function deleteMyVideo(){
    Videos.deleteVideo(videoID).then(
      (response) => {
        setMessage(response.data.message);
        window.location.reload();
      },
      (error) => {
        setMessage(error.response.data);
        alert(message);
      }
    );
  };

  const films = () => {
    return (<div className="myFilms">
      {listaVideo && listaVideo.map((video, index) => <div key={index} className="film" onClick={() => chosen(index, video.id)} ><MpVideoContainer key={video.objectKey} wideo={video}></MpVideoContainer></div>)}
    </div>);
  };

  const showMessage = () => {
    if (czyPobrano) {
      return <div className="statsMyFilms">Nie posiadasz żadnyh filmów</div>
    }
  };

  return (
    <div>
      <Navbar />
      {!disabled?<button  id="btnDelete" className="btnDeleteMyFilm" onClick={deleteMyVideo} disabled={disabled} >Usuń</button>: <></>}
      <div className="myVideosBody">
        {listaVideo.length !== 0 ? films() : showMessage()}
      </div>
    </div>
  );
}
