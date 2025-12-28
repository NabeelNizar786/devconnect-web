import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  authChecked: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
      state.authChecked = true
      state.isLoggedIn = action.payload || false 
    },
    removeUser: (state, action) => {
      state.user = null;
      state.authChecked = true
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
