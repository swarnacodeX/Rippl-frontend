// redux/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  usernameGlobal: '',
  chatList: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsernameGlobal: (state, action) => {
      state.usernameGlobal = action.payload;
    },
    setChatList: (state, action) => {
      state.chatList = action.payload;
    },
    reset: (state) => {
      state.usernameGlobal = '';
      state.chatList = [];
    },
  },
});

export const { setUsernameGlobal, setChatList, reset } = userSlice.actions;

export default userSlice.reducer;
