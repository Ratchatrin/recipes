import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    idProduct: null, 
    loading: false,
    error: false,
  },
  reducers: {
    getId : (state,action) => {
      state.idProduct = action.payload
    }
  },
});
export const {getId} = userSlice.actions
export default userSlice.reducer;