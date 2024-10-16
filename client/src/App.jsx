import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import LogIn from "./components/Login/Login";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <LogIn></LogIn>
    </>
  );
}

export default App;
