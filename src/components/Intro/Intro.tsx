import styles from './Intro.module.scss';

interface IntroProps {
    name?: string;
}

export const Intro = ({name}: IntroProps) => {
    return(
        <h3 className={styles.intro_title}>Привет!<br/>{name} здесь будут твои записи</h3>
    )
}