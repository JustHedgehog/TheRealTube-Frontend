import React, { useState } from "react";

import "./navbar.css";
import test2 from "./test2";
import test from "./test";
import Login from "../Login";
import Registration from "../Registration";

 export default function Navbar(isSubmited, props){
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
                    <input className="search-txt" type="text" name="" placeholder="Type to search"/>
                    <a className="search-btn" href="/Search">
                        <i className="gg-search"></i>
                    </a>
                </div>
                </li>
                <li className="nav_item">
                    <a href="/Login" className="nav_link">Zaloguj się</a>
                </li>
                <li className="nav_item">
                    <a href="/Registration" className="nav_link">Zarejestruj się</a>
                </li>
            </ul>
            <div onClick= {navToggle} className={toggleIcon}>
                <div className="line1"></div>
                <div className="line2"></div>
                <div className="line3"></div>
            </div>
        </nav>

      );
}
