import React from "react";
 export default function Niezalogowany(){

    return (
        <>
            <li className="nav_item">
                <a href="/Login" className="nav_link">Zaloguj się</a>
            </li>
            <li className="nav_item">
                <a href="/Registration" className="nav_link">Zarejestruj się</a>
            </li>
        </>
      );
}