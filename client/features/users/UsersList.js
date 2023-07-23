// client/features/users/UsersList.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllUsers } from '../../app/users';
import './UsersList.css';

const UsersList = () => {
   const dispatch = useDispatch();
   const users = useSelector((state) => state.users);

   useEffect(() => {
      dispatch(fetchAllUsers());
   }, []);

   return (
      <div className="users-list">
         <h1>All Users</h1>
         {users && users.map((user) => (
            <div className="users-list-item" key={user.id}>{user.username}</div>
         ))}
      </div>
   );
};

export default UsersList; 