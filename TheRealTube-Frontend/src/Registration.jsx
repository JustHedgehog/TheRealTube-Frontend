import './Registration.css';
import React, { useState } from 'react';

export default function Registration() {
    // React States
  const [errorMessages, setErrorMessages] = useState({});

  const errors = {
    uname: "Username already exists!",
    email: "Email already taken!"
  };

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { email, uname, pass } = document.forms[0];

    // Find user login info
    const userData = null;
    //Do ogarnięcia z springiem

    // Compare user info
    if (userData.uname) {
        setErrorMessages({name: "uname", message: errors.uname})
    }
    if(userData.email){
        setErrorMessages({name: "email", message: errors.email})
    }
  }

  const renderErrorMessage = (name) =>
  name === errorMessages.name && (
    <div className="error">{errorMessages.message}</div>
  );

  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Email: </label>
          <input type="email" name="email" required />
          {renderErrorMessage("email")}
        </div>
        <div className="input-container">
          <label>Username: </label>
          <input type="text" name="uname" required />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Password: </label>
          <input type="password" name="pass" required />
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
                {renderForm}
          </div>
        </div>
      );
    
}



