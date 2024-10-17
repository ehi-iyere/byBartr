import "./Home.scss";
import { useAuth } from "../../contexts/authContext";
import { doSignOut } from "../../firebase/auth";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const { userLoggedIn, currentUser } = useAuth();
  console.log(currentUser);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("logginh out");
    try {
      await doSignOut();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {!userLoggedIn && <Navigate to={"/login"} replace={true} />}
      <div>
        This is hime
        <button type="submit " onClick={handleSubmit}>
          logout
        </button>
      </div>
    </>
  );
};

export default Home;
