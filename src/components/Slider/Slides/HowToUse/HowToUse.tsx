import { Button } from "@/shared/ui";
import styles from './HowToUse.module.scss';

interface HowToUseProps {
    onClickFinal: () => void;
}

export const HowToUse = ({onClickFinal}: HowToUseProps) => {
    return (
        <div className={styles.content}>
            <h2>Удачи, сталкер!</h2>
            <Button 
                className={styles.content_btn}
                child={"Сохранить"} 
                ariaLabelledby={"Сохранить данные"} 
                type={"button"}
                onClick={onClickFinal}/>
        </div>
    )
}