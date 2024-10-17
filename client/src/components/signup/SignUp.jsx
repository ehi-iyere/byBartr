import "./SignUp.scss";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import { doCreatUserWithEmailAndPassword } from "../../firebase/auth";
const SignUp = () => {
  const { userLoggedIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPError, setComfirmPError] = useState("");
  console.log(email, password, confirmPassword);
  //function to make sure password contains this pattern
  function password_validate(p) {
    return (
      /[A-Z]/.test(p) &&
      /[0-9]/.test(p) &&
      !/[aeiou]/.test(p) &&
      /^[@#][A-Za-z0-9]{7,13}$/.test(p)
    );
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!isRegistering) {
      if (!emailRegex.test(email)) {
        setEmailError("Enter a valid email");
      } else if (!password) {
        setPasswordError("Enter a passwor");
      } else if (!(password === confirmPassword)) {
        setComfirmPError("Password must match");
      } else {
        try {
          await doCreatUserWithEmailAndPassword(email, password);
          setIsRegistering(true);
        } catch (error) {
          console.log(error, error.message);
          setComfirmPError(error.message);
        }
      }
    }
  };
  return (
    <>
      {userLoggedIn && <Navigate to={"/home"} replace={true} />}
      <main className="signup">
        <div className="login__form-container">
          <form action="submit" className="login__form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              className="login_username"
              placeholder="Username"
              value={email}
              onChange={(e) => {
                setEmailError("");
                setEmail(e.target.value);
              }}
            />
            {emailError && (
              <span className="text-red-600 font-bold">{emailError}</span>
            )}
            <input
              type="password"
              name="password"
              className="signup_password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPasswordError("");
                setPassword(e.target.value);
              }}
            />
            {passwordError && (
              <span className="text-red-600 font-bold">{passwordError}</span>
            )}
            <input
              type="password"
              name="confirmpassword"
              className="signup_password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => {
                setComfirmPError("");
                setConfirmPassword(e.target.value);
              }}
            />
            {confirmPError && (
              <span className="text-red-600 font-bold">{confirmPError}</span>
            )}
            <button
              className="signup__submit"
              type="submit"
              disabled={isRegistering}
            >
              {isRegistering ? "Signing Up..." : "Sign Up"}
            </button>
            <div className="text-sm text-center">
              Already have an account? {"   "}
              <Link
                to={"/login"}
                className="text-center text-sm hover:underline font-bold"
              >
                Log In
              </Link>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default SignUp;
