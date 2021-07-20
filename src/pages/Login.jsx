import Axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import { useGlobalState } from '../App';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const history = useHistory();
  const globalState = useGlobalState();
  const userData = globalState.userData;
  const setUserData = globalState.setUserData;
  const [usernameLog, setUserName] = useState('');
  const [passwordLog, setPassword] = useState('');
  const [errMessage, setErrMessage] = useState('');

  useEffect(() => {
    setUserData(null);
  }, []);

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
        const errMsg = response.data?.message;

        if (errMsg?.length > 0) {
          setErrMessage(errMsg);
          setUserData(null);
          setUserName('');
          setPassword('');
          clearInputValues();
        } else {
          setErrMessage('');
          clearInputValues();
          setUserData(response.data);
          setUserName('');
          setPassword('');
          history.push('/homepage');
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
