import { UI_SLICE_NAME } from "@/storage/slices/sliceNames";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


interface uiState {
    selectedTaskId: number | null;
}

const initialState: uiState = {
    selectedTaskId: null
}

export const uiSlice = createSlice({
    name: UI_SLICE_NAME,
    initialState,
    reducers: {
        setSelectedTask(state, action: PayloadAction<number>) {
            state.selectedTaskId = action.payload;
        },
        clearSelectedTask(state) {
            state.selectedTaskId = null;
        }
    }
})

export const {setSelectedTask, clearSelectedTask} = uiSlice.actions;
export default uiSlice.reducer;
