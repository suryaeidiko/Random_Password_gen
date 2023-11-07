import { useState } from "react";
import "./App.css";
import Password_01 from "./Components/Password_01";
import "./Components/myCSS.css";
import ProgressBar from "./ProgressBar";
import PasswordGenerator from "./Components/pswdgen";
import PasswordStrengthChecker from "./Components/PasswordStrengthChecker";

function App() {
  // const [col, setCol] = useState("");

  // const myStyle = {
  //   backgroundColor: "red",
  // };

  return (
    <>
      {/* <ProgressBar /> */}
      {/* <Password_01 /> */}
      <PasswordGenerator />
      {/* <PasswordStrengthChecker /> */}
      
    </>
  );
}

export default App;
