import type { AuthResponse, UserLogin, UserRegistration } from "@/shared/types/types";

const BASE_URL = 'https://example.ru';

export const loginUserApi = async(userLogin: UserLogin):Promise<AuthResponse> => {
    const res = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'x-api-key': 'reqres-free-v1'
            },
        body: JSON.stringify(userLogin)
    });
    if (!res.ok) {
        const err = await res.json()
        return Promise.reject(err)
    }
    const data = await res.json();
    return data;
}

export const registerUserApi = async(userRegistration: UserRegistration):Promise<AuthResponse> => {
    const res = await fetch(`${BASE_URL}/registration`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'x-api-key': 'reqres-free-v1'
            },
        body: JSON.stringify(userRegistration)
    });
    if (!res.ok) {
        const err = await res.json()
        return Promise.reject(err)
    }
    const data = await res.json();
    return data;
  };