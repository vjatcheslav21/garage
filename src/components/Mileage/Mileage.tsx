import styles from './Mileage.module.scss';
import { Dropdown } from "@/components";
import { Input } from '@/shared/ui';
import { useState } from 'react';

interface MileageProps {
    mileage: number;
    onUpdate: (value: number) => void;
}

export const Mileage = ({mileage, onUpdate}: MileageProps) => {

    const [inputValue, setInputValue] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleOpen = () => {
        setInputValue(String(mileage));
        setError(null);
    }

    const handleSave = ():boolean => {
        const numValue = parseInt(inputValue, 10);

        if(!isNaN(numValue) && numValue <= 0) {
            setError("Введите корректный пробег");
            return false;
        }

        if (numValue < mileage) {
            setError(`Пробег не может быть меньше текущего (${mileage.toLocaleString('ru-RU')} км)`);
            return false;
        }

        setError(null);
        onUpdate(numValue);
        return true
    }

    return(
        <>
        <div className={styles.mileage}>
        <h2 className={styles.mileage_title}>Ваш пробег: {mileage.toLocaleString('ru-RU')} км</h2>
            <Dropdown 
                    title="Изменить пробег"
                    ariaLabelledBy="Кнопка 'изменить пробег'"
                    onSave={handleSave}
                    onOpen={handleOpen} 
                    >
                    <Input
                        value={inputValue}
                        onChange={setInputValue}
                        type="number"
                        placeholder="Укажите пробег"
                        />
                {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}
            </Dropdown>
        </div>
            <div className={styles.ticks}></div>
            <section className={styles.spacer}></section>
        </>
            
    )
}