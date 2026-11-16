import { generateId } from "@/shared/lib/generateId";
import type { BasicCarInfo, Car, TUser, UserRegistration } from "@/shared/types/types";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface UserLogin { email: string; password: string };

export const fetchUser = createAsyncThunk<TUser, UserLogin>('user/login', async (loginData) => {
    await new Promise(resolve => setTimeout(resolve, 1500));

    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');

    const foundUser = existingUsers.find((u: any) => u.email === loginData.email);

    if (!foundUser) {
        throw new Error('Пользователь не найден');
    }

    if (foundUser.password !== loginData.password) {
        throw new Error('Неверный пароль');
    }

    const newToken = generateId();

    foundUser.token = newToken;
    localStorage.setItem('users', JSON.stringify(existingUsers));

    return { 
            token: newToken,
            name: foundUser.name, 
            email: foundUser.email 
        }; 
}) 

export const registerUser = createAsyncThunk<TUser, UserRegistration>(
    'user/registration', 
    async (registrationData) => {
        await new Promise(resolve => setTimeout(resolve, 0));
        
        const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
        if (existingUsers.some((u: any) => u.email === registrationData.email)) {
            throw new Error('Пользователь с таким email уже существует');
        }
        const newUser = { 
            token: generateId(), 
            name: registrationData.name, 
            email: registrationData.email,
            password: registrationData.password 
        };
        existingUsers.push({...newUser, password: registrationData.password});
        localStorage.setItem('users', JSON.stringify(existingUsers));
        
        return { 
            token: newUser.token, 
            name: newUser.name, 
            email: newUser.email 
        }; 
    }
)

export const fetchCar = createAsyncThunk<Car, BasicCarInfo>('car/create', async (carData) => {
    await new Promise(resolve => setTimeout(resolve, 0));
    return {
              name: carData.name,
              id: generateId(),
              mileage: carData.mileage

    }
})