import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import LogIn from "./components/Login/Login";
import "./styles/App.scss";
import Home from "./components/Home/Home";
import { AuthProvider } from "./contexts/authContext";
import SignUp from "./components/signup/SignUp";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/home" element={<Home />} />

            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
