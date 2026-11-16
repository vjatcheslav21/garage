import type { Dimension, RequestStatus, Theme, TUser } from "@/shared/types/types";
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
    selectDimension: Dimension;
    requestStatus: RequestStatus;
    errorMessage: string | null;
    themeColor: Theme;
}

const initialState: UserState = {
    user: savedUser,
    isAuth: !!savedUser,
    selectDimension: 'mileage',
    requestStatus: 'Idle',
    errorMessage: null,
    themeColor: getTheme()
}

const userSlice = createSlice({
    name: USER_SLICE_NAME,
    initialState,
    reducers: {
        userLogin: (state, actions) => {
            state.isAuth = true
            state.user = actions.payload
        },
        userLogout: (state) => {
            state.isAuth = false;
            state.user = null;
            state.requestStatus = 'Idle';
            state.errorMessage = null;
            localStorage.removeItem('user');
        },
        updateProfile: (state, action: PayloadAction<{ name: string; email: string }>) => {
            if (!state.user) return;
            
            const oldEmail = state.user.email;
            const newEmail = action.payload.email;
            
            state.user.name = action.payload.name;
            state.user.email = newEmail;
            
            localStorage.setItem('user', JSON.stringify(state.user));
            
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const updatedUsers = users.map((u: any) => {
                if (u.email === oldEmail) {
                    return { ...u, name: action.payload.name, email: newEmail };
                }
                return u;
            });
            localStorage.setItem('users', JSON.stringify(updatedUsers));
            
            if (oldEmail !== newEmail) {
                const oldCarsKey = `cars_${oldEmail}`;
                const newCarsKey = `cars_${newEmail}`;
                const oldSelectedKey = `selectedCarId_${oldEmail}`;
                const newSelectedKey = `selectedCarId_${newEmail}`;
                
                const cars = localStorage.getItem(oldCarsKey);
                const selectedId = localStorage.getItem(oldSelectedKey);
                
                if (cars) {
                    localStorage.setItem(newCarsKey, cars);
                    localStorage.removeItem(oldCarsKey);
                }
                if (selectedId) {
                    localStorage.setItem(newSelectedKey, selectedId);
                    localStorage.removeItem(oldSelectedKey);
                }
            }
            
            if (oldEmail !== newEmail) {
                const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
                const updatedTasks = tasks.map((t: any) => 
                    t.userEmail === oldEmail 
                        ? { ...t, userEmail: newEmail } 
                        : t
                );
                localStorage.setItem('tasks', JSON.stringify(updatedTasks));
            }
        },
        setDimension: (state, action: PayloadAction<Dimension>) => {
            state.selectDimension = action.payload
        },
        toggleTheme:(state, action: PayloadAction<Theme>) => {
            state.themeColor = action.payload
        },
        clearError: (state) => {
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

export const {userLogin, userLogout, updateProfile, setDimension, toggleTheme, clearError} = userSlice.actions;
export default userSlice.reducer;