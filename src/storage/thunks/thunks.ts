import { generateId } from "@/shared/lib/generateId";
import type { BasicCarInfo, Car, TUser, UserRegistration } from "@/shared/types/types";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface UserLogin { email: string; password: string };

export const fetchUser = createAsyncThunk<TUser, UserLogin>('user/login', async (loginData) => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    if (loginData.email === 'test@ya.ru') {
        return { 
                  token: generateId(),
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
              token: generateId(), 
              name: registrationData.name, 
              email: registrationData.email 
            } 
})

export const fetchCar = createAsyncThunk<Car, BasicCarInfo>('car/create', async (carData) => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    return {
              name: carData.name,
              id: generateId(),
              mileage: carData.mileage

    }
})