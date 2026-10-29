import { parseMileage } from "@/shared/lib";
import { Button, ErrorMessage, Input } from "@/shared/ui";
import { useAppSelector } from "@/storage/hooks";
import { useState } from "react";
import { validateName, validateMileage } from "@/shared/lib/validators";
import styles from './AddCar.module.scss';

interface AddCarProps {
    onSubmit: (data: { name: string, mileage: number }) => void;
    btnText: string;
}

export const AddCar = ({onSubmit, btnText}: AddCarProps) => {
    const [carName, setCarName] = useState('');
    const [carMileage, setCarMileage] = useState('');
    const [error, setError] = useState<string | null>(null);
    const dimension = useAppSelector(state => state.user.selectDimension);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const nameResult = validateName(carName);
        if (nameResult.error) {
            setError(nameResult.error);
            return
        }

        let mileage;
        if (dimension === 'mileage') {
            const mileageResult = validateMileage(carMileage);
            if (mileageResult.error) {
                setError(mileageResult.error);
                return
            }
            mileage = mileageResult.value;
        }

        setError(null);
        onSubmit({ name: carName, mileage: parseMileage(carMileage)});
        setCarMileage('');
        setCarName('');
    }

    const handleNameChange = (value: string) => {
        if (value.length <= 20) {
            setCarName(value)
        }
    }

    const handleMileageChange = (value: string) => {
        const cleaned = value.replace(/\D/g, '').slice(0, 7);
        setCarMileage(cleaned);
    };

    return(
        <>
        <form className={styles.form} onSubmit={handleSubmit}>
            <label className={styles.form_label} htmlFor="carName">Название машины</label>
            <Input 
                value={carName} 
                id={"carName"}                       
                placeholder="Введите название авто" 
                onChange={handleNameChange}/>
            {dimension === "mileage" && (
            <>
                <label className={styles.form_label} htmlFor="carMileage">Пробег</label>
                <Input
                    type="text"
                    id="carMileage"
                    value={carMileage} 
                    placeholder="Введите актуальный пробег" 
                    onChange={handleMileageChange}/>
                </>
            )}
            {error && <ErrorMessage error={error}/>}
            <Button 
                child={btnText} 
                ariaLabelledby={"кнопка 'Сохранить данные автомобиля'"} 
                type={"submit"} 
                className={styles.form_btn}
                disabled={carName === '' || (dimension === 'mileage' && carMileage === '')}
                />
        </form>
        </>
    )
}