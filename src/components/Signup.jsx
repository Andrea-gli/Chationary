import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import useInputState from './useInputState';

export default function Signup({ history }) {
  //   console.log('history', history);
  const [userNameValue, handleUserName] = useInputState('');
  const [passwordValue, handlePassword] = useInputState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      username: userNameValue,
      password: passwordValue,
      date_created: new Date().toDateString(),
      country: 'NA',
      email: 'e@gmail.com',
    };
    console.log('body==>', body);

    Axios.post('/auth/signup', {
      username: body.username,
      password: body.password,
      date_created: body.date_created,
      country: body.country,
      email: body.email,
    })
      .then((res) => {
        console.log('res===>', res);
        history.push('/home');
      })
      .catch((err) => {
        console.log('err---->', err);
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

        <div>
          <button className='btn-signup'>sign up</button>
        </div>
      </form>
      <div>
        <span>Already have an account?</span>
        <Link to='/'>Sign in</Link>
      </div>
    </div>
  );
}
