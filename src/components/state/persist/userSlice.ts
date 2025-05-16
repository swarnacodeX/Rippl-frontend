import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  email: '',
  firstname: '',
  accesstoken: '',
  role: '',
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      const { email, firstname, accesstoken, role } = action.payload
      state.email = email
      state.firstname = firstname
      state.accesstoken = accesstoken
      state.role = role
    },
    logout: (state) => {
      state.email = ''
      state.firstname = ''
      state.accesstoken = ''
      state.role = ''
    },
  },
})

export const { setUserData, logout } = userSlice.actions
export default userSlice.reducer
