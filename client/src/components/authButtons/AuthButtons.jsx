import "./AuthButtons.scss";
import { doSignOut } from "../../firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";

export const LogoutButton = ({ setToken }) => {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("logging out");
    try {
      await doSignOut();
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
      setToken(null)
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <main className="button logout">
        <button className="button" onClick={handleSubmit}>
          Log Out
        </button>
      </main>
    </>
  );
};

export const SignUpButton = () => {
  const navigate = useNavigate();
  return (
    <>
      <main className="button signup">
        <button
          className="button"
          onClick={(e) => {
            e.preventDefault();
            navigate("/signup");
          }}
        >
          {" "}
          Sign Up
        </button>
      </main>
    </>
  );
};

export const LogInButton = () => {
  const navigate = useNavigate();
  return (
    <>
      <main className="button login">
        <button
          className="button"
          onClick={(e) => {
            e.preventDefault();
            navigate("/Login");
          }}
        >
          {" "}
          Log In
        </button>
      </main>
    </>
  );
};

export const profileButton = () => {
  return (
    <>
      <main className="profile">
        <Link to="/profile" className="profile__button">


        </Link>
      </main>
    </>
  )
}