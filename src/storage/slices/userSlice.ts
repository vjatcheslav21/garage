import type { RequestStatus, Theme, TUser } from "@/shared/types/types";
import { USER_SLICE_NAME } from "@/storage/slices/sliceNames";
import { fetchUser, registerUser } from "@/storage/thunks/thunks";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const getTheme = ():Theme => {
    const theme = `${window?.localStorage?.getItem('theme')}`;
    if (['light', 'dark'].includes(theme)) return theme as Theme;

    const userMedia = window.matchMedia('(prefers-color-scheme: light)');
    if (userMedia.matches) return 'light';

    return 'dark';
}

const userFromStorage = localStorage.getItem('user');
const savedUser = userFromStorage ? JSON.parse(userFromStorage) : null;
interface UserState {
    user: TUser | null;
    isAuth: boolean;
    requestStatus: RequestStatus;
    errorMessage: string | null;
    themeColor: Theme;
}

const initialState: UserState = {
    user: savedUser,
    isAuth: !!savedUser,
    requestStatus: 'Idle',
    errorMessage: null,
    themeColor: getTheme()
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
            localStorage.removeItem('user');
        },
        toggleTheme:(state, action: PayloadAction<Theme>) => {
            state.themeColor = action.payload
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
                localStorage.setItem('user', JSON.stringify(action.payload))
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
                localStorage.setItem('user', JSON.stringify(action.payload))
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isAuth = false;
                state.requestStatus = 'Failed';
                state.errorMessage = action.error.message ?? null;
            })
    }
})

export const {userLogin, userLogout, toggleTheme} = userSlice.actions;
export default userSlice.reducer;