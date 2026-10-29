import { Button } from "@/shared/ui";
import styles from './HowToUse.module.scss';

interface HowToUseProps {
    onClickFinal: () => void;
}

export const HowToUse = ({onClickFinal}: HowToUseProps) => {
    return (
        <div className={styles.content}>
            <h2>Всё под контролем 🚗</h2>
            <ul className={styles.list}>
                <li className={styles.list_item}>Добавляй задачи на главной странице — указывай дату или пробег следующего ТО.</li>
                <li className={styles.list_item}>Обновляй пробег на странице «Авто» — приложение пересчитает оставшееся время.</li>
                <li className={styles.list_item}>Отмечай выполнение — сохраняй историю обслуживания в один клик.</li>
            </ul>
            <h4>Готово! Жми «Поехали» и держи свой гараж в порядке.</h4>
            <Button 
                className={styles.content_btn}
                child={"Поехали"} 
                ariaLabelledby={"Сохранить данные"} 
                type={"button"}
                onClick={onClickFinal}/>
        </div>
    )
}