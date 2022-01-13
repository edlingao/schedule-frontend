import React from "react";
import Logo from "../../img/logo.svg";
import { loginEvent } from "./events";

export default function Login({change}) {
  return (
    <form onSubmit={loginEvent} className="glass-container form login">
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
        <button className="button save-button">Login</button>
        <p className="register-text">
          {" "}
          Sin cuenta? <b onClick={() => change(true)} className="highlight login-label">Registrese aqui</b>
        </p>
      </footer>
    </form>
  );
}
