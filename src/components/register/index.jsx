import React from "react";
import Logo from "../../img/logo.svg";
import { registerEvent } from "./events";

export default function Register({change}) {
  return (
    <form onSubmit={registerEvent} className="glass-container form register">
      <header className="header">
        <div className="logo">
          <img
            height="100"
            width="80"
            src={Logo}
            alt="MySchedule logo"
          />
        </div>
        <div className="title">
          <h1 className="main-title">My schedule</h1>
          <p className="author">
            by{" "}
            <a
              rel="noreferrer"
              href="https://github.com/edlingao"
              target="_blank"
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
            name="name"
            className="glass-input"
            type="text"
            placeholder="Username"
          />
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
        <button className="button save-button">Registrar</button>
        <p className="register-text">
          Ya tiene cuenta? <b onClick={() => change(false)} className="highlight login-label">
            Ingrese aqui
          </b>
        </p>
      </footer>
    </form>
  );
}
