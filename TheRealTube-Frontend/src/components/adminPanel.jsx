import { render } from "@testing-library/react";
import React, { useState, useRef, useEffect } from "react";
import Videos from "../services/video.service";
import TokenService from '../services/token.service';
import UserService from "../services/user.service";
import ReactModal from "react-modal";

import "./adminPanel.css";

export default function AdminPanel() {
    const [permsClicked, setPermsClicked] = useState(false);
    const [deleteFilmClicked, setDeleteFilmClicked] = useState(false);
    const [deleteAccClicked, setDeleteAccClicked] = useState(false);
    const [users, setUsers] = useState([]);
    const [videos, setVideos] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalRegexEmail, setModalRegexEmail] = useState(false);
    const [modalSuccDelUser, setModalSuccDelUser] = useState(false);
    const [modalFindUser, setModalFindUser] = useState(false);
    const [modalRegexFilm, setModalRegexFilm] = useState(false);
    const [modalFindFilm, setModalFindFilm] = useState(false);
    const [modalSuccDelFilm, setModalSuccDelFilm] = useState(false);
    const delInputRef = useRef(null);
    const permsRef = useRef(null);
    const delFilmRef = useRef(null);
    const delAccRef = useRef(null);
    const user = TokenService.getUser();
    var isAdmin = null;

    useEffect(() => {
        Videos.getAllVideos().then(
            (response) => {
                setVideos(response.data);
            }
        );
    }, []);


    useEffect(() => {
        if (!user) {
            window.location.href = '/';
        } else {
            isAdmin = user.roles.find(element => {
                if (element.includes("ROLE_ADMIN"))
                    return true;
                else
                    return false;
            });
        }
    });

    useEffect(() => {
        if (!isAdmin) {
            window.location.href = '/';
        }
    });

    useEffect(() => {
        UserService.getUsers().then(
            (response) => {
                setUsers(response.data);
            }
        );
    }, []);

    const clickHandle = (e) => {
        if (e.currentTarget.className === "perms") {
            setPermsClicked(true);
            setDeleteFilmClicked(false);
            setDeleteAccClicked(false);
            e.target.style.background = "rgb(58, 56, 56)";
            delFilmRef.current.style.background = "rgb(71, 67, 67)";
            delAccRef.current.style.background = "rgb(71, 67, 67)";
        }
        if (e.currentTarget.className === "deleteFilm") {
            setPermsClicked(false);
            setDeleteFilmClicked(true);
            setDeleteAccClicked(false);
            e.target.style.background = "rgb(58, 56, 56)";
            permsRef.current.style.background = "rgb(71, 67, 67)";
            delAccRef.current.style.background = "rgb(71, 67, 67)";
        }

        if (e.currentTarget.className === "deleteAcc") {
            setPermsClicked(false);
            setDeleteFilmClicked(false);
            setDeleteAccClicked(true);
            e.target.style.background = "rgb(58, 56, 56)";
            delFilmRef.current.style.background = "rgb(71, 67, 67)";
            permsRef.current.style.background = "rgb(71, 67, 67)";
        }
    }

    const toggleModal = () => {
        setModalOpen(!modalOpen);
        setModalRegexFilm(false);
        setModalRegexEmail(false);
        setModalFindUser(false);
        setModalSuccDelUser(false);
        setModalFindFilm(false);
        setModalSuccDelFilm(false);
    }

    const deleteFilmHandle = () => {
        var videoURL = delInputRef.current.value;
        var regex = "^http://localhost:3000/Play/[0-9]{1,}$";

        if (videoURL.match(regex)) {
            var videoId = parseInt(videoURL.split("/").pop());
            var allVideosIds = [];
            videos.forEach(element => {
                allVideosIds.push(element['id']);
            });

            if (allVideosIds.includes(videoId)) {
                Videos.deleteVideo(videoId);
                setModalOpen(true);
                setModalSuccDelFilm(true);
            }
            else {
                setModalOpen(true);
                setModalFindFilm(true);
            }

        } else {
            setModalOpen(true);
            setModalRegexFilm(true);
        }
    }

    const deleteUserHandle = () => {
        var email = delInputRef.current.value;
        var regex = "[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
        var userEmails = [];

        users.forEach(element => {
            userEmails.push(element['email']);
        })
        if (email.match(regex)) {
            if (userEmails.includes(email)) {
                var selectedUser = users.filter(el => el.email === email);
                var userId = selectedUser[0]['id'];
                UserService.deleteUser(userId);
                setModalSuccDelUser(true);
                setModalOpen(true);
            }
            else {
                setModalFindUser(true);
                setModalOpen(true);
            }
        }
        else {
            setModalRegexEmail(true);
            setModalOpen(true);

        }

    }

    return (
        <div className="panel">
            <h1>Admin Panel</h1>
            <div className="admin-grid">
                <div className="left-column">
                    <ul className="admin-tools">
                        <li><a ref={permsRef} href="#" className="perms" onClick={clickHandle}>Nadaj/zabierz uprawnienia</a></li>
                        <li><a ref={delFilmRef} href="#" className="deleteFilm" onClick={clickHandle}>Usuń film</a></li>
                        <li><a ref={delAccRef} href="#" className="deleteAcc" onClick={clickHandle}>Usuń konto</a></li>
                    </ul>
                </div>
                <div className="right-column">
                    {permsClicked ?
                        <div className="content">
                            <h2>Uprawnienia</h2>

                        </div>
                        : null}

                    {deleteFilmClicked ?
                        <div className="delete-film-div">
                            <h2>Podaj link do filmu który chcesz usunąć</h2>
                            <input className="input" ref={delInputRef} type="text" />
                            <button onClick={deleteFilmHandle}>Usuń film</button>
                        </div>
                        : null}

                    {deleteAccClicked ?
                        <div className="delete-user-div">
                            <h2>Wprowadź email konta które chcesz usunąć</h2>
                            <input className="input" ref={delInputRef} type="text" />
                            <button onClick={deleteUserHandle}>Usuń konto</button>

                        </div>
                        : null}

                </div>
                <ReactModal
                    isOpen={modalOpen}
                    onRequestClose={toggleModal}
                    ariaHideApp={false}
                    contentLabel="My dialog"
                    className="mymodal"
                    overlayClassName="myoverlay"
                    closeTimeoutMS={0}
                >
                    <div>
                        {modalRegexEmail ? <h3>Wprowadź poprawny email!</h3> : null}
                        {modalFindUser ? <h3 >Taki użytkownik nie istnieje!</h3> : null}
                        {modalSuccDelUser ? <h3>Użytkownik pomyślnie usunięty!</h3> : null}
                        {modalRegexFilm ? <h3>Wprowadź poprawny link!</h3> : null}
                        {modalFindFilm ? <h3>Nie ma takiego filmu!</h3> : null}
                        {modalSuccDelFilm ? <h3>Pomyślnie usunięto film!</h3> : null}
                        <div className="modal-btn-cont">
                            <button className="modal-btn" onClick={toggleModal}>Zamknij</button>
                        </div>
                    </div>
                </ReactModal>
            </div>
        </div>
    );
}

