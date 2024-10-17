import "./AuthButton.scss";
import { doSignOut } from "../../firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";
const { userLoggedIn, currentUser } = useAuth();
const navigate = useNavigate();

export const LogoutButton = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("logging out");
    try {
      await doSignOut();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <main className="button logout">
        <button className="" onClick={handleClick}>
          Log Out
        </button>
      </main>
    </>
  );
};

export const SignUpButton = () => {
  return (
    <>
      <main className="button signup">
        <button
          className=""
          onClick={(e) => {
            e.preventDefault();
            navigate("/singup");
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
  return (
    <>
      <main className="button login">
        <button
          className=""
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
