import { useState } from 'react';
import Axios from 'axios';
import './Register.css';

const Register = () => {
  const [usernameReg, setUsernameReg] = useState(null);
  const [passwordReg, setPasswordReg] = useState(null);
  const [emailReg, setEmailReg] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const clearInputValues = () => {
    const inputs = document.querySelectorAll('.input');
    const inputsArray = [...inputs];
    inputsArray.map((item) => {
      console.log(typeof item.value);
      return (item.value = null);
    });
  };

  const registerUser = async () => {
    try {
      await Axios.post('http://localhost:3001/register', {
        username: usernameReg,
        email: emailReg,
        password: passwordReg,
      }).then((response) => {
        setUsernameReg(null);
        setEmailReg(null);
        setPasswordReg(null);

        const errNo = response.data?.errno;
        if (typeof response.data === 'string') {
          setErrorMsg(response.data);
        }
        if (errNo === 1062) {
          setErrorMsg('Username already exists');
        }
        if (errNo === 1048) {
          setErrorMsg('Please fill all the inputs');
        }
      });
    } catch (error) {
      console.log(error);
    }
    clearInputValues();
  };

  console.log(usernameReg, emailReg, passwordReg);
  return (
    <div id="register-wrapper">
      <h2>User Registration</h2>
      <div className="flex-row">
        <label htmlFor="register">Username:</label>
        <input
          type="text"
          className="input"
          id="register"
          name="register"
          required
          onChange={(e) => {
            setUsernameReg(e.target.value);
          }}
        />
      </div>
      <div className="flex-row">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          className="input"
          id="email"
          name="email"
          required
          onChange={(e) => {
            setEmailReg(e.target.value);
          }}
        />
      </div>
      <div className="flex-row">
        <label htmlFor="email">Password:</label>
        <input
          type="password"
          className="input"
          id="reg-password"
          name="reg-password"
          required
          onChange={(e) => {
            setPasswordReg(e.target.value);
          }}
        />
      </div>
      <button onClick={() => registerUser()}>Register</button>
      <div>
        <h2>{errorMsg}</h2>
      </div>
    </div>
  );
};

export default Register;
