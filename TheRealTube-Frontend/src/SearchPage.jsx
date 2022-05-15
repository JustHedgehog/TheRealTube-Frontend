import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

import "./SearchPage.css";
import Navbar from "./components/navbar";

 export default function MainPage(){
     

const header = (
<header>
    <div className="container">
      <h2 className="logo">The Real Tube</h2>
      <div className="searchBox">
        <input className="searchInput" type="text"/>
        <input type="submit"/>
      </div>

      <nav>
        <ul>
            <li>
                <div className="search">
                    <div className="icon"></div>
                    <div className="input"></div>
                </div>
            </li>
            <li><a href="/login">Log In</a></li>
            <li><a href="/registration">Register</a></li>
        </ul>
      </nav>
    </div>
  </header>
);

const filmy = (
  <div className="col">
  </div>
  );

    return (
        <div>
            <Navbar/>
        </div>
       
      );
}