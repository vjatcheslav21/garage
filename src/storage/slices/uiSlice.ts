import { UI_SLICE_NAME } from "@/storage/slices/sliceNames";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


interface uiState {
    selectedTaskId: number | null;
    prefillTaskData: { text: string, description: string } | null
}

const initialState: uiState = {
    selectedTaskId: null,
    prefillTaskData: null
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
        },
        setPrefillTaskData(state, action: PayloadAction<{text: string, description: string}>) {
            state.prefillTaskData = action.payload;
        },
        clearPrefillTaskData(state) {
            state.prefillTaskData = null;
        }
    }
})

export const {setSelectedTask, clearSelectedTask, setPrefillTaskData, clearPrefillTaskData} = uiSlice.actions;
export default uiSlice.reducer;
