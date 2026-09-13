import type { BasicCarInfo, Car, TUser, UserRegistration } from "@/shared/types/types";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface UserLogin { email: string; password: string };

export const fetchUser = createAsyncThunk<TUser, UserLogin>('user/login', async (loginData) => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    if (loginData.email === 'test@ya.ru') {
        return { 
                  token: String(crypto.randomUUID),
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
              token: String(crypto.randomUUID), 
              name: registrationData.name, 
              email: registrationData.email 
            } 
})

export const fetchCar = createAsyncThunk<Car, BasicCarInfo>('car/create', async (carData) => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    return {
              name: carData.name,
              id: crypto.randomUUID(),
              mileage: carData.mileage

    }
})