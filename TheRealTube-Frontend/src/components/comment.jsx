import React, { useState } from "react";
import "./comment.css";
import avatar from "../assets/psiun.jpg";

export default function Comment(props) {

    return(
        <div className="commentContainer">
            <img src={props.avatarUrl? props.avatarUrl :avatar} alt="avatar" className="avatar" ></img>
            <h3 className="username">{props.username}</h3>
          <div className="commentText">{props.text}</div>       
        </div>
      );
}