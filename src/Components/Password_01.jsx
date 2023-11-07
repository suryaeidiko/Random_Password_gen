import React, { useCallback, useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./myCSS.css";
import zxcvbn from "zxcvbn";

const Password_01 = () => {

  const [password, setPassword] = useState('');
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSpecialChars, setIncludeSpecialChars] = useState(false);
  const [pswdLength, setPswdLength] = useState(8);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState("");

  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const specialChars = '!@#$%^&*()_+';
  const passwordRef = useRef(null);

  const generate = () => {
    let availableChars = chars;
    if (includeNumbers) availableChars += numbers;
    if (includeSpecialChars) availableChars += specialChars;

    let newPassword = '';
    for (let i = 0; i < pswdLength; i++) {
      const randomIndex = Math.floor(Math.random() * availableChars.length);
      newPassword += availableChars[randomIndex];
    }

    setPassword(newPassword);
  };

  const copeClipBoard = useCallback(() => {
    passwordRef.current?.select();
    password.length > 0 ? toast.success("copied") : toast.warn("empty text!");

    // passwordRef.current.setSelectionRange(0,8)
    window.navigator.clipboard.writeText(password);
  }, [password]);

    const handelevent = () => {
      setIncludeNumbers((prev) => !prev)
    }
    const handelevent1 = () => {
      setIncludeSpecialChars((prev) => !prev)
    }

  useEffect(() => {
   setTimeout(() => {
    setData("Data loaded successfully");
      setLoading(false);
   }, 1000);
  }, [])
  

  return (
    <>
      <div style={{ position: "relative" }}>
        {loading ? (
          <div className="container">
            <div className="spinner"></div>
          </div>
        ) : (
          <div
            style={{
              textAlign: "center",
              fontWeight: "bold",
              height: "50rem",
              backgroundColor: "lightgreen",
            }}
          >
            <h1
              style={{
                textAlign: "center",
                fontSize: "3rem",
                paddingBottom: "5rem",
              }}
            >
              Password Generator
            </h1>
            <div>
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
              {/* <div
                className="progress"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: finallength,
                  height: "8px",
                  background: "red",
                }}
              ></div> */}

              <br />
              <button onClick={generate}> Generate</button>
              <button onClick={copeClipBoard}> copy</button>
              <br />
              <br />
              <br />
              {/* <h5>Strength : {strength}</h5> */}
            </div>
            <div style={{ paddingBottom: "1rem" }}></div>
            <div>
              <div>
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
                <label
                  style={{
                    cursor: "pointer",
                    color: "tomato",
                    paddingRight: "1rem",
                    paddingLeft: "1rem",
                  }}
                >
                  Label : {pswdLength}
                </label>
                <br />
                <br />
                <input
                  className="form-check-input"
                  type="checkbox"
                  defaultChecked={numbers}
                  onChange={handelevent}
                  style={{
                    cursor: "pointer",
                    color: "tomato",
                    paddingRight: "1rem",
                  }}
                />
                <label
                  style={{
                    cursor: "pointer",
                    color: "tomato",
                    paddingRight: "1rem",
                    paddingLeft: "1rem",
                  }}
                >
                  Numbers
                </label>
                <input
                  className="form-check-input"
                  type="checkbox"
                  defaultChecked={specialChars}
                  onChange={handelevent1}
                  style={{ cursor: "pointer", color: "tomato" }}
                />
                <label
                  style={{
                    cursor: "pointer",
                    color: "tomato",
                    paddingRight: "1rem",
                    paddingLeft: "1rem",
                  }}
                >
                  Characters
                </label>
              </div>
              <br />
              <ToastContainer />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Password_01;
