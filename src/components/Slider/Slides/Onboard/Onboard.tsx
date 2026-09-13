import { Button } from "@/shared/ui";
import styles from './Onboard.module.scss';

interface OnboardProp {
    name?: string;
    onClickNext: () => void;
}

export const Onboard = ({name, onClickNext}: OnboardProp) => {
    return (
        <div className={styles.onboard}>
            <h2 className={styles.onboard_title}>Привет, {name}</h2>
            <p className={styles.onboard_p}>
                Добро пожаловать в Гараж. <br/> 
                Добавьте информацию по автомобилю, <br/> 
                чтобы использовать приложение
            </p>
            <Button 
                className={styles.onboard_btn}
                child={"Дальше"} 
                ariaLabelledby={"Открыть следующий слайд"} 
                type={"button"} 
                onClick={onClickNext}/>
        </div>
    )
}