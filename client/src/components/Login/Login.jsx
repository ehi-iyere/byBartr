import "./Login.scss";
import { useAuth } from "../../contexts/authContext";
import { useState } from "react";
import {
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
} from "../../firebase/auth";

const LogIn = () => {
  const { userLoggedIn } = useAuth();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      await doSignInWithEmailAndPassword(email, password);
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
      <div className="login">
        <div className="login__form-container">
          <form action="submit" className="login__form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              className="login_username"
              placeholder="Username"
            />
            <input
              type="password"
              name="password"
              className="login_password"
              placeholder="Password"
            />

            <button className="login__submit">Login</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LogIn;
