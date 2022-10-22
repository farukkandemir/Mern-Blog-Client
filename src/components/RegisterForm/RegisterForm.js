import React, {useRef} from "react";
import {Link, useNavigate} from "react-router-dom";

import {useContextAPI} from "../../context/Context";
import {app} from "../../utils/axiosConfig";

function RegisterForm() {
  const usernameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");

  const navigate = useNavigate();
  const {dispatch, messages} = useContextAPI();

  async function handleRegister(e) {
    e.preventDefault();

    const registerResult = await app
      .post(" /api/users/register", {
        username: usernameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
      })
      .catch((err) => {
        console.log(err);
        dispatch({type: "REGISTER_FAILURE", payload: err.response.data.errors});
      });

    registerResult.data && navigate("/login");
  }

  return (
    <form className="form" onSubmit={handleRegister}>
      <div>
        <h6 style={{fontSize: "2rem"}}>Register</h6>
        <hr />
      </div>
      {messages?.isTaken && (
        <p className="text-center text-danger">{messages?.isTaken}</p>
      )}
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="text"
          className="form-control"
          id="email"
          placeholder="Enter email"
          ref={emailRef}
        />
        {messages?.email && <small className="text-danger">{messages.email}</small>}
        <small id="email" className="form-text text-muted">
          We'll never share your email with anyone else.
        </small>
      </div>

      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          className="form-control"
          id="username"
          placeholder="Enter username"
          ref={usernameRef}
        />
        {messages?.username && <small className="text-danger">{messages.username}</small>}
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="form-control"
          id="password"
          placeholder="Password"
          ref={passwordRef}
        />
        {messages?.password && <small className="text-danger">{messages.password}</small>}
      </div>

      <button type="submit" className="btn btn-primary">
        Sign Up
      </button>

      <Link to="/login">
        <button type="submit" className="btn btn-secondary ml-3">
          Switch to Login
        </button>
      </Link>
    </form>
  );
}

export default RegisterForm;
