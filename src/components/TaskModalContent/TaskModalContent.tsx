import type { Task } from '@/shared/types/types';
import styles from './TaskModalContent.module.scss';
import { CalendarIcon, DescrIcon, Input, MileageIcon } from '@/shared/ui';
import { useState } from 'react';
import { InputDate } from '@/shared/ui/Input/InputDate';
import { parseMileage } from '@/shared/lib';
import { format } from 'date-fns';

interface TaskModalContentProps {
    task: Task;
    onOpenModal: () => void;
    onUpdateField: (data: Partial<Task>) => void;
}

export const TaskModalContent = ({task, onOpenModal, onUpdateField}: TaskModalContentProps) => {
    const [editText, setEditText] = useState(task.text);
    const [editDesc, setEditDesc] = useState(task.description || "");
    const [editMileage, setEditMileage] = useState(task.targetMileage);
    const [editDate, setEditDate] = useState(
        task.targetDate ? new Date(task.targetDate) : null 
    );
    return(
        <div className={styles.modal__content} onClick={onOpenModal}>
            <h2>
                <Input 
                    value={editText} 
                    onChange={setEditText} 
                    variant='inline' 
                    onBlur={() => onUpdateField({text: editText})}
                    placeholder='Введите название задачи'/>
            </h2>
            <div className={styles.modal__content_info}>
                <div className={styles.modal__content_wrap}>
                    <DescrIcon/>
                    <Input 
                        value={editDesc} 
                        onChange={setEditDesc} 
                        onBlur={() => onUpdateField({description: editDesc})}
                        variant='inline' 
                        placeholder='Добавить описание'
                        />
                </div> 
                <div className={styles.modal__content_wrap}>
                    <CalendarIcon/>
                    <InputDate 
                        selectedDate={editDate} 
                        onChangeDate={(date) => {
                            setEditDate(date), 
                            onUpdateField(
                                {targetDate: date ? format(date, 'yyyy-MM-dd') : null})
                            }} 
                        variant='inline'
                        placeholder='Добавить дату'/>
                </div>
                <div className={styles.modal__content_wrap}>
                    <MileageIcon/>
                    <Input 
                        value={String(editMileage)} 
                        onChange={value => setEditMileage(parseMileage(value))}
                        onBlur={() => onUpdateField({targetMileage: editMileage})} 
                        variant='inline'
                        placeholder='Указать пробег'/>
                </div>
            </div>
        </div>
    )
}