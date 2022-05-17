import './Registration.css';
import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import AuthService from "./services/auth.service";
import { useNavigate } from 'react-router-dom';

export default function Registration() {

  const form = useRef();
  const checkBtn = useRef();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  let navigate = useNavigate();
  const role=["ROLE_USER"];
  const required = (value) => {
    if (!value) {
      return (
        <div>
          Pole jest wymagane!
        </div>
      );
    }
  };
  const validEmail = (value) => {
    if (!isEmail(value) || value.length > 50 ) {
      return (
        <div>
          Nieprawidłowy email!
        </div>
      );
    }
  };
  const vusername = (value) => {
    if (value.length < 3 || value.length > 20) {
      return (
        <div>
          Nazwa użytkownika powinna zawierać od 3 do 20 znaków!
        </div>
      );
    }
  };
  const vpassword = (value) => {
    if (value.length < 6 || value.length > 120) {
      return (
        <div>
          Hasło powinno zawierać od 6 do 120 znaków!
        </div>
      );
    }
  };


  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };
  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };
  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };
  const handleRegister = (e) => {
    e.preventDefault();
    setMessage("");
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      AuthService.register(username, email, password,role).then(
        (response) => {
          setMessage(response.data.message);
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
      <Form onSubmit={handleRegister} ref={form}>

        <div className="input-container">
          <label>Email: </label>
          <Input
                  type="text"
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                  validations={[required, validEmail]}
                />
        </div>
        <div className="input-container">
          <label>Username: </label>
          <Input
                  type="text"
                  className="form-control"
                  name="username"
                  value={username}
                  onChange={onChangeUsername}
                  validations={[required, vusername]}
                />
        </div>
        <div className="input-container">
          <label>Password: </label>
          <Input
                  type="password"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required, vpassword]}
                />
        </div>
        <div className="button-container">
          <input className='registerSubmit' type="submit" value="Register" />
        </div>
        <CheckButton style={{ display: "none" }} ref={checkBtn} />
      </Form>
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



