import styles from './Mileage.module.scss';
import { Dropdown } from "@/components";
import { validateMileage } from '@/shared/lib';
import { ErrorMessage, Input } from '@/shared/ui';
import { useState } from 'react';

interface MileageProps {
    mileage: number;
    onUpdate: (value: number) => void;
}

export const Mileage = ({mileage, onUpdate}: MileageProps) => {

    const [inputValue, setInputValue] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleOpen = () => {
        setInputValue("");
        setError(null);
    }

    const handleSave = ():boolean => {
        const result = validateMileage(inputValue, mileage);
        if (result.error) {
            setError(result.error);
            return false;
        }
        mileage = result.value;

        setError(null);
        onUpdate(result.value);
        return true;
    }

    const handleMileageChange = (value: string) => {
        const cleaned = value.replace(/\D/g, '').slice(0, 7);
        setInputValue(cleaned);
    };

    return(
        <>
        <div className={styles.mileage}>
        {mileage === 0 ? 
            <h2 className={styles.mileage_title}>Пробег не указан</h2> 
                :
            <h2 className={styles.mileage_title}>Пробег: {mileage.toLocaleString('ru-RU')} км</h2>
        }
            <Dropdown 
                    title="Изменить пробег"
                    ariaLabelledBy="Кнопка 'изменить пробег'"
                    onSave={handleSave}
                    onOpen={handleOpen} 
                    >
                    <Input
                        value={inputValue}
                        onChange={handleMileageChange}
                        type="text"
                        placeholder={`Текущий: ${mileage.toLocaleString('ru-RU')} км`}
                        />
                {error && <ErrorMessage error={error}/>}
            </Dropdown>
        </div>
        </>    
    )
}