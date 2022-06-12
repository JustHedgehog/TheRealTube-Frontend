import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Link, useParams } from "react-router-dom";
import avatar from "./assets/psiun.jpg";
import Videos from "./services/video.service";
import ReactPlayer from 'react-player/lazy';
import Navbar from "./components/navbar";
import "./PlayerPage.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";

export default function PlayerPage(props) {

    const { id } = useParams();
    const [video, setVideo] = useState([]);
    const [likes, setLikes] = useState([]);
    const [clicked, setClicked] = useState(false);

    useEffect(() => {
        Videos.getVideo(id).then(
            (response) => {
                setVideo(response.data);
            }
        );
    }, [id]);

    useEffect(() => {
        Videos.getVideosLikes(id).then(
            (response) => {
                setLikes(response.data);
            }
        );
    }, [clicked]);



    const likeHandler = () => {
        Videos.setVideoLikes(id, true).then(
            (response) => {
                setClicked(!clicked);
            }
        );
    };

    const dislikeHandler = () => {
        Videos.setVideoLikes(id, false).then(
            (response) => {
                setClicked(!clicked);
            }
        );
    };

    return (
        <div>
            <Navbar />
            <div className="playerContainer">
                <div className="player">
                    <ReactPlayer className="video" controls={true} url={video.fileurl} playing={true} width="100%" height="100%"  >
                    </ReactPlayer>
                </div>

                <div className="aboutVideoPlayer">
                    <img src={video.user ? video.user.avatarUrl == null ? avatar : video.user.avatarUrl : avatar} alt="avatarPlayer" className="avatarPlayer" width="100%" height="100%" />
                    <div className="aboutTextPlayer">
                        <a className="titleVideoPlayer" >{video.name}</a>
                        <div className="describePlayer">{video.description}</div>
                        <a className="canalNamePlayer">{video.user ? video.user.username : ""}</a>
                    </div>
                    <div className="likes-dislikes">
                        <button className="like" onClick={likeHandler}>
                            <FontAwesomeIcon icon={faThumbsUp} size="3x" color="white" />
                            <label id="likeCounter">{likes['likes']}</label>
                        </button>

                        <button className="dislike" onClick={dislikeHandler}>
                            <FontAwesomeIcon icon={faThumbsUp} size="3x" rotation={180} color="white" />
                            <label id="dislikeCounter">{likes["disLikes"]}</label>
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
}