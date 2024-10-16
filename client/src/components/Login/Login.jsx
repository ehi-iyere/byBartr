import "./Login.scss";
import { useAuth } from "../../contexts/authContext";
import { useState } from "react";
import {
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
} from "../../firebase/auth";
import { Navigate } from "react-router-dom";

const LogIn = () => {
  const { userLoggedIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  console.log(email, password);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        await doSignInWithEmailAndPassword(email, password);
      } catch (error) {
        setErrorMessage("Invalid Email or Password");
      }
    }
  };

  const goggleSigning = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        await doSignInWithGoogle(email, password);
      } catch (error) {
        setIsSigningIn(false);
      }
    }
  };
  return (
    <>
      {userLoggedIn && <Navigate to={"/home"} replace={true} />}
      <div className="login">
        <div className="login__form-container">
          <form action="submit" className="login__form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              className="login_username"
              placeholder="Username"
              value={email}
              onChange={(e) => {
                setErrorMessage("");
                setEmail(e.target.value);
              }}
            />
            <input
              type="password"
              name="password"
              className="login_password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setErrorMessage("");
                setPassword(e.target.value);
              }}
            />
            {errorMessage && (
              <span className="text-red-600 font-bold">{errorMessage}</span>
            )}
            <button className="login__submit">Login</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LogIn;
