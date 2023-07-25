// features/auth/AdminCreateUser.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createUser } from '../../app/users';
import { me } from '../../app/store';


const AdminCreateUser = () => {
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const dispatch = useDispatch();

   const handleSubmit = async (event) => {
      event.preventDefault();
      await dispatch(createUser({ username, password }));
      setUsername('');
      setPassword('');
      dispatch(me()); // dispatch the me action to fetch the logged in user
   };

   return (
      <div>
         <h1>Create User</h1>
         <form onSubmit={handleSubmit}>
            <label>
               Username:
               <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </label>
            <label>
               Password:
               <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </label>
            <button type="submit">Create User</button>
         </form>
      </div>
   );
};

export default AdminCreateUser;
