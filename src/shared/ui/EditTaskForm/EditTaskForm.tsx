import { useEffect, useRef, useState } from "react";
import styles from './EditTaskForm.module.scss';
import { cn } from "@/shared/lib/clsx";
import { Button, Input } from "@/shared/ui";

interface EditTaskFormProps {
    initialText: string;
    initialDescription?: string;
    initialMileage: number;
    onSave: (text: string, desc: string, mileage: number) => void;
    onCancel: () => void; 
}

export const EditTaskForm = ({ initialText, initialDescription, initialMileage, onSave, onCancel }: EditTaskFormProps) => {
  const [editText, setEditText] = useState(initialText);
  const [editDesc, setEditDesc] = useState(initialDescription || "");
  const [editMileage, setEditMileage] = useState(initialMileage);
  
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setEditText(initialText);
    setEditDesc(initialDescription || "");
    setEditMileage(initialMileage);
  }, [initialText, initialDescription, initialMileage]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        onSave(editText, editDesc, editMileage); 
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onSave, editText, editDesc, editMileage]);

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
          <textarea 
            className={styles.edit_textarea}
            value={editDesc}
            onChange={(e) => setEditDesc(e.target.value)}
            placeholder="Описание (необязательно)"
            rows={2}
          />
          <div className={styles.edit_actions}>
            <Button 
              variant="save"
              onClick={() => onSave(editText, editDesc, editMileage)}
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