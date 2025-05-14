// src/redux/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  usernameGlobal: '',
  emailGlobal: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsernameGlobal: (state, action) => {
      state.usernameGlobal = action.payload;
    },
    setEmailGlobal: (state, action) => {
      state.emailGlobal = action.payload;
    },
    reset: (state) => {
      state.usernameGlobal = '';
      state.emailGlobal = '';
    },
  },
});

export const {
  setUsernameGlobal,
  setEmailGlobal,
  reset,
} = userSlice.actions;

export default userSlice.reducer;
