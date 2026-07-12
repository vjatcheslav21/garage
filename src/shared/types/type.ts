
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

export interface User {
    name: string;

}

export interface Car {
    name?: string;
    userName: string;
    mileage: number;
}