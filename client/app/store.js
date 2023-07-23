import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import authReducer from '../features/auth/authSlice';
import usersReducer from './users';
import trainingProgramReducer from '../features/tracker/trainingProgramSlice';
import allProgramsReducer from '../features/history/all/allProgramsHistorySlice';
import singleProgramReducer from '../features/history/single/singleProgramHistorySlice';

const store = configureStore({
   reducer: {
      auth: authReducer,
      users: usersReducer,
      trainingProgram: trainingProgramReducer,
      allPrograms: allProgramsReducer,
      singleProgram: singleProgramReducer
   },
   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from '../features/auth/authSlice';
