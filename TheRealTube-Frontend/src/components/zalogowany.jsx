import React from "react";
import AuthService from "../services/auth.service";
import avatar from "../assets/psiun.jpg";

 export default function Zalogowany(){
     const user = JSON.parse(localStorage.getItem('user'));


    return (
        <>
            <li className="nav_item">
                <a  className="nav_link" >{user.username}</a>
            </li>
            <li className="nav_item">
                <img src={avatar} alt="avatar" className="avatar" style={{marginTop:'4px'}}></img> 
            </li>
            <li className="nav_item">
                <a href="/" className="nav_link" onClick={ () => AuthService.logout()}>Wyloguj się</a>
            </li>
            <li className="nav_item">
                <a className="nav_link" href="/Upload" >Prześlij wideo</a>
            </li>
            <li className="nav_item">
                <a className="nav_link" href="/MyVideos" >Moje filmy</a>
            </li>
        </>
      );
}