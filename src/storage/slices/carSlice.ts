import type { Car, RequestStatus } from "@/shared/types/types";
import { CAR_SLICE_NAME } from "@/storage/slices/sliceNames";
import { fetchCar, fetchUser } from "@/storage/thunks/thunks";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// const carsFromStorage = localStorage.getItem('cars');
// const selectedCarId = localStorage.getItem('selectedCarId');
// const savedCars = carsFromStorage ? JSON.parse(carsFromStorage) : [];

const getUserCarsKey = () => {
    const userStr = localStorage.getItem('user');
    if (!userStr) return 'cars_guest';
    try {
        const user = JSON.parse(userStr);
        return `cars_${user.email}`;
    } catch {
        return 'cars_guest';
    }
};

const getUserSelectedCarKey = () => {
    const userStr = localStorage.getItem('user');
    if (!userStr) return 'selectedCarId_guest';
    try {
        const user = JSON.parse(userStr);
        return `selectedCarId_${user.email}`;
    } catch {
        return 'selectedCarId_guest';
    }
};

interface CarState {
    cars: Car[];
    carSelected: Car | null;
    isCheckedMileage: boolean;
    requestStatus: RequestStatus;
    errorMessage: string | null
}

const initialState: CarState = {
    cars: (() => {
        const carsStr = localStorage.getItem(getUserCarsKey());
        return carsStr ? JSON.parse(carsStr) : [];
    })(),
    carSelected: (() => {
        const carsStr = localStorage.getItem(getUserCarsKey());
        const cars = carsStr ? JSON.parse(carsStr) : [];
        const selectedId = localStorage.getItem(getUserSelectedCarKey());
        return cars.find((car: Car) => car.id === selectedId) || cars[0] || null;
    })(),
    isCheckedMileage: false,
    requestStatus: 'Idle',
    errorMessage: null
}

const carSlice = createSlice({
    name: CAR_SLICE_NAME,
    initialState,
    reducers: {
        editCar:(state, action: PayloadAction<{ mileage: number }>) => {
            const carToUpdate = state.cars.find((car) => car.id === state.carSelected?.id);
            if (carToUpdate) {
                carToUpdate.mileage = action.payload.mileage;
                if (state.carSelected) { 
                    state.carSelected.mileage = action.payload.mileage;
                    // localStorage.setItem('cars', JSON.stringify(state.cars));
                    localStorage.setItem(getUserCarsKey(), JSON.stringify(state.cars));
                }
            }
        },
        editCarName:(state, action: PayloadAction<string>) => {
            if (state.carSelected) {
                state.carSelected.name = action.payload;
                const carUpdate = state.cars.find(car => car.id === state.carSelected?.id);
                if (carUpdate) {
                    carUpdate.name = action.payload;
                }
                // localStorage.setItem('cars', JSON.stringify(state.cars));
                localStorage.setItem(getUserCarsKey(), JSON.stringify(state.cars));
            }
        },
        selectCar:(state, action: PayloadAction<string>) => {
            const foundCar = state.cars.find((car) => car.id === action.payload);
            if (foundCar) {
                state.carSelected = foundCar;
                // localStorage.setItem('selectedCarId', action.payload);
                localStorage.setItem(getUserSelectedCarKey(), action.payload);
            }
        },
        loadCarsForCurrentUser: (state) => {
            const carsStr = localStorage.getItem(getUserCarsKey());
            const cars = carsStr ? JSON.parse(carsStr) : [];
            state.cars = cars;
            
            const selectedId = localStorage.getItem(getUserSelectedCarKey());
            state.carSelected = cars.find((car: Car) => car.id === selectedId) || cars[0] || null;
        },
        
        clearCarsState: (state) => {
            state.cars = [];
            state.carSelected = null;
        },
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
                // localStorage.setItem('cars', JSON.stringify(state.cars));
                // localStorage.setItem('selectedCarId', newCar.id);
                localStorage.setItem(getUserCarsKey(), JSON.stringify(state.cars));
                localStorage.setItem(getUserSelectedCarKey(), newCar.id);
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

export const { editCar, selectCar, editCarName, loadCarsForCurrentUser, clearCarsState } = carSlice.actions;
export default carSlice.reducer;