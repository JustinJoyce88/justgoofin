import { createSlice } from '@reduxjs/toolkit';

export const persistSlice = createSlice({
  name: 'persist',
  initialState: {
    movieAmount: 32,
    savedMovieList: [],
  },
  reducers: {
    setMovieAmount: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.movieAmount = action.payload;
    },
    addSavedMovieList: (state, action) => {
      state.savedMovieList.push(action.payload);
    },
    removeSavedMovieList: (state, action) => {
      state.savedMovieList.splice(action.payload, 1);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setMovieAmount, addSavedMovieList, removeSavedMovieList } = persistSlice.actions;

export default persistSlice.reducer;
