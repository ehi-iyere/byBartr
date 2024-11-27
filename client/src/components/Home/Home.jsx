import "./Home.scss";
import { useAuth } from "../../contexts/authContext";
import { doSignOut } from "../../firebase/auth";
import { useNavigate } from "react-router-dom";
import Projects from "../../Pages/Projects/Projects";
const Home = ({ projects }) => {
  const { userLoggedIn, currentUser } = useAuth();

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
      {/* <div>
        This is hime {console.log(currentUser.accessToken)}
        <button type="submit " onClick={handleSubmit}>
          logout
        </button>
      </div> */}
      <main className="home">
        <div className="home__projects">
          <Projects projects={projects} />
        </div>
      </main>
    </>
  );
};

export default Home;
