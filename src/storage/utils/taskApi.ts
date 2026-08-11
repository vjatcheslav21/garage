import type { Task } from "@/shared/types/types";
import { BASE_URL } from "@/storage/utils/api";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

let mockDatabase: Task[] = [
    { 
        id: 1, 
        text: 'Поменять масло', 
        isDone: false, 
        targetMileage: 95000, 
        actualMileage: undefined, 
        description: 'Синтетика 5W-30' },
    { 
        id: 2, 
        text: 'Проверить тормоза', 
        isDone: true, 
        targetMileage: 80000, 
        actualMileage: undefined, 
        description: 'Передние колодки' }
]

export const fetchTasksApi = createApi({
   baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}` }),
   tagTypes: ['Tasks'],
   endpoints: (build) => ({
    // getTasks: build.query<Task[], void>({
    //   query: () => 'tasks'
    // }),
    getTasks: build.query<Task[], void>({
        queryFn: async () => {
            await new Promise(resolve => setTimeout(resolve, 1500));
            return { data: [...mockDatabase] };
        },
        providesTags: ['Tasks'],
        }),
    addTask: build.mutation<Task, Partial<Task>>({
        queryFn: async (partialTask: Partial<Task>) => {
            // const response = await fetch('/tasks', { method: 'POST', body: JSON.stringify(newTaskData) });
            // const data = await response.json();
            await new Promise((resolve) => setTimeout(resolve, 800));
            const createdTask: Task = {
                id: Date.now(),
                text: partialTask.text || '',
                isDone: false,
                targetMileage: partialTask.targetMileage || 0,
                actualMileage: undefined,
                description: partialTask.description || ''
            };
            mockDatabase = [...mockDatabase, createdTask];
            return { data: createdTask };
        },
        invalidatesTags: ['Tasks'],
        }),
    deleteTask: build.mutation<void, number>({
        // query: (updatedData) => ({ url: `tasks/${updatedData.id}`, method: 'PATCH', body: updatedData })
        queryFn: async (id) => {
            await new Promise((resolve) => setTimeout(resolve, 500));
            mockDatabase = mockDatabase.filter((task) => task.id !== id)
            return {data: undefined}
        },
        invalidatesTags: ['Tasks'],
        }),
    updateTask: build.mutation<Task, Partial<Task>>({
        // query: (id) => ({ url: `tasks/${id}`, method: 'UPDATE' })
        queryFn: async (updatedData) => {
            await new Promise((resolve) => setTimeout(resolve, 200));
            mockDatabase = mockDatabase.map((task) => {
                if(task.id === updatedData.id) {
                    return {...task, ...updatedData}
                }
                return task
            })
            const updated = mockDatabase.find(t => t.id === updatedData.id);
            return {data: updated!}
        },
        invalidatesTags: ['Tasks'],
    }),
    }),
});


export const { 
                useGetTasksQuery, 
                useAddTaskMutation,
                useDeleteTaskMutation,
                useUpdateTaskMutation
            } = fetchTasksApi;