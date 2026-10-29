import { useEffect, useState } from "react";
import styles from './AddTaskDropdown.module.scss';
import { CalendarIcon, DescrIcon, ErrorMessage, Input, MileageIcon} from "@/shared/ui";
import { Dropdown } from "@/components/Dropdown";
import 'react-datepicker/dist/react-datepicker.css';
import { format } from "date-fns";
import { useAppDispatch, useAppSelector } from "@/storage/hooks/hooks";
import { clearPrefillTaskData } from "@/storage/slices/uiSlice";
import { InputDate } from "@/shared/ui/Input/InputDate";
import { cn, validateMileage, validateName } from "@/shared/lib";

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
      const textResult = validateName(taskText);
      const mileageResult = validateMileage(taskMileage);
      const description = taskDescr.trim();
      const formattedDate = startTaskDate ? format(startTaskDate, 'yyyy-MM-dd') : ''; 
      
      if (textResult.error) {
          setError(textResult.error);
          return false;
      }

      let mileage = 0;
      if (dimension === 'mileage') {
        if (mileageResult.error) {
            setError(mileageResult.error);
            return false;
        }
        mileage = mileageResult.value;

      } else {
        if (!formattedDate) {
          setError("Выберите дату");
          return false;
        }
      }
      setError(null);
      onAddTask(
        textResult.value,
        mileage,
        description,
        formattedDate,
        carSelectedId || ''
      );
      clearInput();
      return true;
    }
    const handleNameChange = (value: string) => {
        if (value.length <= 25) {
            setTaskText(value)
        }
    }

    const handleMileageChange = (value: string) => {
        const cleaned = value.replace(/\D/g, '').slice(0, 7);
        setTaskMileage(cleaned);
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
              onChange={handleNameChange}
              placeholder="Что сделать?"/>
            <Input
              value={taskMileage}
              onChange={handleMileageChange}
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
            </div>
            </>
           ) : (
            <>
            <Input
              value={taskText}
              onChange={setTaskText}
              placeholder="Что сделать?"/>
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
              {error && <ErrorMessage error={error}/>}
      </Dropdown>
    )
  }
