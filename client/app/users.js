import axios from 'axios';

// ACTION TYPES
const CREATE_USER = 'CREATE_USER';
const FETCH_USER = 'FETCH_USER';
const FETCH_ALL_USERS = 'FETCH_ALL_USERS';

// ACTION CREATORS
const _createUser = (user) => ({ type: CREATE_USER, user });
const _fetchUser = (user) => ({ type: FETCH_USER, user });
const _fetchAllUsers = (users) => ({ type: FETCH_ALL_USERS, users });

export const createUser = (user) => {
   return async (dispatch) => {
      const { data: created } = await axios.post('/api/users', user);
      dispatch(_createUser(created));
   };
};

export const fetchUser = (userId) => {
   return async (dispatch) => {
      const { data: user } = await axios.get(`/api/users/${userId}`);
      dispatch(_fetchUser(user));
   };
};

export const fetchAllUsers = () => {
   return async (dispatch) => {
      try {
         const { data: users } = await axios.get('/api/users/all');
         console.log(users);
         dispatch(_fetchAllUsers(users));
      } catch (error) {
         console.error("Error fetching all users", error);
      }
   };
};

// REDUCER
export default function usersReducer(state = [], action) {
   switch (action.type) {
      case CREATE_USER:
         return [...state, action.user];
      case FETCH_USER:
         return state.map((user) => (user.id === action.user.id ? action.user : user));
      case FETCH_ALL_USERS:
         return [...action.users];
      default:
         return state;
   }
}