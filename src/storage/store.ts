import userReducer from "@/storage/slices/userSlice";
import carsReducer from '@/storage/slices/carSlice';
import uiReducer from '@/storage/slices/uiSlice';
import { fetchTasksApi } from "@/storage/utils/taskApi";
import {  configureStore } from "@reduxjs/toolkit";

const store = configureStore ({
    reducer: {
        user: userReducer,
        cars: carsReducer,
        ui: uiReducer,
        [fetchTasksApi.reducerPath]: fetchTasksApi.reducer 
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(fetchTasksApi.middleware)
}) 

export type RootState = ReturnType<typeof store.getState>

export default store;