import React, { useState } from "react";

import "./VideoContainer.css";

export default function VideoContainer(){

        return (
            <div className="filmContainer">
                <div className="miniature">
                    <img alt="Miniaturka"/>
                </div>
                <div className="videoInfo">
                    <img className="avatar" alt="Avatar"/>
                    <h3>Tytuł filmu</h3>
                </div>
        </div>
          );
    }