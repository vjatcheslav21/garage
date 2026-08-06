import type { TUser, UserRegistration } from "@/shared/types/types";
// import { loginUserApi } from "@/storage/utils/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface UserLogin { email: string; password: string };

export const fetchUser = createAsyncThunk<TUser, UserLogin>('user/login', async (loginData) => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  if (loginData.email === 'test@ya.ru') {
     return { 
              token: 'fake-token', 
              name: 'Test User', 
              email: loginData.email 
            } 
    } else {
      throw new Error('Неверный логин')
    }
}) 

export const registerUser = createAsyncThunk<TUser, UserRegistration>('user/registration', async (registrationData) => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  return { 
            token: 'fake-token', 
            name: 'Test User', 
            email: registrationData.email 
          } 
})