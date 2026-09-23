import { List } from "@/shared/ui/List";
import styles from './Tasks.module.scss';
import { AddTaskDropdown } from "@/components";
import { useAddTaskMutation, useDeleteTaskMutation, useGetTasksQuery, useUpdateTaskMutation } from "@/storage/utils/taskApi";
import { useState } from "react";

interface TasksProps {
  currentMileage: number;
}

export const Tasks = ({ currentMileage }: TasksProps) => {
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const { data, isLoading, isError } = useGetTasksQuery();
  const [addNewTask] = useAddTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const [updateTask] = useUpdateTaskMutation();
  // const [addNewTask, isAddingTask] = useAddTaskMutation();
  // const [deleteTask, isDeletedTask] = useDeleteTaskMutation();
  // const [updateTask, isUpdatedTask] = useUpdateTaskMutation();

  const handleAddTask = (text: string, targetMileage: number) => {
    addNewTask({text, targetMileage});
  }

  const handleStartEdit = (id: number) => {
    setEditingTaskId(id);
  }

  const handleSaveEdit = (id: number, newText: string, newDesc: string, newMileage: number) => {
    updateTask({id: id, text: newText, description: newDesc, targetMileage: newMileage});
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
    </div>
  );
}