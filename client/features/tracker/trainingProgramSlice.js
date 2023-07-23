import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const logSetProgress = 0

// FETCH
export const fetchTrainingProgramAsync = createAsyncThunk('trainingProgram', async (username) => {
   try {
      const { data } = await axios.get('/api/trainingPrograms', { params: { username } });
      return data;
   } catch (err) {
      throw new Error('Failed to fetch a program.');
   }
});

// CREATE
export const createProgram = createAsyncThunk(
   'trainingProgram/createProgram',
   async ( { username, newProgram } ) => {
      try {
         const response = await axios.post('/api/trainingPrograms', { username, newProgram });
         return response.data;
      } catch (error) {
         throw Error('Failed to create a program.');
      }
   }
);

// LOG PROGRESS
export const logExerciseProgress = createAsyncThunk(
   'trainingProgram/logExerciseProgress',
   async ({ username, trainingProgramId, weekIndex, dayIndex, exerciseIndex }) => {
      try {
         const response = await axios.put(`/api/trainingPrograms/${trainingProgramId}`, { username, weekIndex, dayIndex, exerciseIndex });
         return response.data;
      } catch (error) {
         throw Error('Failed to log the exercise progress.');
      }
   }
);

// ARCHIVE
export const archiveProgram = createAsyncThunk(
   'trainingProgram/archiveProgram',
   async ( { username, trainingProgramId } ) => {
      try {
         await axios.put(`/api/trainingPrograms/archive/${trainingProgramId}`, { username });
      } catch (error) {
         throw Error('Failed to archive the program.');
      }
   }
);

// DELETE
export const deleteProgram = createAsyncThunk(
   'trainingProgram/deleteProgram',
   async ( { username, trainingProgramId } ) => {
      try {
         await axios.delete(`/api/trainingPrograms/${trainingProgramId}`, { params: { username } });
      } catch (error) {
         throw Error('Failed to delete the program.');
      }
   }
);

export const trainingProgramSlice = createSlice({
   name: 'trainingProgram',
   initialState: [],
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(fetchTrainingProgramAsync.fulfilled, (state, action) => {
            return action.payload;
         })
         .addCase(logExerciseProgress.fulfilled, (state, action) => {
            return action.payload;
         })
         .addCase(createProgram.fulfilled, (state, action) => {
            return action.payload;
         })
         .addCase(archiveProgram.fulfilled, (state, action) => {
            return [];
         })
         .addCase(deleteProgram.fulfilled, (state, action) => {
            return [];
         });
   }
});

export const selectTrainingProgram = (state) => {
   return state.trainingProgram;
}
export default trainingProgramSlice.reducer;