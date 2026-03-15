import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CurrentUserState {
  id: string;
  email: string;
  loggedIn: boolean;
  name: string;
}

const initialState: CurrentUserState = {
  id: "",
  email: "",
  loggedIn: false,
  name: "",
};

const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<CurrentUserState>) => {
      return action.payload;
    },
    removeCurrentUser: () => {
      return initialState;
    },
  },
});

export const { setCurrentUser, removeCurrentUser } = currentUserSlice.actions;
export default currentUserSlice.reducer;
