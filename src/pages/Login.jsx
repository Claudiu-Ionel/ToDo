import Axios from 'axios';
import React from 'react';
import { useState } from 'react';

const Login = () => {
  const [usernameLog, setUserName] = useState('');
  const [passwordLog, setPassword] = useState('');
  const [errMessage, setErrMessage] = useState('');

  const clearInputValues = () => {
    const inputs = document.querySelectorAll('.input');
    const inputsArray = [...inputs];
    inputsArray.map((item) => {
      console.log(typeof item.value);
      return (item.value = null);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await Axios.post('http://localhost:3001/login', {
        username: usernameLog,
        password: passwordLog,
      }).then((response) => {
        setErrMessage('');
        clearInputValues();
        console.log(response);
        setUserName('');
        setPassword('');
        const errMsg = response.data?.message;
        if (errMsg?.length > 0) {
          setErrMessage(errMsg);
          setUserName('');
          setPassword('');
          clearInputValues();
        }
      });
    } catch (err) {
      console.error(err);
      clearInputValues();
      setUserName('');
      setPassword('');
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="form-wrapper">
        <h2>User Login</h2>
        <div className="flex-row">
          <label htmlFor="login-username">Username:</label>
          <input
            type="text"
            className="input"
            id="login-username"
            name="login-username"
            required
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
        </div>
        <div className="flex-row">
          <label htmlFor="reg-password">Password:</label>
          <input
            type="password"
            className="input"
            id="login-password"
            name="login-password"
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <input type="submit" value="Login" />
      </form>
      <div>{errMessage}</div>
    </>
  );
};

export default Login;
