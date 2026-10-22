import { NavLink } from 'react-router-dom';
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
                    <NavLink to="/main" className={styles['nav_item-link']}>Главная</NavLink>
                </li>
                <li className={styles.nav_item}>
                    <NavLink to="/profile" className={styles['nav_item-link']}>Профиль</NavLink>
                </li>
                <li className={styles.nav_item}>
                    <NavLink to="/car" className={styles['nav_item-link']}>Авто</NavLink>
                </li>
                <li className={styles.nav_item}>
                    <NavLink to="#">
                        <NotificationMenu showDot={showDot} onOpen={onOpen}/>
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}