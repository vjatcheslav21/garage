import type { Car, RequestStatus } from "@/shared/types/types";
import { CAR_SLICE_NAME } from "@/storage/slices/sliceNames";
import { fetchCar, fetchUser } from "@/storage/thunks/thunks";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const carFromStorage = localStorage.getItem('car');
const savedCar = carFromStorage ? JSON.parse(carFromStorage) : null;

interface CarState {
    cars: Car[];
    carSelected: Car | null;
    isCheckedMileage: boolean;
    requestStatus: RequestStatus;
    errorMessage: string | null
}

const initialState: CarState = {
    cars: savedCar ? [savedCar] : [],
    carSelected: savedCar ? savedCar : null,
    isCheckedMileage: false,
    requestStatus: 'Idle',
    errorMessage: null
}



const carSlice = createSlice({
    name: CAR_SLICE_NAME,
    initialState,
    reducers: {
        editCar:(state, action: PayloadAction<{ mileage: number }>) => {
            const carToUpdate = state.cars.find((car) => car.id === state.carSelected?.id)
            if (carToUpdate) {
                carToUpdate.mileage = action.payload.mileage;
            }
        }
    },
    extraReducers: (builder) => {
        builder 
            .addCase(fetchUser.fulfilled, (state, _action) => {
                state.isCheckedMileage = true;
            })
            .addCase(fetchCar.fulfilled, (state, action: PayloadAction<Car>) => {
                const newCar = action.payload;
                state.requestStatus = 'Success';
                localStorage.setItem('car', JSON.stringify(action.payload));
                state.cars.push(newCar);
                state.carSelected = newCar;
            })
            .addCase(fetchCar.rejected, (state, action) => {
                state.requestStatus = 'Failed';
                state.errorMessage = action.error.message ?? null;
            })
                        
            .addCase(fetchCar.pending, state => {
                state.requestStatus = 'Loading';
            })
        
    }
})

export const {editCar} = carSlice.actions;
export default carSlice.reducer;