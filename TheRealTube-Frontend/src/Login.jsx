import React, { useState } from "react";
import AuthService from "./services/AuthService";
import   {Navigate }  from 'react-router-dom';
import "./Login.css";

function Login(){
    // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);


  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var uname= document.forms[0][0].value;
    var pass= document.forms[0][1].value;

    AuthService.login(uname, pass).then(
      () => {
          setIsSubmitted(true);
      },
      error => {
        const consoleMessage =error.message;
        console.log(consoleMessage);
        const retMessage ="Wrong username or password!";
        setErrorMessages({ name: "mess", message: retMessage });        
      }
    );
 
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
  // After isSubmitted you can add redirection to next view 
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username: </label>
          <input type="text" name="uname" required />
        </div>
        <div className="input-container">
          <label>Password: </label>
          <input type="password" name="pass" required />
          {renderErrorMessage("mess")}
        </div>
        <div className="button-container">
          <input type="submit" value="Sign in"/>
        </div>
      </form>
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">
        <div className="title">Sign In</div>
        {isSubmitted ? <Navigate to='/'/> : renderForm}
      </div>
    </div>
  );

    
}

export default Login