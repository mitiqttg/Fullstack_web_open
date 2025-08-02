import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: { user: null },
  reducers: {
    setUser(state, action) {
      return { user: action.payload };
    },
    clearUser() {
      return { user: null };
    },
    getAllUsers(state, action) {
      return { ...state, users: action.payload };
    }
  },
});

export const { setUser, clearUser, getAllUsers } = userSlice.actions;
export default userSlice.reducer;
