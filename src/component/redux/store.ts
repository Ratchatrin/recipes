import { configureStore } from "@reduxjs/toolkit";
import slicerReducer from "./slicer";

const store = configureStore({
  reducer: { user: slicerReducer },
});

export default store;
