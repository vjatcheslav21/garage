import { Link } from 'react-router-dom';
import styles from '../Logo/Logo.module.scss';


export const Logo = () => {
    return(
        <div className="logo">
            <Link to="/main">
                <h1 className={styles.logo__title}>гараж</h1>
            </Link>
        </div>
    )
}