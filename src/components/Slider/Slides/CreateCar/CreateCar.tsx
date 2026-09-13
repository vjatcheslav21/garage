import { Button, Input } from "@/shared/ui";
import styles from './CreateCar.module.scss';

interface CreateCarProps {
    carName: string;
    onNameChange: (value: string) => void;
    carMileage: number;
    onMileageChange: (value: string) => void;
    onClickNext: () => void;
}

export const CreateCar = ({carName, onNameChange, carMileage, onMileageChange,  onClickNext}: CreateCarProps) => {

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onClickNext();
    }

    return (
        <>
            <form className={styles.form} onSubmit={handleSubmit}>
                <Input 
                    value={carName} 
                    placeholder="Введите название машины" 
                    onChange={onNameChange}/>
                <Input
                    type="number"
                    value={String(carMileage)} 
                    placeholder="Введите актуальный пробег" 
                    onChange={onMileageChange}/>
                <Button 
                    child={"Дальше"} 
                    ariaLabelledby={"кнопка 'Сохранить данные автомобиля'"} 
                    type={"submit"} 
                    className={styles.form_btn}
                    disabled={carName === '' || carMileage === 0}
                    />
            </form>
        </>
    )
}