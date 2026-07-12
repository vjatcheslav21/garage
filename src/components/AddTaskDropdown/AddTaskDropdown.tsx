// AddTaskDropdown.tsx
import { useState } from "react";
// import { cn } from "@/shared/lib/clsx";
// import styles from './AddTaskDropdown.module.scss';
import { Input} from "@/shared/ui";
import { Dropdown } from "@/components/Dropdown";

interface AddTaskDropdownProps {
  onAddTask: (text: string, targetMileage: number) => void;
}

export const AddTaskDropdown = ({ onAddTask }: AddTaskDropdownProps) => {
  const [taskText, setTaskText] = useState("");
  const [taskMileage, setTaskMileage] = useState("");
  const [error, setError] = useState<string | null>(null);


    const handleOpen = () => {
      setTaskText("");
      setTaskMileage("");
      setError(null);
    }

    const handleSave = (): boolean => {
      const text = taskText.trim();
      const mileage = parseInt(taskMileage, 10);

      if (text && !isNaN(mileage) && mileage > 0) {
        onAddTask(text, mileage);
        return true; 
      }
      
      if (text === "" || isNaN(mileage)) {
        setError("Заполните все поля");
        return false;
      }
        setError(null);
        return true;
  };

    return (
      <Dropdown 
        title="Добавить задачу" 
        ariaLabelledBy="Кнопка 'добавить задачу'"
        onSave={handleSave} 
        onOpen={handleOpen}>
          <Input
            value={taskText}
            onChange={setTaskText}
            placeholder="Что сделать? (замена масла)"/>
             {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}
          <Input
            value={taskMileage}
            onChange={setTaskMileage}
            type="number"
            placeholder="На каком пробеге? (160000)"/>
      </Dropdown>
    )
  }
