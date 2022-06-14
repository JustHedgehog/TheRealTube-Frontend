import React, { useState } from "react";
import Comments from "../services/comment.service";
import "./commentForm.css";

export default function CommentForm(props) {
  const [message, setMessage] = useState('');

  const handleMessageChange = event => {
    // 👇️ access textarea value
    setMessage(event.target.value);
  };

  function addNewComment() {
    if (message !== "" && props.user) {
      Comments.uploadComment(props.videoId, message).then(
        (response) => {
          props.setClickComm(!props.clickComm);
        }
      );
    }
  }

  return (
    <div className="shareCommentContainer">
      <textarea id="shareCommentText" onChange={handleMessageChange} placeholder="Wpisz treść komentarza..."></textarea>
      <button onClick={addNewComment} className="btn btn-success"> Udostępnij</button>
    </div>
  );
}
