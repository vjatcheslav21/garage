import { useState } from "react";
import styles from './AddTaskDropdown.module.scss';
import { CalendarIcon, DescrIcon, Input, MileageIcon} from "@/shared/ui";
import { Dropdown } from "@/components/Dropdown";
import { cn } from "@/shared/lib/clsx";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { format } from "date-fns";
import { useAppSelector } from "@/storage/hooks/hooks";

interface AddTaskDropdownProps {
  onAddTask: (text: string, targetMileage: number, description: string, targetDate: string) => void;
}

export const AddTaskDropdown = ({ onAddTask }: AddTaskDropdownProps) => {
  const [taskText, setTaskText] = useState("");
  const [taskMileage, setTaskMileage] = useState("");
  const [taskDescr, setTaskDescr] = useState("");
  const [startTaskDate, setStartTaskDate] = useState<Date|null>(null);
  const [isDescr, setIsDescr] = useState(false);
  const [isDate, setIsDate] = useState(false);
  const [isMileage, setIsMileage] = useState(false);
  const dimension = useAppSelector(state => state.user.selectDimension);
  //В будущем валидация на форму
  const [error, setError] = useState<string|null>(null);

  const clearInput = () => {
    setTaskText("");
    setTaskMileage("");
    setTaskDescr("");
    setStartTaskDate(null)
    setIsDescr(false);
    setIsDate(false);
    setError(null);
  }

  const handleSave = (): boolean => {
    const text = taskText.trim();
    const mileage = parseInt(taskMileage, 10);
    const description = taskDescr.trim();
    const formattedDate = startTaskDate ? format(startTaskDate, 'yyyy-MM-dd') : ''; 

    if (dimension === 'mileage') {
      if (text && !isNaN(mileage) && mileage > 0) {
        onAddTask(text, mileage, description, formattedDate);
        clearInput();
        return true; 
      }
      if (text === "" || isNaN(mileage)) {
        setError("Заполните все поля");
        return false;
      }
    } else {
      if (text && formattedDate) {
        // const onSaveMileage = isNaN(mileage) && mileage > 0 ? mileage : 0;
        // onAddTask(text, onSaveMileage, description, formattedDate);
        onAddTask(text, mileage, description, formattedDate);
        clearInput();
        return true;
      }
      if (text === "" || !formattedDate) {
        setError("Заполните все поля");
        return false;
      }
    }
      return false;
  };

  const addCollapsibleInput = (setState: (arg0: boolean) => void) => {
    setState(true);
  }

    return (
      <Dropdown 
        title="Добавить задачу" 
        ariaLabelledBy="Кнопка 'добавить задачу'"
        descriptionIcon={<DescrIcon onClick={() => addCollapsibleInput(setIsDescr)}/>}
        dateOrMileageIcon={dimension === 'date' ? 
                          <MileageIcon onClick={() => addCollapsibleInput(setIsMileage)}/>
                          : 
                          <CalendarIcon onClick={() => addCollapsibleInput(setIsDate)}/>
                        }
        onSave={handleSave}
        >
          {dimension === 'mileage' ? (
           <>
           <Input
              value={taskText}
              onChange={setTaskText}
              placeholder="Что сделать? (замена масла)"/>
              {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}
            <Input
              value={taskMileage}
              onChange={setTaskMileage}
              type="number"
              placeholder="На каком пробеге?(160000)"/>
            <Input 
              className={cn(styles.collapsible, styles.input_descr, isDescr && styles.open)}
              value={taskDescr}
              onChange={setTaskDescr}
              placeholder="Описание (необязательно)"/>
            <div className={cn(styles.collapsible, isDate && styles.open)}>
              <DatePicker
                className={styles.input_date}
                placeholderText="Дата (необязательно)"
                selected={startTaskDate}
                onChange={(date: Date | null) => setStartTaskDate(date as Date)}
                dateFormat="dd.MM.yyyy"
              />
              {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}
            </div>
            </>
           ) : (
            <>
            <Input
              value={taskText}
              onChange={setTaskText}
              placeholder="Что сделать? (замена масла)"/>
              {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}
            <DatePicker
              className={cn(styles.input_date, styles.date_mt6px)}
              placeholderText="Запланированная дата"
              selected={startTaskDate}
              onChange={(date: Date | null) => setStartTaskDate(date as Date)}
              dateFormat="dd.MM.yyyy"
            />
            <Input
              className={cn(styles.collapsible, isMileage && styles.open)}
              value={taskMileage}
              onChange={setTaskMileage}
              type="number"
              placeholder="На каком пробеге?(160000)"/>
            <Input 
              className={cn(styles.collapsible, styles.input_descr, isDescr && styles.open)}
              value={taskDescr}
              onChange={setTaskDescr}
              placeholder="Описание (необязательно)"/>
             </>
            )}
      </Dropdown>
    )
  }
