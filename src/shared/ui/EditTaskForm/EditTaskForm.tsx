import { useEffect, useRef, useState } from "react";
import styles from './EditTaskForm.module.scss';
import { cn } from "@/shared/lib/clsx";
import { Button, Input } from "@/shared/ui";
import { useClickEscape, useClickOutside } from "@/storage/hooks";
import DatePicker from "react-datepicker";

interface EditTaskFormProps {
    initialText: string;
    initialDescription?: string;
    initialMileage: number;
    initialDate: Date | null;
    onSave: (text: string, desc: string, mileage: number, date: Date|null) => void;
    onCancel: () => void; 
}

export const EditTaskForm = ({ initialText, initialDescription, initialMileage, initialDate, onSave, onCancel }: EditTaskFormProps) => {
  const [editText, setEditText] = useState(initialText);
  const [editDesc, setEditDesc] = useState(initialDescription || "");
  const [editMileage, setEditMileage] = useState(initialMileage);
  const [editDate, setEditDate] = useState(initialDate);
  
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setEditText(initialText);
    setEditDesc(initialDescription || "");
    setEditMileage(initialMileage);
    setEditDate(initialDate);
  }, [initialText, initialDescription, initialMileage, initialDate]);

  useClickOutside(formRef, onCancel);
  useClickEscape(onCancel);

    return (
      <div className={cn(styles.item_wrapper, styles.editing_mode)} ref={formRef}>
        <div className={styles.edit_form}>
          <Input
             className={styles.edit_input}
             value={editText}
             onChange={setEditText}
             placeholder="Название задачи"
             autoFocus   
            />
            <Input
             className={styles.edit_input}
             type="number"
             value={String(editMileage)}
             onChange={(valueStr) => setEditMileage(parseInt(valueStr, 10) || 0)}
             placeholder="На каком пробеге?"   
          />
          <DatePicker
              className={cn(styles.input_date, styles.date_mt6px)}
              placeholderText="Запланированная дата"
              selected={editDate}
              onChange={(date: Date | null) => setEditDate(date as Date)}
              dateFormat="dd.MM.yyyy"
            />
          <textarea 
            className={styles.edit_textarea}
            value={editDesc}
            onChange={(e) => setEditDesc(e.target.value)}
            placeholder="Описание (необязательно)"
            rows={2}
          />
          <div className={styles.edit_btns}>
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
          </div>
        </div>
      </div>
    );
  }