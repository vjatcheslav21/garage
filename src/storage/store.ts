import userReducer from "@/storage/slices/userSlice";
import {  configureStore } from "@reduxjs/toolkit";

const store = configureStore ({
    reducer: {user: userReducer}
}) 

export type RootState = ReturnType<typeof store.getState>

export default store;