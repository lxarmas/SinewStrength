import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authenticate } from '../../app/store';

/**
  The AuthForm component can be used for Login or Sign Up.
  Props for Login: name="login", displayName="Login"
  Props for Sign up: name="signup", displayName="Sign Up"
**/

const AuthForm = ({ name, displayName }) => {
  const { error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const formName = evt.target.name;
    const username = evt.target.username.value;
    const password = evt.target.password.value;
    dispatch(authenticate({ username, password, method: formName }));
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '20px'}}>
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <label htmlFor="username" style={{ padding: '5px', fontSize: '24px', color: 'white'}}>
            Username
          </label>
          <input name="username" type="text" />
        </div>
        <div>
          <label htmlFor="password" style={{ padding: '5px', fontSize: '24px', color: 'white'}}>
            Password
          </label>
          <input name="password" type="password" />
        </div>
        <div>
          <button type="submit" style={{ fontSize: '24px'}}>{displayName}</button>
        </div>
        {error && <div> {error} </div>}
      </form>
    </div>
  );
};

export default AuthForm;
