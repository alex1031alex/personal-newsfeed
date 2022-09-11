import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Source } from "./types";

const initialState: Source[] = [];

export const sourceSlice = createSlice({
  name: "sources",
  initialState,
  reducers: {
    setSources: (state, action: PayloadAction<Source[]>) => {
      return action.payload;
    },
  },
});

export const { setSources } = sourceSlice.actions;
export default sourceSlice.reducer;
