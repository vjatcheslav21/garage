import { Link } from 'react-router-dom';
import styles from './NavBar.module.scss';
import { NotificationMenu } from '@/shared/ui';

interface NavBarProp {
    showDot: boolean;    
    onOpen: () => void;
}

export const NavBar = ({showDot, onOpen}: NavBarProp) => {
    return (
        <nav className={styles.nav}>
            <ul className={styles.nav_list}>
                <li className={styles.nav_item}>
                    <Link to="/main" className={styles['nav_item-link']}>Главная</Link>
                </li>
                <li className={styles.nav_item}>
                    <Link to="/profile" className={styles['nav_item-link']}>Профиль</Link>
                </li>
                <li className={styles.nav_item}>
                    <Link to="#"><NotificationMenu showDot={showDot} onOpen={onOpen}/></Link>
                </li>
            </ul>
        </nav>
    )
}