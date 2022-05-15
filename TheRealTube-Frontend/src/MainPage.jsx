import React, { useState } from "react";

import "./MainPage.css";
import Navbar from "./components/navbar";
import MpVideoContainer from "./components/mpVideoContainer";

 export default function MainPage(){


    return (
        <div>
            <Navbar/>
            <div className="films">
            <MpVideoContainer/>
            <MpVideoContainer/>
            <MpVideoContainer/>
            <MpVideoContainer/>
            <MpVideoContainer/>
            </div>
            
        </div>
      );
}
