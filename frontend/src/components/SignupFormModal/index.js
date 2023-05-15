import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();



  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password,
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {

            setErrors(data.errors);
          }
        });
    }
    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };
  console.log("THESE ARE THE ERRORS", errors)
  return (
    // <div className="signup-container">
      // <div className={Object.values(errors).length ? "signup-container-error" : "signup-container"}>
      <div className={Object.values(errors).length === 3 ? "signup-container-error-three" : Object.values(errors).length === 2 ? "signup-container-error-two" : Object.values(errors).length === 1 ? "signup-container-error" : "signup-container"}>
      <h1>Sign Up</h1>
      <div className="errors-container">
        {errors.email && <p className="errors">{errors.email}</p>}
        {errors.username && <p className="errors">{errors.username}</p>}
        {errors.firstName && <p className="errors">{errors.firstName}</p>}
        {errors.lastName && <p className="errors">{errors.lastName}</p>}
        {errors.password && <p className="errors">{errors.password}</p>}
        {errors.confirmPassword && (
          <p className="errors">{errors.confirmPassword}</p>
        )}
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <label>
          <input
            className="signup-label"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email"
          />
        </label>
        {/* {errors.email && <p>{errors.email}</p>} */}
        <label>

          <input
            className="signup-label"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Username"
          />
        </label>
        {/* {errors.username && <p>{errors.username}</p>} */}
        <label>

          <input
            className="signup-label"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            placeholder="First Name"
          />
        </label>
        {/* {errors.firstName && <p>{errors.firstName}</p>} */}
        <label>

          <input
            className="signup-label"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            placeholder="Last Name"
          />
        </label>
        {/* {errors.lastName && <p>{errors.lastName}</p>} */}
        <label>

          <input
            className="signup-label"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
          />
        </label>
        {/* {errors.password && <p>{errors.password}</p>} */}
        <label>

          <input
            className="signup-label"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="Confirm Password"
          />
        </label>
        {/* {errors.confirmPassword && (
          <p>{errors.confirmPassword}</p>
        )} */}
        <button className={(email === "" || username === "" || firstName === "" || lastName === "" || password === "" || confirmPassword === "" || username.length < 4 || password.length < 6) ? "signup-button" : "signup-button-enable"} disabled={email === "" || username === "" || firstName === "" || lastName === "" || password === "" || confirmPassword === "" || username.length < 4 || password.length < 6} type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormModal;
