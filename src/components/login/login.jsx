import React, { useState, useContext } from 'react';
import { UserContext } from '../../contexts/UserProvider';  
import { useNavigate } from 'react-router-dom';

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
    
    <div>
      <center>
      <h2>Login</h2>
      <input 
        type="number" 
        value={inputUserId} 
        onChange={(e) => setInputUserId(e.target.value)}  
        placeholder="Enter your userId" 
      /><br />
      <input 
        type="text" 
        value={inputUsername} 
        onChange={(e) => setInputUsername(e.target.value)}  
        placeholder="Enter your username" 
      /> <br />
      <button onClick={handleLogin}>Login</button>
      </center>
    </div>
  );
};

export default Login;
