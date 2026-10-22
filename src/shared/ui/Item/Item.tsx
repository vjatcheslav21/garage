import type { Task, TaskStatus } from "@/shared/types/types";
import styles from './Item.module.scss';
import { Button, CheckIcon, EditTaskForm } from "@/shared/ui";
import { cn } from "@/shared/lib/clsx";
import { memo, useRef, useState } from "react";
import { TaskContent } from "@/components";
import { useClickOutside, useMediaQuery } from "@/storage/hooks";

interface ItemProps {
    task: Task;
    variant?: TaskStatus;
    currentMileage: number;
    onOpenModal:(id: number) => void;
    onToggle:() => void;
    onDelete:() => void;
    onStartEdit: () => void;
    onSave: (text: string, desc: string, mileage: number, date: Date|null) => void;
    onCancel: () => void;
    isEditing: boolean;
}

export const Item = memo(({ 
        task, 
        currentMileage, 
        onOpenModal,
        onToggle, 
        onDelete, 
        onStartEdit, 
        onSave, 
        onCancel, 
        isEditing 
        }: ItemProps) => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null); 
    const isDone = task.isDone;
    const isDesktop = useMediaQuery('(min-width: 576px)');
    useClickOutside(menuRef, () => setIsMenuOpen(false));

    const handleOpenTask = () => {
        if (isDesktop) {
            onStartEdit();
        } else {
            onOpenModal(task.id);
        }
    }

    return(
        <div className={styles.item}>
            <Button 
                child={isDone ? <CheckIcon/> : '☐'} 
                ariaLabelledby={isDone ? `Отметить задачу "${task.text}" как не выполненную` : `Отметить задачу "${task.text}" как выполненную`}
                type='button' 
                className={cn(styles.item_btn, styles['item_btn-check'])}
                variant="checkbox"
                onClick={
                onToggle
            }/>

            <TaskContent 
                task={task} 
                currentMileage={currentMileage} 
                onOpenModal={handleOpenTask}
                />

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
                isDone={task.isDone}
                initialText={task.text} 
                initialDescription={task.description} 
                initialMileage={task.targetMileage}
                initialDate={task.targetDate ? new Date(task.targetDate) : null}
                onSave={(text, desc, mileage, date) => onSave(text, desc, mileage, date)}
                onCancel={onCancel} 
            /> : null }
        </div>
    )
})