import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Link, useParams } from "react-router-dom";
import avatar from "./assets/psiun.jpg";
import Videos from "./services/video.service";
import ReactPlayer from 'react-player/lazy';
import Navbar from "./components/navbar";
import "./PlayerPage.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import TokenService from './services/token.service';
import ReactModal from "react-modal";
import CommentForm from "./components/commentForm";
import Comments from "./services/comment.service";
import Comment from "./components/comment";


export default function PlayerPage(props) {

    const { id } = useParams();
    const [video, setVideo] = useState([]);
    const [likes, setLikes] = useState([]);
    const [clicked, setClicked] = useState(false);
    const [clickedComm, setClickedComm] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [listComments,setListComments] = useState([]);
    const user = TokenService.getUser();

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

    useEffect(()=>{
        Comments.getCommentsByVideo(id).then(
            (response)=>{
                setListComments(response.data);
            }
        );
    },[clickedComm])

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    }

    const redirectToLogin = () => {
        window.location.href = "/login";
    }

    const likeHandler = () => {
        if (user) {
            Videos.setVideoLikes(id, true).then(
                (response) => {
                    setClicked(!clicked);
                }
            );
        } else {
            setModalOpen(true);
        }


    };

    const dislikeHandler = () => {
        if (user) {
            Videos.setVideoLikes(id, false).then(
                (response) => {
                    setClicked(!clicked);
                }
            );
        } else {
            setModalOpen(true);
        }


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
                            <FontAwesomeIcon className="icon" icon={faThumbsUp} size="3x" color="white" />
                            <label id="likeCounter">{likes['likes']}</label>
                        </button>

                        <button className="dislike" onClick={dislikeHandler}>
                            <FontAwesomeIcon className="icon" icon={faThumbsUp} size="3x" rotation={180} color="white" />
                            <label id="dislikeCounter">{likes["disLikes"]}</label>
                        </button>
                    </div>
                    <ReactModal
                        isOpen={modalOpen}
                        onRequestClose={toggleModal}
                        contentLabel="My dialog"
                        className="mymodal"
                        overlayClassName="myoverlay"
                        closeTimeoutMS={500}
                    >
                        <div>
                            <h3>Żeby ocenić film, musisz być zalogowany!</h3>
                            <div className="modal-btn-cont">
                                <button className="modal-btn" onClick={redirectToLogin}>Zaloguj</button>
                                <button className="modal-btn" onClick={toggleModal}>Zamknij</button>
                            </div>
                        </div>
                    </ReactModal>
                </div>
                <div className="commShare" onClick={()=>{if(!user){setModalOpen(true);}}}> <CommentForm videoId={id} user={user} setClickComm={setClickedComm} clickComm={clickedComm}></CommentForm> </div>
                <div className="comments">
                    <h3 className="sekcja">Sekcja komentarzy: </h3>
                    {listComments && listComments.map(comm => <Comment key={comm.id} text={comm.description}  avatarUrl={comm.user.avatarUrl} username ={comm.user.username}></Comment>)}
                </div>
            </div>
        </div>
    );
}