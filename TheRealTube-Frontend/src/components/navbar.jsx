import React, { useState } from "react";
import AuthService from "../services/auth.service";
import Niezalogowany from "./niezalogowany";
import Zalogowany from "./zalogowany";
import "./navbar.css";
import Videos from "../services/video.service";

 export default function Navbar(props){
    const [active, setActive] = useState("nav_menu");
    const [toggleIcon, setToggleIcon] = useState("nav_toggler");
    const [searchHref, setSearchHref] = useState("../");

    const navToggle = () => {
        active === "nav_menu" 
        ? setActive("nav_menu nav_active") 
        : setActive("nav_menu");
    
        toggleIcon === "nav_toggler"
        ? setToggleIcon("nav_toggler toggle")
        : setToggleIcon("nav_toggler")
    };


    function handleKeyDown(e){
        if(e.key === 'Enter'){
            window.location.href = searchHref;
        }

    }

    function handleChange(e){
        if(e.target.value!=="")
            setSearchHref("/Search/" + e.target.value);
        else{
            setSearchHref("../");
        }
    }


    return (
        <nav className="nav">
            <a href="/" className="logo">Real Tube</a>
            <ul className={active}>
            <li className="nav_item">
                <div class="search-box">
                    <input className="search-txt" type="text" name="" placeholder="Szukaj"  onChange={handleChange} onKeyDown={handleKeyDown} />
                    <a className="search-btn" href={searchHref}>
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
