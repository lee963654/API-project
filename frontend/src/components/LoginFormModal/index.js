import React, { useState, useEffect, useRef } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import { useHistory } from "react-router-dom";



function LoginFormModal() {
  const history = useHistory()
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  //MORE TESTING
  const demoUserLogin = () => {
    return dispatch(sessionActions.login({ credential: "Demo-lition", password: "password" })).then(() => closeModal())
  }
  //MORE TESTING





  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .then(history.push("/"))
      .catch(async (res) => {
        const data = await res.json();

        // if (data && data.errors) {
        //   setErrors(data.errors);
        // }
        if (data) {
          setErrors(data)
        }

      });
  };

  return (
    // <div className="login-modal-container">
    <div className={Object.values(errors).length ? "login-modal-container-error" : "login-modal-container"}>
      <h1>Log In</h1>
      {errors.message && <p className="errors">{errors.message}</p>}
      <form onSubmit={handleSubmit} className="login-form-container">
        <label>

          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
            placeholder="Username or Email"
            className="input-field"
          />
        </label>
        <label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
            className="input-field"
          />
        </label>


        {errors.credential && (
          <p>{errors.credential}</p>
        )}
        <button type="submit" className={(credential.length < 4 || password.length < 6) ? "login-button" : "login-button-enable"} disabled={credential.length < 4 || password.length < 6}>Log In</button>

        <div className="demo-user-container">
          <button className="demo-user-button" onClick={() => demoUserLogin()}>Demo User</button>
        </div>
      </form>
    </div>
  );
}

export default LoginFormModal;
