import React, { useState } from "react";

import "./MainPage.css";
import VideoContainer from "./VideoContainer.jsx";

 export default function MainPage(){

const header = (
<div className="header">
    <label className="logo">The Real Tube</label>
    <div className="search4">
        <input type="text"/>
        <input type="button" value="Wyszukaj" className="search"/>
    </div>
    <div className="logNreg">
        <input type="button" value="Zaloguj"/>
        <input type="button" value="Zarejestruj"/>
    </div>
</div>
);

const filmy = (
<div className="row">
<VideoContainer className="films"/>
<VideoContainer className="films"/>
<VideoContainer className="films"/>
<VideoContainer className="films"/>
</div>
);

    return (
        <div>
            {header}
            {filmy}
        </div>
       
      );
}

