import { Button } from "@/shared/ui";
import styles from './Onboard.module.scss';

interface OnboardProp {
    name?: string;
    onClickNext: () => void;
}

export const Onboard = ({name, onClickNext}: OnboardProp) => {
    return (
        <div className={styles.onboard}>
            <h2>Привет, {name} 👋</h2>
            <h3>Гараж поможет не пропустить очередное ТО.</h3>
            <ul>
                <li className={styles.list_item}>Добавь авто — введи название и пробег</li>
                <li className={styles.list_item}>Создавай задачи — масло, тормоза, фильтры</li>
                <li className={styles.list_item}>Контролируй сроки — по пробегу или по дате</li>
            </ul>
            <h4>Жми «Дальше» 🚗</h4>
            <Button 
                className={styles.onboard_btn}
                child={"Дальше"} 
                ariaLabelledby={"Открыть следующий слайд"} 
                type={"button"} 
                onClick={onClickNext}/>
        </div>
    )
}