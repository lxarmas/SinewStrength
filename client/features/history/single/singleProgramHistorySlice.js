import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// FETCH
export const fetchSingleProgramHistory = createAsyncThunk('singleProgram', async ({ username, programId }) => {
   try {
      const { data } = await axios.get(`/api/trainingPrograms/${programId}`, { params: { username } });
      return data;
   } catch (err) {
      throw new Error('Failed to fetch the archived program.');
   }
});

export const singleProgramHistorySlice = createSlice({
   name: 'singleProgram',
   initialState: [],
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(fetchSingleProgramHistory.fulfilled, (state, action) => {
            return action.payload;
         });
   }
});

export const selectSingleProgram = (state) => {
   return state.singleProgram;
}
export default singleProgramHistorySlice.reducer;