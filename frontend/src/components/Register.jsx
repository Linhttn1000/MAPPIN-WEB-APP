import { Cancel, Room } from "@material-ui/icons";
import "./Register.css";

function Register() {
  return (
    <div className="registerContainer">
      <div className="logo">
        <Room />
        TravelPin
      </div>
      <form>
        <input type="text" placeholder="Username" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button className="registerBtn">Register</button>
        <span className="success">
          {" "}
          Successfully registered. You can login now.
        </span>
        <span className="failure">
          Username , Email or Password went wrong.
        </span>
        >
      </form>
    </div>
  );
}

export default Register;
