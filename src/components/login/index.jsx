import React, { useRef } from "react";
import Logo from "../../img/logo.svg";
import { loginEvent } from "./events";

import {
  login
} from 'utils/store/slices/session-slice'
import { useDispatch } from 'react-redux'

export default function Login({change}) {
  const dispatch = useDispatch() 
  const formRef = useRef()

  return (
    
    <form ref={formRef}  onSubmit={(e) => loginEvent(e, formRef, (token) => dispatch(login(token)) )} className="glass-container form login">
      <header className="header">
        <div className="logo">
          <img height="100" width="80" src={Logo} alt="MySchedule logo" />
        </div>
        <div className="title">
          <h1 className="main-title">My schedule</h1>
          <p className="author">
            by{" "}
            <a
              href="https://github.com/edlingao"
              target="_blank"
              rel="noreferrer"
              className="highlight"
            >
              Edlingao
            </a>
          </p>
        </div>
      </header>
      <div className="body">
        <label>
          <input
            name="email"
            className="glass-input"
            type="email"
            placeholder="E-mail..."
          />
          <input
            name="password"
            className="glass-input"
            type="password"
            placeholder="Password..."
          />
        </label>
      </div>
      <footer className="footer">
        <input type="submit" className="button save-button" value="Login" onClick={(e) => loginEvent(e, formRef, (token) => dispatch(login(token)) )}/>
        <p className="register-text">
          {" "}
          Sin cuenta? <b onClick={() => change(true)} className="highlight login-label">Registrese aqui</b>
        </p>
      </footer>
    </form>
  );
}
