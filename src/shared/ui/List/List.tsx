
import type { ListProps } from '@/shared/types/types';
import styles from './List.module.scss';
import { cn } from '@/shared/lib/clsx';
import { Item } from '@/shared/ui/Item';


export const List = ({
        items, 
        variant, 
        onOpenModal,
        onToggleTask, 
        onDeleteTask, 
        onStartEdit, 
        onSaveEdit, 
        onCancelEdit, 
        editingTaskId, 
        currentMileage}
        : ListProps) => {

    return(
        <ul className={cn(styles.list, styles[variant])}>
            {items.length === 0 ? (
                <p className={styles.empty_message}>
                    {variant === 'inWork' ? 'Нет активных задач' : 'Нет выполненных задач'}
                </p>
            ) : (
                items.map((task) => (
                    <Item
                        key={task.id}
                        task={task}
                        variant={variant}
                        onOpenModal={() => onOpenModal(task.id)}
                        onToggle={() => onToggleTask?.(task.id)}
                        onDelete={() => onDeleteTask(task.id)}
                        onStartEdit={() => onStartEdit(task.id)}
                        onSave={(text, descr, mileage, date) => onSaveEdit(task.id, text, descr, mileage, date)}
                        onCancel={onCancelEdit}
                        isEditing={editingTaskId === task.id}
                        currentMileage={currentMileage}                        
                        />
                ))
            )}
        </ul>
    )
}