import React from "react";
import AuthService from "../services/auth.service";
import avatar from "../assets/psiun.jpg";
import { Link } from "react-router-dom";

 export default function Zalogowany(){
     const user = JSON.parse(localStorage.getItem('user'));


    return (
        <>
            <li className="nav_item">
                <img src={avatar} alt="avatar" className="avatar" style={{marginTop:'4px'}}></img> 
            </li>
            <li className="nav_item">
                <a href="/" className="nav_link" onClick={ () => AuthService.logout()}>Wyloguj się</a>
            </li>
            <li className="nav_item">
            <Link className="nav_link"  to={{pathname: `/Upload/${user.id}`}}>Prześlij wideo</Link>
            </li>
        </>
      );
}