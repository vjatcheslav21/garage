import type { RequestStatus, TUser } from "@/shared/types/types";
import { USER_SLICE_NAME } from "@/storage/slices/sliceNames";
import { fetchUser, registerUser } from "@/storage/thunks/thunks";
import { createSlice } from "@reduxjs/toolkit";

interface UserState {
    user: TUser | null;
    isAuth: boolean;
    requestStatus: RequestStatus;
    errorMessage: string | null
}

const initialState: UserState = {
    user: null,
    isAuth: false,
    requestStatus: 'Idle',
    errorMessage: null
}


const userSlice = createSlice({
    name: USER_SLICE_NAME,
    initialState,
    reducers: {
        userLogin:(state, actions) => {
            state.isAuth = true
            state.user = actions.payload
        },
        userLogout:(state) => {
            state.isAuth = false
            state.user = null;
            state.requestStatus = 'Idle';
            state.errorMessage = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, state => {
                state.requestStatus = 'Loading';
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.isAuth = true;
                state.requestStatus = 'Success';
                state.user = action.payload;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.isAuth = false;
                state.requestStatus = 'Failed';
                state.errorMessage = action.error.message ?? null;
            })
            
            .addCase(registerUser.pending, state => {
                state.requestStatus = 'Loading';
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isAuth = true;
                state.requestStatus = 'Success';
                state.user = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isAuth = false;
                state.requestStatus = 'Failed';
                state.errorMessage = action.error.message ?? null;
            })
    }
})

export const {userLogin, userLogout} = userSlice.actions;
export default userSlice.reducer;