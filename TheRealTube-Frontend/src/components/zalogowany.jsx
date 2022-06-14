import React from "react";
import AuthService from "../services/auth.service";
import avatar from "../assets/psiun.jpg";
import TokenService from "../services/token.service";

export default function Zalogowany() {
    const user = TokenService.getUser();
    const isAdmin = user.roles.find(element => {
        if (element.includes("ROLE_ADMIN"))
            return true;
        else
            return false;
    });


    return (
        <>
            <li className="nav_item">
                <a className="nav_link" >{user.username}</a>
            </li>
            <li className="nav_item">
                <img src={user.avatarUrl == null ? avatar : user.avatarUrl} alt="avatar" className="avatar" style={{ marginTop: '4px' }}></img>
            </li>
            <li className="nav_item">
                <a href="/" className="nav_link" onClick={() => AuthService.logout()}>Wyloguj się</a>
            </li>
            <li className="nav_item">
                <a className="nav_link" href="/Upload" >Prześlij wideo</a>
            </li>
            <li className="nav_item">
                <a className="nav_link" href="/MyVideos" >Moje filmy</a>
            </li>
            <li className="nav_item">
                <a className="nav_link" href="/Avatar" >Ustaw avatar</a>
            </li>
            {isAdmin
                ? <li className="nav_item">
                    <a className="nav_link" href="/admin" >Admin Panel</a>
                </li>
                : null}
        </>
    );
}