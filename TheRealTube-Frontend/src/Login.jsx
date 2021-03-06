import React, { useState,useRef } from "react";
import   {Navigate, useNavigate }  from 'react-router-dom';
import "./Login.css";
import Navbar from "./components/navbar";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "./services/auth.service";

export default function Login(){

  let navigate = useNavigate();
  const form = useRef();
  const checkBtn = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

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
            var resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
              if(resMessage==="Request failed with status code 401"){
                resMessage="Zła nazwa użytkownika lub hasło!"
              }
            setMessage(resMessage);
          }
        );
      }
    }

  const renderForm = (
    <div className="form">
      <h1>Logowanie</h1>
      <Form className="loginForm" onSubmit={handleLogin} ref={form}>
        <div className="input-container-login">
        <input type="text"
         name="username"
          value={username}
           onChange={onChangeUsername}
            autoComplete="off"
            maxLength="20"
             required/>
          <span></span>
          <label>Username</label>
        </div>
        <div className="input-container-login">
        <input type="password"
         name="password"
          value={password}
           onChange={onChangePassword}
            maxLength="120"
             required/>
          <span></span>
          <label>Password</label>
        </div>
        {message && (
            <div>
              <div className="error">
                {message}
              </div>
            </div>
          )}
        <input className="loginSubmit" type="submit" value="Zaloguj się"/>
        <div className="signup_link">
          Nie masz konta? <a href="/Registration">Zarejestruj się</a>
        </div>
        <CheckButton style={{ display:"none" }} ref={checkBtn} />
      </Form>
    </div>
  );

  return (
    <div>
      <Navbar></Navbar>
      <div className="app">
        <div className="login-form">
          <div className="titleLogin">Logowanie</div>
          {renderForm}
        </div>
      </div>
    </div>
  );
}
