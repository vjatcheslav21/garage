
export type TaskStatus = 'inWork' | 'isDone';

export interface Task {
    id: number;
    text: string;
    isDone: boolean;
    targetMileage: number;
    actualMileage?: number;
    description?: string;
}

export interface ListProps {
    items: Task[];
    variant: TaskStatus;
    onToggleTask: (id: number) => void;
    onDeleteTask: (id: number) => void;
    onStartEdit: (id: number) => void;
    onSaveEdit: (id: number, text: string, desc: string, mileage: number) => void;
    onCancelEdit: () => void;
    editingTaskId: number | null;
    currentMileage: number;
}

export interface UserRegistration {
    name: string;
    email: string;
    password?: string;
}

export interface UserLogin {
    email: string;
    password: string 
}

export interface AuthResponse {
    token: string;
}

export type TUser = {
    name: string;
    email: string;
    token?: string;
}

export interface Car {
    name: string;
    id: string;
    mileage: number | null;
}

export type BasicCarInfo = Pick<Car, 'name' | 'mileage'>

export type RequestStatus = 'Idle' | 'Loading' | 'Success' | 'Failed';
