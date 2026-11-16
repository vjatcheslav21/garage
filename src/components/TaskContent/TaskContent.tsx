import type { Task } from "@/shared/types/types"
import { format } from "date-fns";
import styles from './TaskContent.module.scss';
import { useAppSelector } from "@/storage/hooks/hooks";
import { cn } from "@/shared/lib/clsx";

interface TaskContentProp {
    task: Task;
    currentMileage: number;
    onOpenModal: () => void;
}

export const TaskContent = ({task, currentMileage, onOpenModal}: TaskContentProp) => {
    const dimension = useAppSelector(state => state.user.selectDimension);
    const isDone = task.isDone;
    let statusText = '';
    let statusClass = '';
    const displayMileage = task.actualMileage ?? task.targetMileage;
    if (isDone) {
        const withoutMileage = displayMileage === 0 
            ? 
        `Выполнено ${format(new Date(), 'dd.MM.yyyy')}` 
        : 
        `Выполнено на ${displayMileage.toLocaleString('ru-RU')} км`
        ;
        statusText = dimension === 'mileage' ? withoutMileage : `Выполнено ${format(new Date(), 'dd.MM.yyyy')}`;
        statusClass = styles.status_done;
    }
    else if (dimension === 'date' && task.targetDate) {
        const taskDate = new Date(task.targetDate);
        const today = new Date();
        if (taskDate < today) {
            statusText = `Просрочено (до ${format(taskDate, 'dd.MM.yyyy')})`;
            statusClass = styles.status_overdue;
        } else {
            statusText = `до ${format(taskDate, 'dd.MM.yyyy')}`;
            statusClass = styles.status_waiting;
        }
    }
    else if (task.targetMileage > 0) {
        const remainingKm = task.targetMileage - currentMileage;
        if (remainingKm <= 0) {
            statusText = `Просрочено на ${Math.abs(remainingKm).toLocaleString('ru-RU')} км!`;
            statusClass = styles.status_overdue;
        } else {   
            statusText = `Через: ${remainingKm.toLocaleString('ru-RU')} км`;
            statusClass = styles.status_waiting;
        }    
    }
    else if (task.targetDate) {
        const taskDate = new Date(task.targetDate);
        const today = new Date();
        if (taskDate < today) {
            statusText = `Просрочено (до ${format(taskDate, 'dd.MM.yyyy')})`;
            statusClass = styles.status_overdue;
        } else {
            statusText = `до ${format(taskDate, 'dd.MM.yyyy')}`;
            statusClass = styles.status_waiting;
        }
    }
    else {
        statusText = 'Без срока';
        statusClass = styles.status_waiting;
    }

    return (
        <>
            <div className={styles.item__content} onClick={onOpenModal}> 
                <li className={cn(styles.item__content_text, isDone && styles.item_done)}>{task.text}</li>
                {task.description &&(
                    <p className={styles.item__content_description}>{task.description}</p>)}
                <span className={cn(styles.status_budge, statusClass)}>{statusText}</span>
            </div>
        </>
    )
}