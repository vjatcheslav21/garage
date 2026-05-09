import styles from '../Logo/Logo.module.scss';


export const Logo = () => {
    return(
        <div className="logo">
            <a href="#">
                <h1 className={styles.logo__title}>гараж</h1>
            </a>
        </div>
    )
}