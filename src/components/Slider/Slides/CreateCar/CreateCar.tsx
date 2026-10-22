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
            <AddCar 
                btnText="Дальше"
                onSubmit={(data) => onCreate(data)}
            />
            <ToggleDimension/>
        </div>
        </>
    )
}
