import type { Car, RequestStatus } from "@/shared/types/types";
import { CAR_SLICE_NAME } from "@/storage/slices/sliceNames";
import { fetchCar, fetchUser } from "@/storage/thunks/thunks";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const carsFromStorage = localStorage.getItem('cars');
const selectedCarId = localStorage.getItem('selectedCarId');
const savedCars = carsFromStorage ? JSON.parse(carsFromStorage) : [];

interface CarState {
    cars: Car[];
    carSelected: Car | null;
    isCheckedMileage: boolean;
    requestStatus: RequestStatus;
    errorMessage: string | null
}

const initialState: CarState = {
    cars: savedCars,
    carSelected: savedCars.find((car: Car) => car.id === selectedCarId) || savedCars[0] || null,
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
                if (state.carSelected) 
                    { state.carSelected.mileage = action.payload.mileage;
                      localStorage.setItem('cars', JSON.stringify(state.cars));
                    }
            }
            
        },
        selectCar:(state, action: PayloadAction<string>) => {
            const foundCar = state.cars.find((car) => car.id === action.payload);
            if (foundCar) {
                state.carSelected = foundCar;
                localStorage.setItem('selectedCarId', action.payload);
                
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
                state.cars.push(newCar);
                state.carSelected = newCar;
                localStorage.setItem('cars', JSON.stringify(state.cars));
                localStorage.setItem('selectedCarId', newCar.id);
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

export const {editCar, selectCar} = carSlice.actions;
export default carSlice.reducer;