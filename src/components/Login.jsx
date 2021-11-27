import { Cancel, Room } from "@material-ui/icons";
import axios from "axios";
import React, { useRef, useState } from "react";
import "./Login.css";

const host = "https://travelmappin.herokuapp.com/api";

function Login({ setShowLogin, myStorage, setCurrentUser }) {
  const [error, setError] = useState(false);
  const nameRef = useRef();
  const passwordRef = useRef();

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      username: nameRef.current.value,
      password: passwordRef.current.value,
    };
    try {
      const res = await axios.post(`${host}/users/login`, user);
      myStorage.setItem("user", res.data.username);
      setCurrentUser(res.data.username);
      setShowLogin(false);
      setError(false);
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div className="loginContainer">
      <div className="logo">
        <Room />
        TravelPin
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" ref={nameRef} />
        <input type="password" placeholder="Password" ref={passwordRef} />
        <button className="loginBtn">Login</button>
        {error && (
          <span className="failure">
            Username , Email or Password went wrong.
          </span>
        )}
      </form>
      <Cancel className="loginCancel" onClick={() => setShowLogin(false)} />
    </div>
  );
}

export default Login;
