import { useState } from 'react';
import Axios from 'axios';
import './Register.css';
import '../components/Button';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
const Register = () => {
  const [usernameReg, setUsernameReg] = useState('');
  const [passwordReg, setPasswordReg] = useState('');
  const [emailReg, setEmailReg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [userRegistered, setUserRegistered] = useState(false);
  const isEnabled = () => {
    return usernameReg && passwordReg && emailReg;
  };

  const clearInputValues = () => {
    const inputs = document.querySelectorAll('.input');
    const inputsArray = [...inputs];
    inputsArray.map((item) => {
      console.log(typeof item.value);
      return (item.value = null);
    });
  };

  const preventSpaceKey = (e, setState) => {
    if (e.target.value.indexOf(' ') >= 0) {
      e.target.value = null;
      setErrorMsg('please do not use space');
    } else {
      setState(e.target.value);
    }
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
        if (response.data === 'User registered') {
          setErrorMsg(response.data);
          setUserRegistered(true);
        }
        if (errNo === 1062) {
          setErrorMsg('Username already exists');
        }
        if (errNo === 1048) {
          setErrorMsg('Please fill all the inputs fields');
        }
      });
    } catch (error) {
      console.log(error);
    }
    clearInputValues();
  };

  console.log(usernameReg, emailReg, passwordReg);
  return (
    <div className="form-wrapper">
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
            preventSpaceKey(e, setUsernameReg);
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
            preventSpaceKey(e, setEmailReg);
          }}
        />
      </div>
      <div className="flex-row">
        <label htmlFor="reg-password">Password:</label>
        <input
          type="password"
          className="input"
          id="reg-password"
          name="reg-password"
          required
          onChange={(e) => {
            preventSpaceKey(e, setPasswordReg);
          }}
        />
      </div>
      <Button isEnabled={isEnabled()} eventHandler={registerUser} />

      <div>
        <h2>{errorMsg}</h2>
      </div>
      {userRegistered === true ? (
        <Link to="/login">
          <button>Go and Log in</button>
        </Link>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Register;
