import "./Header.scss";
import {
  LogInButton,
  LogoutButton,
  SignUpButton,
} from "../authButtons/AuthButtons";

import { useAuth } from "../../contexts/authContext";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";

const Header = ({ setToken }) => {
  const { userLoggedIn, currentUser } = useAuth();
  const link = `profile/${currentUser.displayName}`
  console.log(currentUser)

  return (
    <>
      <main className="header">
        <section className="header__right">
          <div className="header__logo">
            {/* <svg
              className="header__svg"
              xmlns="http://www.w3.org/2000/svg"
              width="167"
              height="185"
              viewBox="0 0 167 185"
              fill="none"
            >
              <path
                d="M161.377 87.3513C170.595 110.998 166.995 134.487 146.995 152.446C61.3044 229.392 3.68584 144 3.68584 144C3.68584 144 -24.8142 80 76.6859 0C98.1859 35.5 143.244 40.8377 161.377 87.3513Z"
                fill="#ED8895"
              />
            </svg> */}
            <Link to="/" className="header__svg">
              <img src={logo} alt="" />
            </Link>

          </div>
        </section>
        <section className="header__left">
          {/* <button className="header__contact">Contact Us </button> */}
          {console.log(userLoggedIn)}
          {userLoggedIn || (
            <>
              <SignUpButton />
              <LogInButton />
            </>
          )}
          {userLoggedIn &&

            //<LogoutButton setToken={setToken} />

            (

              <Link to={link} className="header__profile" >
              </Link>
            )
          }
        </section>
      </main>
    </>
  );
};

export default Header;
