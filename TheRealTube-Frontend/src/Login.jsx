import React, { useState,useRef } from "react";
import   {Navigate, useNavigate }  from 'react-router-dom';
import "./Login.css";
import Navbar from "./components/navbar";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "./services/auth.service";

function Login(){

  let navigate = useNavigate();
  const form = useRef();
  const checkBtn = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const passwordValidation = (value) => {
    if (!value) {
      return (
        <div>
          Pole jest wymagane!
        </div>
      );
    }
    if(value.length > 120)
    {
      return (
        <div>
          Hasło za długie!
        </div>
      )
    }
  };

  const usernameValidation = (value) =>{
    if (!value) {
      return (
        <div>
          Pole jest wymagane!
        </div>
      );
    }
    if(value.length > 20)
    {
      return (
        <div>
          Za długa nazwa użytkownika!
        </div>
      )
    }
  };


    const onChangeUsername = (e) => {
      const username = e.target.value;
      setUsername(username);
    };
    const onChangePassword = (e) => {
      const password = e.target.value;
      setPassword(password);
    };

    const handleLogin = (e) => {
      e.preventDefault();
      setMessage("");
      form.current.validateAll();
      if (checkBtn.current.context._errors.length === 0) {
        AuthService.login(username, password).then(
          () => {
            navigate("/");
            window.location.reload();
          },
          (error) => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
            setMessage(resMessage);
          }
        );
      }
    }

  const renderForm = (
    <div className="form">
      <Form onSubmit={handleLogin} ref={form}>
        <div className="input-container">
          <label>Username: </label>
          <Input className="loginInputs" type="text" name="username" value={username} onChange={onChangeUsername} validations={[usernameValidation]}/>
        </div>
        <div className="input-container">
          <label>Password: </label>
          <Input className="loginInputs" type="password" name="password" value={password} onChange={onChangePassword} validations={[passwordValidation]} />
        </div>
        {message && (
            <div>
              <div>
                {message}
              </div>
            </div>
          )}
        <div className="button-container">
          <input className="loginSubmit" type="submit" value="Zaloguj się"/>
        </div>
        <CheckButton style={{ display:"none" }} ref={checkBtn} />
      </Form>
    </div>
  );

  return (
    <div>
      <Navbar/>
      <div className="app">
        <div className="login-form">
          <div className="title">Sign In</div>
          {renderForm}
        </div>
      </div>
    </div>
  );
}

export default Login