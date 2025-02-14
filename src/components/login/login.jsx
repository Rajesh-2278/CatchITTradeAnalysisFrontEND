import React, { useState, useContext } from 'react';
import { UserContext } from '../../contexts/UserProvider';  
import { useNavigate } from 'react-router-dom';
import './login.css';

const Login = () => {
  const [inputUserId, setInputUserId] = useState("");  
  const [inputUsername, setInputUsername] = useState(""); 
  const { setUserDetails } = useContext(UserContext);  
  const navigate = useNavigate(); 

  const handleLogin = () => {
    if (inputUserId && inputUsername) {
      setUserDetails({ userId: inputUserId, username: inputUsername });  
      navigate("/");  
    } else {
      alert("Please enter both userId and username!");  
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <input 
          type="number" 
          value={inputUserId} 
          onChange={(e) => setInputUserId(e.target.value)}  
          placeholder="Enter your userId" 
          className="login-input"
        /><br />
        <input 
          type="text" 
          value={inputUsername} 
          onChange={(e) => setInputUsername(e.target.value)}  
          placeholder="Enter your username" 
          className="login-input"
        /> <br />
        <button onClick={handleLogin} className="login-button">Login</button>
      </div>
    </div>
  );
};

export default Login;