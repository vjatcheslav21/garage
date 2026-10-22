import { useEffect, useRef, useState } from "react";
import styles from './EditTaskForm.module.scss';
import { cn } from "@/shared/lib/clsx";
import { Button, Input } from "@/shared/ui";
import { useAppDispatch, useClickEscape, useClickOutside } from "@/storage/hooks";
import { setPrefillTaskData } from "@/storage/slices/uiSlice";
import { InputDate } from "@/shared/ui/Input/InputDate";

interface EditTaskFormProps {
    isDone?: boolean;
    initialText: string;
    initialDescription?: string;
    initialMileage: number;
    initialDate: Date | null;
    onSave: (text: string, desc: string, mileage: number, date: Date|null) => void;
    onCancel: () => void; 
}

export const EditTaskForm = ({ 
                              isDone, 
                              initialText, 
                              initialDescription, 
                              initialMileage, 
                              initialDate, 
                              onSave, 
                              onCancel 
                            }: EditTaskFormProps) => {

  const [editText, setEditText] = useState(initialText);
  const [editDesc, setEditDesc] = useState(initialDescription || "");
  const [editMileage, setEditMileage] = useState(initialMileage);
  const [editDate, setEditDate] = useState(initialDate);
  const dispatch = useAppDispatch();
  
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setEditText(initialText);
    setEditDesc(initialDescription || "");
    setEditMileage(initialMileage);
    setEditDate(initialDate);
  }, [initialText, initialDescription, initialMileage, initialDate]);

  useClickOutside(formRef, onCancel);
  useClickEscape(onCancel);

  const handleRepeat = () => {
    dispatch(setPrefillTaskData({ text: editText, description: editDesc }))
    onCancel();
  }

    return (
      <div className={cn(styles.item_wrapper, styles.editing_mode)} ref={formRef}>
        <div className={styles.edit_form}>
          <Input
            className={cn(isDone && styles.input_disabled)}
            value={editText}
            onChange={setEditText}
            placeholder="Название задачи"
            autoFocus 
            variant={isDone ? "disabled" : "classic"}   
            />
            <Input
            className={cn(isDone && styles.input_disabled)}
            type="number"
            value={String(editMileage)}
            onChange={(valueStr) => setEditMileage(parseInt(valueStr, 10) || 0)}
            placeholder="На каком пробеге?"   
            variant={isDone ? "disabled" : "classic"}   
          />
          <InputDate 
            className={cn(isDone && styles.input_disabled)}
            placeholder={isDone ? "Дата не выбрана" : "Запланированная дата"}
            selectedDate={editDate}
            onChangeDate={setEditDate}
            variant={isDone ? "disabled" : "classic"}            
            />
          <textarea 
              className={cn(styles.edit_textarea, isDone && styles.input_disabled)}
              value={editDesc}
              onChange={(e) => setEditDesc(e.target.value)}
              placeholder="Описание (необязательно)"
              rows={2}
              maxLength={300}
              disabled={isDone} 
          />
          <div className={styles.edit_btns}>
            {isDone ? 
            <>
              <Button 
                variant="save"
                onClick={() => {handleRepeat()}}
                ariaLabelledby="повторить задачу" 
                child={"Повторить"}
                type={"button"}/>
              
              <Button 
                variant="cancel"
                onClick={onCancel}
                ariaLabelledby="кнопка отмены" 
                child={"Отмена"} 
                type={"button"}/>
              </> 
              :
              <>
              <Button 
                variant="save"
                onClick={() => {onSave(editText, editDesc, editMileage, editDate)}}
                ariaLabelledby="сохранить" 
                child={"Сохранить"} 
                type={"button"}/>
              <Button 
                variant="cancel"
                onClick={onCancel}
                ariaLabelledby="кнопка отмены" 
                child={"Отмена"} 
                type={"button"}/>
              </> 
              }
          </div>
        </div>
      </div>
    );
  }