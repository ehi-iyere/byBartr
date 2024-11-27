import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import LogIn from "./components/Login/Login";
import "./styles/App.scss";
import Home from "./components/Home/Home";
import { AuthProvider } from "./contexts/authContext";
import SignUp from "./components/signup/SignUp";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Footer from "./components/Footer/Footer";
import Project from "./components/Project/Project";
import axios from "axios"
import { useAuth } from "./contexts/authContext"
import Profile from "./Pages/Profile/Profile";

function App() {
  const [count, setCount] = useState(0);
  //const { userLoggedIn, currentUser } = useAuth();
  const [token, setToken] = useState(
    sessionStorage.getItem('token') || localStorage.getItem('token'),
  );
  const [projects, setProjects] = useState(null)
  async function getProject() {
    try {
      const resp = await axios.get(
        `${import.meta.env.VITE_BASEURL}project/`
      );
      setProjects(resp.data);
      console.log(resp)
      //setUser(resp.data.userInfo);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getProject();
  }, []);

  //console.log(currentUser)

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Header setToken={setToken} />
          <Hero />
          <Routes>
            <Route path="/home" element={<Home projects={projects} />} />

            <Route path="/login" element={<LogIn token={token} setToken={setToken} />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/projects/:projectId" element={<Project projects={projects} />} />
            <Route path="/profile/:displayName" element={<Profile />} />
          </Routes>
          <Footer />
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
