import React, { useState } from "react";
import AuthService from "../services/auth.service";
import Niezalogowany from "./niezalogowany";
import Zalogowany from "./zalogowany";
import "./navbar.css";


 export default function Navbar(props){
    const [active, setActive] = useState("nav_menu");
    const [toggleIcon, setToggleIcon] = useState("nav_toggler");

    const navToggle = () => {
        active === "nav_menu" 
        ? setActive("nav_menu nav_active") 
        : setActive("nav_menu");
    
        toggleIcon === "nav_toggler"
        ? setToggleIcon("nav_toggler toggle")
        : setToggleIcon("nav_toggler")
    };

    return (
        <nav className="nav">
            <a href="/" className="logo">The Real Tube</a>
            <ul className={active}>
            <li className="nav_item">
                <div class="search-box">
                    <input className="search-txt" type="text" name="" placeholder="Szukaj"/>
                    <a className="search-btn" href="/Search">
                        <i className="gg-search"></i>
                    </a>
                </div>
            </li>
            {AuthService.getCurrentUser() ? <Zalogowany></Zalogowany> : <Niezalogowany></Niezalogowany>}

            </ul>
            <div onClick= {navToggle} className={toggleIcon}>
                <div className="line1"></div>
                <div className="line2"></div>
                <div className="line3"></div>
            </div>
        </nav>

      );
}
