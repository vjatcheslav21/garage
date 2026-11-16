import DatePicker from "react-datepicker";
import styles from './Input.module.scss';
import { cn } from "@/shared/lib/clsx";
import type { VariantInput } from "@/shared/ui/Input/Input";

interface InputDateProps {
    className?: string;
    onChangeDate: (date: Date | null) => void;
    selectedDate: Date | null;
    variant: VariantInput;
    placeholder?: string;
}

export const InputDate = ({className, placeholder, onChangeDate, selectedDate, variant}: InputDateProps) => {
    return(
        <>
        <DatePicker
            className={cn(styles.input, styles.input_date, 
                            className, variant === 'inline' && styles.inline, 
                            variant === 'disabled' && styles.disabled)
                        }
            placeholderText={placeholder}
            selected={selectedDate}
            onChange={onChangeDate}
            dateFormat="dd.MM.yyyy"
            disabled={variant === 'disabled'}
            />
        </>
    )
}