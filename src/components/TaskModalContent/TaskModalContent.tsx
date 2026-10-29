import type { Task } from '@/shared/types/types';
import styles from './TaskModalContent.module.scss';
import { CalendarIcon, DescrIcon, ErrorMessage, Input, MileageIcon } from '@/shared/ui';
import { useState } from 'react';
import { InputDate } from '@/shared/ui/Input/InputDate';
import { parseMileage, validateMileage, validateName } from '@/shared/lib';
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
    const [error, setError] = useState<string | null>(null);


    const handleTextChange = (value: string) => {
        if (value.length <= 25) {
            setEditText(value)
            if(error) setError(null);
        }
    }

    const handleMileageChange = (value: string) => {
        const cleaned = value.replace(/\D/g, '').slice(0, 7);
        const num = parseMileage(cleaned);
        setEditMileage(num);
        if(error) setError(null);
    }

    const handleTextBlur = () => {
        if (editText === task.text) return;

        const textResult = validateName(editText);
        if (textResult.error) {
            setError(textResult.error)
            return;
        }
        setError(null);
        onUpdateField({ text: textResult.value });
    }

    const handleMileageBlur = () => {
        if (editMileage === task.targetMileage) return;

        const mileageResult = validateMileage(String(editMileage));
        if (mileageResult.error) {
            setError(mileageResult.error);
            return;
        }
        setError(null);
        onUpdateField({ targetMileage: mileageResult.value });
    }

    const handleDateChange = (date: Date | null) => {
        setEditDate(date);
        setError(null);
        onUpdateField({ targetDate: date ? format(date, 'yyyy-MM-dd') : null })
    }

    return(
        <div className={styles.modal__content} onClick={onOpenModal}>
            <h2>
                <Input 
                    value={editText} 
                    onChange={handleTextChange} 
                    variant='inline' 
                    onBlur={handleTextBlur}
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
                        onChangeDate={handleDateChange} 
                        variant='inline'
                        placeholder='Добавить дату'/>
                </div>
                <div className={styles.modal__content_wrap}>
                    <MileageIcon/>
                    <Input 
                        value={String(editMileage)} 
                        onChange={handleMileageChange}
                        onBlur={handleMileageBlur} 
                        variant='inline'
                        placeholder='Указать пробег'/>
                </div>
                {error && <ErrorMessage error={error}/>}
            </div>
        </div>
    )
}