import { ToggleDimension } from "@/shared/ui";
import { AddCar } from "@/components/AddCar";
import styles from './CreateCar.module.scss';

interface CreateCarProps {
    onCreate: (data: { name: string, mileage: number }) => void;
}

export const CreateCar = ({onCreate}: CreateCarProps) => {

    return(
        <>
        <div className={styles.create__car}>
            <h4 className="create__car_title">Добавте авто</h4>
            <label className={styles.form_label}>Настроить критерий ТО</label>
            <ToggleDimension/>
            <AddCar 
                btnText="Дальше"
                onSubmit={(data) => onCreate(data)}
            />
        </div>
        </>
    )
}
