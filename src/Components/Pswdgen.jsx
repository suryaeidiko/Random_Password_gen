// src/PasswordGenerator.js

import React, { useState, useEffect, useCallback,useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./myCSS.css";


const PasswordGenerator = () => {
  const [password, setPassword] = useState("");
  const [pswdLength, setPswdLength] = useState(8);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSpecialChars, setIncludeSpecialChars] = useState(false);
  const [loading, setLoading] = useState(true);
  const [widthLength, setWidthLength] = useState(0);
  const [color, setColor] = useState("red");
  const [data, setData] = useState("");
  const passwordRef = useRef(null);

  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const specialChars = "!@#$%^&*()_+";
  
  const generatePassword = () => {
    let availableChars = chars;
    if (includeNumbers) availableChars += numbers;
    if (includeSpecialChars) availableChars += specialChars;

    let newPassword = "";
    for (let i = 0; i < pswdLength; i++) {
      const randomIndex = Math.floor(Math.random() * availableChars.length);
      newPassword += availableChars[randomIndex];
    }
    setPassword(newPassword);
    toast.success("password generated");
  };

  const copeClipBoard = useCallback(() => {
    passwordRef.current?.select();
    password.length > 0 ? toast.success("copied") : toast.warn("empty text!");

    // passwordRef.current.setSelectionRange(0,8)
    window.navigator.clipboard.writeText(password);
  }, [password]);

    useEffect(() => {
      const hasAlphabets = /[a-zA-Z]/.test(password);
      const hasNumbers = /[0-9]/.test(password);
      const hasSpecialChars = /[!@#$%^&*()_+]/.test(password);
    
      if (hasAlphabets && !(hasNumbers && hasSpecialChars) && password.length <= 12) {
        setWidthLength('30%');
        setColor("red")
      } else if (hasNumbers && !(hasSpecialChars || password.length <= 12)) {
        setWidthLength('50%');
        setColor("yellow")
      } else if (hasAlphabets && hasNumbers && hasSpecialChars && password.length > 12) {
        setWidthLength('100%');
        setColor("green")
      } else if (password.length >= 12 && (hasNumbers || hasSpecialChars)) {
        setWidthLength('70%');
        setColor("orange")
      } else if (password.length >= 12) {
        setWidthLength('30%');
        setColor("red")
      }
    }, [password]);
    
    useEffect(() => {
      setTimeout(() => {
        setData("Data loaded successfully");
        setLoading(false);
      }, 1000);
    }, []);

  return (
    <>
      <div className="maincontainer">
        {loading ? (
          <div className="container">
            <div className="spinner"></div>
          </div>
        ) : (
          <div style={{borderStyle : 'solid',backgroundColor : 'lightsteelblue',marginTop : '5rem'}}>
            <h2 style={{borderBottom : '1px solid black', margin : '50px 30px',backgroundColor : 'lightgreen'}}>Random Password Generator</h2>
            <div className="allitems">
              <div className="textInputWrapper">
                <input
                  type="text"
                  name="text"
                  className="input"
                  placeholder="Enter your password!"
                  value={password}
                  ref={passwordRef}
                  readOnly
                />
              </div>
              <div
                className="progress"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: widthLength,
                  //width : '100%',
                  height: "8px",
                  background: color,
                }}
              ></div>
              <br />
              <button onClick={generatePassword}> Generate</button>
              <button onClick={copeClipBoard}> copy</button>
              <br />
              <br />
              <br />
              {/* <h5>Strength : {strength}</h5> */}
            </div>
            <div style={{fontWeight : 'bold'}}>
              <label>
                length : {pswdLength}
                <input
                  type="range"
                  min={8}
                  max={20}
                  value={pswdLength}
                  onChange={(e) => {
                    setPswdLength(e.target.value);
                  }}
                  style={{ cursor: "pointer", color: "tomato" }}
                />
              </label>
              <br />
              <div className="includecheck">
              <label style={{ marginRight : '15px'}}>
                Numbers
                <input 
                  className="form-check-input"
                  type="checkbox"
                  checked={includeNumbers}
                  onChange={() => setIncludeNumbers(!includeNumbers)}
                  style={{ cursor: "pointer", marginLeft : '5px'}}
                />
              </label>
              <label>
                Special Characters
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={includeSpecialChars}
                  onChange={() => setIncludeSpecialChars(!includeSpecialChars)}
                  style={{ cursor: "pointer", marginLeft : '5px'}}
                />
              </label>
              </div>
            </div>
            <ToastContainer />
          </div>
        )}
      </div>
    </>
  );
};

export default PasswordGenerator;
