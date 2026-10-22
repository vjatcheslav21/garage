import { useEffect, useState } from "react";
import styles from './AddTaskDropdown.module.scss';
import { CalendarIcon, DescrIcon, Input, MileageIcon} from "@/shared/ui";
import { Dropdown } from "@/components/Dropdown";
import 'react-datepicker/dist/react-datepicker.css';
import { format } from "date-fns";
import { useAppDispatch, useAppSelector } from "@/storage/hooks/hooks";
import { clearPrefillTaskData } from "@/storage/slices/uiSlice";
import { InputDate } from "@/shared/ui/Input/InputDate";
import { cn, parseMileage } from "@/shared/lib";

interface AddTaskDropdownProps {
  onAddTask: (text: string, 
              targetMileage: number, 
              description: string, 
              targetDate: string, 
              carId: string) => void;
}

export const AddTaskDropdown = ({ onAddTask }: AddTaskDropdownProps) => {
  const [taskText, setTaskText] = useState("");
  const [taskMileage, setTaskMileage] = useState("");
  const [taskDescr, setTaskDescr] = useState("");
  const [startTaskDate, setStartTaskDate] = useState<Date|null>(null);
  const [isDescr, setIsDescr] = useState(false);
  const [isDate, setIsDate] = useState(false);
  const [isMileage, setIsMileage] = useState(false);
  const [forceOpen, setForceOpen] = useState(false);
  const dispatch = useAppDispatch();
  const carSelectedId = useAppSelector(state => state.cars.carSelected?.id);
  const dimension = useAppSelector(state => state.user.selectDimension);
  const prefillTaskData = useAppSelector(state => state.ui.prefillTaskData);
  //В будущем валидация на форму
  const [error, setError] = useState<string|null>(null);

  useEffect(() => {
      if (prefillTaskData) {
        setTaskText(prefillTaskData.text);
        setTaskDescr(prefillTaskData.description);
        dispatch(clearPrefillTaskData());
        setForceOpen(true);
      }
  },[prefillTaskData])

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
    const mileage = parseMileage(taskMileage);
    const description = taskDescr.trim();
    const formattedDate = startTaskDate ? format(startTaskDate, 'yyyy-MM-dd') : ''; 

    if (dimension === 'mileage') {
      if (text && !isNaN(mileage) && mileage > 0) {
        onAddTask(text, mileage, description, formattedDate, carSelectedId || '');
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
        onAddTask(text, mileage, description, formattedDate, carSelectedId || '');
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
        controlledIsOpen={forceOpen}
        onOpen={() => setForceOpen(true)}
        onCloseDropdown={() => setForceOpen(false)}
        >
          {dimension === 'mileage' ? (
           <>
           <Input
              value={taskText}
              onChange={setTaskText}
              placeholder="Что сделать?"/>
              {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}
            <Input
              value={taskMileage}
              onChange={setTaskMileage}
              type="number"
              placeholder="На каком пробеге?"/>
            <Input 
              className={cn(styles.collapsible, styles.input_descr, isDescr && styles.open)}
              value={taskDescr}
              onChange={setTaskDescr}
              placeholder="Описание(необязательно)"/>
            <div className={cn(styles.collapsible, isDate && styles.open)}>
              <InputDate 
                placeholder="Дата(необязательно)"
                selectedDate={startTaskDate}
                onChangeDate={setStartTaskDate} 
                variant={"classic"}              
                />
              {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}
            </div>
            </>
           ) : (
            <>
            <Input
              value={taskText}
              onChange={setTaskText}
              placeholder="Что сделать?"/>
              {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}
            <InputDate 
                placeholder="Дата"
                selectedDate={startTaskDate}
                onChangeDate={setStartTaskDate} 
                variant={"classic"}              
                />
            <Input
              className={cn(styles.collapsible, isMileage && styles.open)}
              value={taskMileage}
              onChange={setTaskMileage}
              type="number"
              placeholder="На каком пробеге?"/>
            <Input 
              className={cn(styles.collapsible, styles.input_descr, isDescr && styles.open)}
              value={taskDescr}
              onChange={setTaskDescr}
              placeholder="Описание(необязательно)"/>
             </>
            )}
      </Dropdown>
    )
  }
