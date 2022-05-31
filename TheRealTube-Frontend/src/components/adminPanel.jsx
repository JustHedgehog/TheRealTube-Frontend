import { render } from "@testing-library/react";
import React, { useState, useRef } from "react";
import Videos from "../services/video.service";

import "./adminPanel.css";

export default function AdminPanel() {
    const [permsClicked, setPermsClicked] = useState(false);
    const [deleteFilmClicked, setDeleteFilmClicked] = useState(false);
    const [banClicked, setBanClicked] = useState(false);
    const [deleteAccClicked, setDeleteAccClicked] = useState(false);
    const delInputRef = useRef(null);
    const permsRef = useRef(null);
    const delFilmRef = useRef(null);
    const banRef = useRef(null);
    const delAccRef = useRef(null);


    const clickHandle = (e) => {
        if (e.currentTarget.className === "perms") {
            setPermsClicked(true);
            setDeleteFilmClicked(false);
            setBanClicked(false);
            setDeleteAccClicked(false);
            e.target.style.background = "rgb(58, 56, 56)";
            delFilmRef.current.style.background = "rgb(71, 67, 67)";
            banRef.current.style.background = "rgb(71, 67, 67)";
            delAccRef.current.style.background = "rgb(71, 67, 67)";
        }
        if (e.currentTarget.className === "deleteFilm") {
            setPermsClicked(false);
            setDeleteFilmClicked(true);
            setBanClicked(false);
            setDeleteAccClicked(false);
            e.target.style.background = "rgb(58, 56, 56)";
            permsRef.current.style.background = "rgb(71, 67, 67)";
            banRef.current.style.background = "rgb(71, 67, 67)";
            delAccRef.current.style.background = "rgb(71, 67, 67)";
        }
        if (e.currentTarget.className === "ban") {
            setPermsClicked(false);
            setDeleteFilmClicked(false);
            setBanClicked(true);
            setDeleteAccClicked(false);
            e.target.style.background = "rgb(58, 56, 56)";
            delFilmRef.current.style.background = "rgb(71, 67, 67)";
            permsRef.current.style.background = "rgb(71, 67, 67)";
            delAccRef.current.style.background = "rgb(71, 67, 67)";
        }
        if (e.currentTarget.className === "deleteAcc") {
            setPermsClicked(false);
            setDeleteFilmClicked(false);
            setBanClicked(false);
            setDeleteAccClicked(true);
            e.target.style.background = "rgb(58, 56, 56)";
            delFilmRef.current.style.background = "rgb(71, 67, 67)";
            banRef.current.style.background = "rgb(71, 67, 67)";
            permsRef.current.style.background = "rgb(71, 67, 67)";
        }
    }

    const deleteHandle = () => {
        // Videos.deleteVideo(1);
        var videoURL = delInputRef.current.value;
        var regex = "^http://localhost:3000/Play/[0-9]{1,}$";

        if (videoURL.match(regex)) {
            console.log("Link prawidłowy");
            var videoId = videoURL.split("/").pop();
            console.log("Id filmu: " + videoId);
            Videos.deleteVideo(parseInt(videoId));
        } else {
            console.log("Podaj prawidłowy link!");
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
                        <li><a ref={banRef} href="#" className="ban" onClick={clickHandle}>Zbanuj konto</a></li>
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
                        <div className="delete_div">
                            <h2>Podaj link do filmu który chcesz usunąć</h2>
                            <input className="input" ref={delInputRef} type="text" />
                            <button onClick={deleteHandle}>Usuń film</button>
                        </div>
                        : null}

                    {banClicked ?
                        <div className="content">
                            <h2>Banowanie</h2>

                        </div>
                        : null}

                    {deleteAccClicked ?
                        <div className="content">
                            <h2>Usuwanie konta</h2>

                        </div>
                        : null}


                </div>
            </div>
        </div>
    );
}

