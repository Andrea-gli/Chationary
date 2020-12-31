import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import useInputState from './useInputState';

export default function Signup({ history }) {
  const [userNameValue, handleUserName] = useInputState('');
  const [passwordValue, handlePassword] = useInputState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = { username: userNameValue, password: passwordValue };
    console.log('body==>', body);

    Axios.post('/auth/signin', {
      username: body.username,
      password: body.password,
    })
      .then((res) => {
        console.log('res==>', res);
        if (res.status === 200) {
          history.push('/home');
        }
      })
      .catch((err) => {
        console.log('err==>', err);
      });
  };

  return (
    <div>
      <form className='Form' onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            className='input'
            type='text'
            value={userNameValue}
            onChange={handleUserName}
          />
        </label>
        <label>
          Password:
          <input
            className='input'
            type='password'
            value={passwordValue}
            onChange={handlePassword}
          />
        </label>

        <button className='btn-signin'>Sign in</button>
      </form>
      <div>
        <span>No account?</span>
        <Link to='/signup'>Sign up</Link>
      </div>
    </div>
  );
}
