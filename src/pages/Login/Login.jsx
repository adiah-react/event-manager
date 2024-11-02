import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { MdLockOutline, MdOutlinePerson } from "react-icons/md";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Spinner from "../../components/ui/Spinner/Spinner";
import { auth } from "../../firebase.config";
import useAuthStatus from "../../hooks/useAuthStatus";

import "./login.scss";

const Login = () => {
  const date = new Date();
  const currentHour = date.getHours();

  let time = "";
  if ((currentHour >= 12) & (currentHour < 18)) {
    time = "afternoon";
  } else if (currentHour >= 18) {
    time = "night";
  } else {
    time = "morning";
  }

  const showPassword = false;
  const { loggedIn, checkingStatus } = useAuthStatus();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = formData;

  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        username,
        password
      );

      if (userCredentials.user) {
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
      toast.error("Invalid User Credentials");
    }
  };

  if (checkingStatus) {
    return <Spinner />;
  }

  if (loggedIn) {
    return <Navigate to="/home" />;
  }

  return (
    <div className={`login ${time}`}>
      <div className="login__greeting">
        Good <span className="time">{time}</span>
      </div>

      <form onSubmit={onSubmit}>
        <div className="input-wrapper">
          <input
            type="email"
            className="username-input"
            placeholder="Email"
            id="username"
            value={username}
            onChange={onChange}
          />
          <MdOutlinePerson />
        </div>

        <div className="input-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            className="passwordInput"
            placeholder="Password"
            id="password"
            value={password}
            onChange={onChange}
          />
          <MdLockOutline />
        </div>

        <div className="form-buttons">
          <a href="#!" className="sign-up button">
            Sign up
          </a>
          <button className="sign-in button">Sign in</button>
        </div>

        <div className="password-reset">
          <a href="#!">Forgot Password?</a>
        </div>
      </form>
    </div>
  );
};
export default Login;
