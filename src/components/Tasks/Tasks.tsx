import { List } from "@/shared/ui/List";
import styles from './Tasks.module.scss';
import { AddTaskDropdown, TaskContent } from "@/components";
import {  useAddTaskMutation, 
          useDeleteTaskMutation, 
          useGetTasksQuery, 
          useUpdateTaskMutation 
        } from "@/storage/utils/taskApi";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/storage/hooks/hooks";
import { clearSelectedTask, setSelectedTask } from "@/storage/slices/uiSlice";
import { TaskModal } from "@/shared/ui";
import { format } from "date-fns";

interface TasksProps {
  currentMileage: number;
}

export const Tasks = ({ currentMileage }: TasksProps) => {
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const selectedTaskId = useAppSelector(state => state.ui.selectedTaskId);
  const { data, isLoading, isError } = useGetTasksQuery();
  const [addNewTask] = useAddTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const [updateTask] = useUpdateTaskMutation();
  const activeTask = data?.find(task => task.id === selectedTaskId);
  const dispatch = useAppDispatch();

  const handleCloseModal = () => {
    dispatch(clearSelectedTask())
  }

  const handleAddTask = (text: string, targetMileage?: number, description?: string, targetDate?: string) => {
    addNewTask({text, targetMileage, description, targetDate});
  }

  const handleStartEdit = (id: number) => {
    setEditingTaskId(id);
  }

  const handleOpenModal = (id: number) => {
    dispatch(setSelectedTask(id)); 
  }

  const handleSaveEdit = (
                          id: number, 
                          newText: string, 
                          newDesc: string, 
                          newMileage: number, 
                          newDate: Date|null
                        ) => {
    const formattedDate = newDate ? format(newDate, 'yyyy-MM-dd') : null;
    updateTask(
                { 
                  id: id, 
                  text: newText, 
                  description: newDesc, 
                  targetMileage: newMileage, 
                  targetDate: formattedDate
                });
    setEditingTaskId(null);
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
  };
  
  const handleToggleTask = (id: number) => {
    if (editingTaskId === id) return;
    const task = data?.find(t => t.id === id);
    if(!task) return;
    const newIsDoneStatus = !task.isDone;
    updateTask({
                id: id, 
                isDone: newIsDoneStatus, 
                actualMileage: newIsDoneStatus ? currentMileage: undefined
              })
    setEditingTaskId(null);
  };

  const handleDeleteTask = (id: number) => { deleteTask(id) }

  const inWorkTasks = (data || [])
    .filter((t) => !t.isDone)
    .sort((a, b) => {
      const remainingA = a.targetMileage - currentMileage;
      const remainingB = b.targetMileage - currentMileage;
      return remainingA - remainingB; 
    });

  const isDoneTasks = (data || [])
    .filter((t) => t.isDone)
    .sort((a, b) => (b.actualMileage || 0) - (a.actualMileage || 0));

  return (
    <div className={styles.tasks}>
        <h2 className={styles.tasks_title}>Планировщик ТО</h2>
        <AddTaskDropdown onAddTask={handleAddTask} />
        {isError 
          ? 
          'Ошибка' 
          : 
          isLoading 
          ? 
          'Загрузка' 
          :
          <div className={styles.tasks_wrapper}>
            <div className={styles.tasks_list}>
                <h2 className={styles.tasks_list_title}>Запланировано</h2>
                <List 
                  items={inWorkTasks}
                  variant="inWork"
                  onOpenModal={handleOpenModal}
                  onToggleTask={handleToggleTask}
                  onDeleteTask={handleDeleteTask}
                  onStartEdit={handleStartEdit}
                  onSaveEdit={handleSaveEdit}
                  onCancelEdit={handleCancelEdit}
                  editingTaskId={editingTaskId}
                  currentMileage={currentMileage}       
                />
            </div>
          <div className={styles.tasks_list}>
              <h2 className={styles.tasks_list_title}>Выполнено</h2>
              <List 
                  items={isDoneTasks}
                  variant="isDone"
                  onOpenModal={handleOpenModal}
                  onToggleTask={handleToggleTask}
                  onDeleteTask={handleDeleteTask}
                  onStartEdit={handleStartEdit}
                  onSaveEdit={handleSaveEdit}
                  onCancelEdit={handleCancelEdit}
                  editingTaskId={editingTaskId}
                  currentMileage={currentMileage}      
                />
            </div>
        </div> 
          }
          {activeTask && (
            <TaskModal onClose={handleCloseModal}>
              <TaskContent 
                task={activeTask} 
                currentMileage={currentMileage} 
                onOpenModal={() => {}
              } 
              />
            </TaskModal>
          )}
    </div>
  );
}