// Tasks.tsx
import type { Task } from "@/shared/types/types";
import { List } from "@/shared/ui/List";
import { useState } from "react";
import styles from './Tasks.module.scss';
import { AddTaskDropdown } from "@/components";
import { useLocalStorage } from "@/storage/hooks/useLocalStorage";

interface TasksProps {
  currentMileage: number;
}

export const Tasks = ({ currentMileage }: TasksProps) => {
  const [tasks, setTasks] = useLocalStorage<Task[]>("carTask", []);
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);

  const handleAddTask = (text: string, targetMileage: number) => {
    const newTask: Task = {
      id: Date.now(),
      text: text,
      isDone: false,
      targetMileage,
      actualMileage: undefined,
      description: ""
    }
    setTasks((prev) => [...prev, newTask]);
  }

  const handleStartEdit = (id: number) => {
    setEditingTaskId(id)
  }

  const handleSaveEdit = (id: number, newText: string, newDesc: string, newMileage: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, text: newText, description: newDesc, targetMileage: newMileage }
          : task
      )
    );
    setEditingTaskId(null);
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
  };
  
  const handleToggleTask = (id: number) => {
    if (editingTaskId === id) return; 
      setTasks((prev) =>
          prev.map((task) => {
              if (task.id === id) {
                  const newIsDoneStatus = !task.isDone;
                    return {
                      ...task,
                      isDone: newIsDoneStatus,
                      actualMileage: newIsDoneStatus ? currentMileage : undefined, 
                    };
              }
              return task;
          })
      );
  };

  const handleDeleteTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }

  const inWorkTasks = tasks
    .filter((t) => !t.isDone)
    .sort((a, b) => {
      const remainingA = a.targetMileage - currentMileage;
      const remainingB = b.targetMileage - currentMileage;
      return remainingA - remainingB; 
    });

  const isDoneTasks = tasks
    .filter((t) => t.isDone)
    .sort((a, b) => (b.actualMileage || 0) - (a.actualMileage || 0));

  return (
    <div className={styles.tasks}>
        <h2 className={styles.tasks_title}>Планировщик ТО</h2>
        <AddTaskDropdown onAddTask={handleAddTask} />
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
    </div>
  );
}