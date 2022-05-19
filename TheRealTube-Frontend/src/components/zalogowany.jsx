import React from "react";
import AuthService from "../services/auth.service";
import avatar from "../assets/psiun.jpg";

 export default function Zalogowany(){


    return (
        <>
            <li className="nav_item">
                <img src={avatar} alt="avatar" className="avatar"></img> 
            </li>
            <li className="nav_item">
                <a href="/" className="nav_link" onClick={ () => AuthService.logout()}>Wyloguj się</a>
            </li>
            <li className="nav_item">
                <a href="/" className="nav_link">Prześlij film</a>
            </li>
        </>
      );
}