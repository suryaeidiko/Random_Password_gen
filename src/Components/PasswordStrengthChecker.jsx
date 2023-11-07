// PasswordStrengthChecker.jsx

import { useState, useEffect, useCallback } from "react";
import './psc.css'

const PasswordStrengthChecker = () => {
  const [password, setPassword] = useState("");
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSpecialChars, setIncludeSpecialChars] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordLength, setPasswordLength] = useState(8);

  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const specialChars = "!@#$%^&*()_+";

  const calculatePasswordStrength = useCallback(() => {
    let strength = 0;

    const hasAlphabets = /[a-zA-Z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSpecialChars = /[!@#$%^&*()_+]/.test(password);

    if (hasAlphabets && !hasNumbers && !hasSpecialChars && password.length <= 12) {
      strength = 30;
    } else if ((hasNumbers || hasSpecialChars) && password.length <= 12) {
      strength = 70;
    } else if (hasAlphabets && hasNumbers && hasSpecialChars && password.length > 12) {
      strength = 100;
    } else if (password.length >= 12 && !(hasNumbers || hasSpecialChars)) {
      strength = 70;
    } else if (password.length >= 12) {
      strength = 50;
    }

    setPasswordStrength(strength);
  }, [password]);

  useEffect(() => {
    calculatePasswordStrength();
  }, [password, includeNumbers, includeSpecialChars, passwordLength, calculatePasswordStrength]);

  const generatePassword = () => {
    let availableChars = chars;
    if (includeNumbers) availableChars += numbers;
    if (includeSpecialChars) availableChars += specialChars;

    let newPassword = "";
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * availableChars.length);
      newPassword += availableChars[randomIndex];
    }

    setPassword(newPassword);
  };

  const handlePasswordLengthChange = (e) => {
    const length = parseInt(e.target.value, 10);
    setPasswordLength(length);
  };

  const getColor = () => {
    if (passwordStrength >= 70) {
      return "green"; // High strength, color it green
    } else if (passwordStrength >= 30) {
      return "orange"; // Medium strength, color it orange
    } else {
      return "red"; // Low strength, color it red
    }
  };

  const getSliderWidth = () => {
    return `${passwordStrength}%`;
  };

  return (
    <div className="card">
      <h2>Random Password Generator</h2>
      <label>
        Include Numbers
        <input
          type="checkbox"
          checked={includeNumbers}
          onChange={() => setIncludeNumbers(!includeNumbers)}
        />
      </label>
      <br />
      <label>
        Include Special Characters
        <input
          type="checkbox"
          checked={includeSpecialChars}
          onChange={() => setIncludeSpecialChars(!includeSpecialChars)}
        />
      </label>
      <br />
      <label>
        Password Length: {passwordLength}
        <input
          type="range"
          min="6"
          max="20"
          value={passwordLength}
          onChange={handlePasswordLengthChange}
        />
      </label>
      <br />
      <button onClick={generatePassword}>Generate Password</button>
      {password ? <p>Password: {password}</p> : ""}
      <div className="color-slider">
        <input
          type="range"
          min="0"
          max="100"
          value={passwordStrength}
          style={{ width: '100%', background: `linear-gradient(to right, ${getColor()} ${getSliderWidth()}%, #ccc ${getSliderWidth()}%)` }}
          readOnly
        />
      </div>
    </div>
  );
};

export default PasswordStrengthChecker;
