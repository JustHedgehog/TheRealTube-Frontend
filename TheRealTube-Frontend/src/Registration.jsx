import './Registration.css';
import React, { useState } from 'react';
import AuthService from "./services/AuthService";
import { useNavigate} from 'react-router-dom';

export default function Registration() {
    // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var email = document.forms[0][0].value;
    var uname = document.forms[0][1].value;
    var pass = document.forms[0][2].value;
    const role=["ROLE_USER"];
    //Do ogarnięcia z springiem
    AuthService.register(
      uname,
      email,
      pass,
      role
    ).then(
      response => {
        setIsSubmitted(true);
      },
      error => {
        const retMessage =error.response.data.message;
        setErrorMessages({ name: "mess", message: retMessage });
      }
    );


  }



  const renderErrorMessage = (name) =>
  name === errorMessages.name && (
    <div className="error">{errorMessages.message}</div>
  );

  const navigate = useNavigate();

  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Email: </label>
          <input type="email" name="email" required />
          
        </div>
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
          <input type="submit" value="Register" />
        </div>
      </form>
    </div>
  );

    return (
        <div className="registration-app">
          <div className="registration-form">
            <div className="title">Register</div>
            <label> </label>
              {isSubmitted ? <div>New account was created!
                <button className='btn' onClick={() => navigate('/Login')}>Go to login page </button>
              </div> : renderForm}
          </div>
        </div>
      );
    
}



