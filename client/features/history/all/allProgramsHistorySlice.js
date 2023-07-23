import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// FETCH
export const fetchAllProgramsAsync = createAsyncThunk('allPrograms', async (username) => {
   try {
      const { data } = await axios.get('/api/trainingPrograms/all', { params: { username } });
      return data;
   } catch (err) {
      throw new Error('Failed to fetch the programs.');
   }
});

export const allProgramsSlice = createSlice({
   name: 'allPrograms',
   initialState: [],
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(fetchAllProgramsAsync.fulfilled, (state, action) => {
            return action.payload;
         });
   }
});

export const selectAllPrograms = (state) => {
   return state.allPrograms;
}
export default allProgramsSlice.reducer;