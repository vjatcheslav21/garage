import { parseMileage } from "@/shared/lib";
import { Button, Input } from "@/shared/ui";
import { useAppSelector } from "@/storage/hooks";
import { useState } from "react";
import styles from './AddCar.module.scss';

interface AddCarProps {
    onSubmit: (data: { name: string, mileage: number }) => void;
    btnText: string;
}

export const AddCar = ({onSubmit, btnText}: AddCarProps) => {
    const [carName, setCarName] = useState('');
    const [carMileage, setCarMileage] = useState('');
    const dimension = useAppSelector(state => state.user.selectDimension);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ name: carName, mileage: parseMileage(carMileage)});
        setCarMileage('');
        setCarName('');
    }

    return(
        <>
        <form className={styles.form} onSubmit={handleSubmit}>
            <label className={styles.form_label} htmlFor="carName">Название машины</label>
            <Input 
                value={carName} 
                id={"carName"}                       
                placeholder="Введите название авто" 
                onChange={setCarName}/>
            {dimension === "mileage" && 
            <>
                <label className={styles.form_label} htmlFor="carMileage">Пробег</label>
                <Input
                    type="number"
                    id="carMileage"
                    value={String(carMileage)} 
                    placeholder="Введите актуальный пробег" 
                    onChange={setCarMileage}/>
                </>
            }
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