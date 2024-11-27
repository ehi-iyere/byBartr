import "./SignUp.scss";
import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import { doCreatUserWithEmailAndPassword } from "../../firebase/auth";
import axios from "axios"
import { async } from "@firebase/util";
const SignUp = () => {
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();
  const [username, setUsername] = useState("");
  const [pronouns, setPronouns] = useState("");
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
          // await doCreatUserWithEmailAndPassword(email, password);
          // setIsRegistering(true);
          let data = {
            display_name: username,
            pronouns: pronouns,
            //name: e.target.name.value,
            email: email,
            password: password,
          };
          await axios.post(`${import.meta.env.VITE_BASEURL}user/signup`, data);
          navigate("/login");
        } catch (error) {
          console.log(error, error.message);
          setComfirmPError(error.message);
        }
      }
    }
  };


  useEffect(() => { }, [])
  return (
    <>
      {userLoggedIn && <Navigate to={"/home"} replace={true} />}
      <main className="signup">
        <div className="signup__form-container">
          <h3 className="signup__formtext signup__formtext--title ">Sign Up</h3>
          <div className="signup__formtext signup__formtext--body">Already have an account? {"   "}
            <Link
              to={"/login"}
              className="signup__formtext signup__formtext--link"
            >
              Log In
            </Link></div>
          <form action="submit" className="signup__form" onSubmit={handleSubmit}>
            <div className="signup__input-container">
              <label htmlFor="username">username</label>
              <input
                type="text"
                id="username"
                name="username"
                className="signup__input signup__input--username"
                placeholder="Username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </div>
            <div className="signup__input-container signup__input-container--pronouns">
              <label htmlFor="pronouns" className="signup__input-lable signup__input-lable--pronouns">pronouns</label>
              {/* <input
                type="text"
                id="pronouns"
                name="pronouns"
                className="signup__input signup__input--pronouns"
                placeholder="He/Him She/Her They/Them"
                value={pronouns}
                onChange={(e) => {
                  setPronouns(e.target.value);
                }}
              /> */}
              <label htmlFor="he/him" className="signup__pronouns signup__pronouns--he/him">he/him  <input type="radio" name="pronouns-he" id="he/him" value="he/him" className="signup__input signup__input--pronouns" checked={
                pronouns === "he/him"
              } onChange={() => setPronouns("he/him")
              } /></label>
              <label htmlFor="she/her" className="signup__pronouns signup__pronouns--she/her">she/her  <input type="radio" name="pronouns-she" id="she/her" value="she/her" className="signup__input signup__input--pronouns" checked={pronouns === "she/her"} onChange={() => setPronouns("she/her")} /></label>
              <label htmlFor="they/them" className="signup__pronouns signup__pronouns--they/them">they/them  <input type="radio" name="pronouns-they" id="they/them" value="they/them" className="signup__input signup__input--pronouns" checked={pronouns === "they/them"} onChange={() => setPronouns("they/them")} /></label>

            </div>
            <div className="signup__input-container">
              <label htmlFor="email">e-mail</label>
              <input
                type="text"
                id="email"
                name="email"
                className="signup__input signup__input--email"
                placeholder="email"
                value={email}
                onChange={(e) => {
                  setEmailError("");
                  setEmail(e.target.value);
                }}
              />
              {emailError && (
                <span className="signup__input-error">{emailError}</span>
              )}
            </div>
            <div className="signup__input-container">
              <label htmlFor="password">password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="signup__input signup__input--password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPasswordError("");
                  setPassword(e.target.value);
                }}
              />
              {passwordError && (
                <span className="signup__input-error">{passwordError}</span>
              )}
            </div>
            <div className="signup__input-container">
              <label htmlFor="confirmPassword">confirm password</label>
              <input
                id="confimPassword"
                type="password"
                name="confirmpassword"
                className="signup__input signup__input--password-confirm"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => {
                  setComfirmPError("");
                  setConfirmPassword(e.target.value);
                }}
              />
              {confirmPError && (
                <span className="signup__input-error">{confirmPError}</span>
              )}
            </div>






            <button
              className="signup__submit"
              type="submit"
              disabled={isRegistering}
            >
              {isRegistering ? "Signing Up..." : "Sign Up"}
            </button>

          </form>
        </div>
      </main>
    </>
  );
};

export default SignUp;
