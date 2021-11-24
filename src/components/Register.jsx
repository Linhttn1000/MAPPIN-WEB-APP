import { Cancel, Room } from "@material-ui/icons";
import axios from "axios";
import { useRef, useState } from "react";
import "./Register.css";

function Register({ setShowRegister }) {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      username: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    try {
      await axios.post("/users/register", newUser);
      setError(false);
      setSuccess(true);
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div className="registerContainer">
      <div className="logo">
        <Room />
        TravelPin
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" ref={nameRef} />
        <input type="email" placeholder="Email" ref={emailRef} />
        <input type="password" placeholder="Password" ref={passwordRef} />
        <button className="registerBtn" type="submit">
          Register
        </button>
        {success && (
          <span className="success">
            Successfully registered. You can login now.
          </span>
        )}{" "}
        {error && (
          <span className="failure">
            Username , Email or Password went wrong.
          </span>
        )}
      </form>
      <Cancel
        className="registerCancel"
        onClick={() => setShowRegister(false)}
      />
    </div>
  );
}
export default Register;
