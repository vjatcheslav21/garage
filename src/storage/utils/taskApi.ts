import type { Task } from "@/shared/types/types";
import { BASE_URL } from "@/storage/utils/api";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

let mockDatabase: Task[] = [];

export const fetchTasksApi = createApi({
   baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}` }),
   tagTypes: ['Tasks'],
   endpoints: (build) => ({
    // getTasks: build.query<Task[], void>({
    //   query: () => 'tasks'
    // }),
    getTasks: build.query<Task[], void>({
        queryFn: async (_arg, { getState }) => {
            await new Promise(resolve => setTimeout(resolve, 1000));
            const state = getState() as any;
            const userEmail = state.user.user?.email;
            const userTasks = mockDatabase.filter(t => t.userEmail === userEmail);
            return { data: userTasks };
        },
        providesTags: ['Tasks'],
        }),
    addTask: build.mutation<Task, Partial<Task>>({
        queryFn: async (partialTask: Partial<Task>, { getState }) => {
            // const response = await fetch('/tasks', { method: 'POST', body: JSON.stringify(newTaskData) });
            // const data = await response.json();
            await new Promise((resolve) => setTimeout(resolve, 800));
            const state = getState() as any;
            const userEmail = state.user.user?.email || '';
            const createdTask: Task = {
                id: Date.now(),
                text: partialTask.text || '',
                isDone: false,
                targetMileage: partialTask.targetMileage || 0,
                actualMileage: undefined,
                targetDate: partialTask.targetDate || null,
                description: partialTask.description || '',
                carId: partialTask.carId || '',
                userEmail
            };
            mockDatabase = [...mockDatabase, createdTask];
            return { data: createdTask };
        },
        invalidatesTags: ['Tasks'],
        }),
    deleteTask: build.mutation<void, number>({
        // query: (updatedData) => ({ url: `tasks/${updatedData.id}`, method: 'PATCH', body: updatedData })
        queryFn: async (id, { getState }) => {
            await new Promise((resolve) => setTimeout(resolve, 500));
            const state = getState() as any;
            const userEmail = state.user.user?.email;
            mockDatabase = mockDatabase.filter((task) => !(task.id === id && task.userEmail === userEmail));
            return {data: undefined}
        },
        invalidatesTags: ['Tasks'],
        }),
    updateTask: build.mutation<Task, Partial<Task>>({
        // query: (id) => ({ url: `tasks/${id}`, method: 'UPDATE' })
        queryFn: async (updatedData, { getState }) => {
            await new Promise((resolve) => setTimeout(resolve, 200));
            const state = getState() as any;
            const userEmail = state.user.user?.email;
            mockDatabase = mockDatabase.map((task) => {
                if(task.id === updatedData.id && task.userEmail === userEmail) {
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