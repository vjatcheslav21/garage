import type { Task, TaskStatus } from "@/shared/types/types";
import styles from './Item.module.scss';
import { Button, EditTaskForm } from "@/shared/ui";
import { cn } from "@/shared/lib/clsx";
import { useEffect, useRef, useState } from "react";

interface ItemProps {
    task: Task;
    variant?: TaskStatus;
    currentMileage: number;
    onToggle:() => void;
    onDelete:() => void;
    onStartEdit: () => void;
    onSave: (text: string, desc: string, mileage: number) => void;
    onCancel: () => void;
    isEditing: boolean;
}

export const Item = ({ 
        task, 
        currentMileage, 
        onToggle, 
        onDelete, 
        onStartEdit, 
        onSave, 
        onCancel, 
        isEditing 
        }: ItemProps) => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null); 

    useEffect(() => {
        if(isEditing) {
            setIsMenuOpen(false);
        }
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false)
            }
        }
        if (isMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return() => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [isMenuOpen]);

    const isDone = task.isDone;

    let statusText = '';
    let statusClass = '';

    if (isDone) {
    const displayMileage = task.actualMileage ?? task.targetMileage;
        statusText = `Выполнено на ${displayMileage.toLocaleString('ru-RU')} км`;
        statusClass = styles.status_done;
    } else {
        const remainingKm = task.targetMileage - currentMileage;
        if (remainingKm <= 0) {
            statusText = `Просрочено на ${Math.abs(remainingKm).toLocaleString('ru-RU')} км!`;
            statusClass = styles.status_overdue;
        } else {
            statusText = `Через: ${remainingKm.toLocaleString('ru-RU')} км`;
            statusClass = styles.status_waiting;
        }
    }

    return(
        <div className={styles.item}>
                <Button 
                    child={isDone ? '☑' : '☐'} 
                    ariaLabelledby={isDone ? `Отметить задачу "${task.text}" как не выполненную` : `Отметить задачу "${task.text}" как выполненную`}
                    type='button' 
                    className={styles.item_btn}
                    variant="checkbox"
                    onClick={
                    onToggle
                }/>
                    
            <div className={styles.item_content} onClick={onStartEdit}>
                <li className={cn(styles.item_text, isDone && styles.item_done)}>{task.text}</li>
                {task.description && (
                    <p className={styles.item_description}>{task.description}</p>
                )}
                <span className={cn(styles.status_budge, statusClass)}>{statusText}</span>
            </div>
            <div className={styles.action_menu_container} ref={menuRef}>
                <button 
                    className={styles.dots_btn}
                    onClick={(e) => {
                            e.stopPropagation();
                            setIsMenuOpen(prev => !prev)}}>
                     ⋮
                </button>
                {isMenuOpen && (
                    <div className={styles.action_menu}>
                        <button 
                            className={styles.menu_item}
                            onClick={(e) => {
                                e.stopPropagation();
                                onStartEdit();
                                setIsMenuOpen(false);
                            }}
                            >
                            ✏️ Редактировать</button>
                        <button 
                            className={cn(styles.menu_item, styles.menu_item_danger)}
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete();
                                setIsMenuOpen(false);
                            }}
                            >
                            🗑️ Удалить
                        </button>
                    </div>
                )}
            </div>
            {isEditing ? <EditTaskForm 
                initialText={task.text} 
                initialDescription={task.description} 
                initialMileage={task.targetMileage}
                onSave={(text, desc, mileage) => onSave(text, desc, mileage)}
                onCancel={onCancel} 
            /> : null }
        </div>
    )
}