import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useInputState from './useInputState';

const Signup = ({ history }) => {
  const [username, handleUsername] = useInputState('');
  const [password, handlePassword] = useInputState('');
  const [warn, setWarn] = useState(false);
  const [nameExists, setNameExists] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = { username, password };
    console.log('body==>', body);

    try {
      const response = await fetch('/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      console.log('response.status => ', response.status);

      if (response.status === 200) {
        console.log('Signed Up!');
        //redirect to Home
        history.push(`/join/${username}`);
      } else {
        setWarn(true);
        setTimeout(() => {
          setWarn(false);
        }, 2000);
      }
    } catch (error) {
      console.log('Error in handleSubmit of SignUp component:', error);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const body = { username };
    console.log('body==>', body);

    try {
      const response = await fetch('/auth/checkusername', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      console.log('response.status => ', response.status);

      if (response.status === 200) {
        const data = await response.json();
        console.log('data => ', data);

        setNameExists(data);

        setTimeout(() => {
          setNameExists(null);
        }, 2000);
      } else {
        setWarn(true);

        setTimeout(() => {
          setWarn(false);
        }, 2000);
      }
    } catch (error) {
      console.log('Error in handleClick of Signup component:', error);
    }
  };

  const styleRed = {
    color: 'red',
  };

  return (
    <div className="signup">
      <h1>Sign Up</h1>

      <div className="redirect-to-signin">
        <p>Already have an account?</p>
        <Link to="/" className="link-signin">
          Sign In
        </Link>
      </div>

      <form className="form-signup" onSubmit={handleSubmit}>
        <label>
          <span>Username</span>
          <input className="margin-bottom-10" type="text" value={username} onChange={handleUsername} />
        </label>

        <div className="checkUsername">
          <button onClick={handleClick}>Check Availability</button>
          {nameExists === null ? null : nameExists ? (
            <img src={'../assets/images/x.png'} />
          ) : (
            <img src={'../assets/images/checkmark.png'} />
          )}
        </div>

        <label>
          <span>Password</span>
          <input type="password" value={password} onChange={handlePassword} />
        </label>
        <button className="btn btn-signup">Sign Up</button>
        {warn ? (
          <p style={styleRed}>Sign Up Not Completed. Please Try Again</p>
        ) : null}
      </form>
    </div>
  );
};

export default Signup;
