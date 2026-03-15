import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum Page {
  HOME = "HOME",
  LOGIN = "LOGIN",
  PROFILE = "PROFILE",
  REGISTER = "REGISTER",
}

export type PageState = Page;

const initialState: PageState = Page.HOME;

const pageSlice = createSlice({
  name: "page",
  initialState: initialState as PageState,
  reducers: {
    setPage: (state, action: PayloadAction<Page>) => {
      return action.payload;
    },
  },
});

export const { setPage } = pageSlice.actions;
export default pageSlice.reducer;
