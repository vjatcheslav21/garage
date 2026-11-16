import { NavList } from '@/shared/ui';
import styles from './NavBar.module.scss';

export const NavBar = () => {
    return (
        <nav className={styles.nav}>
            <NavList 
                className={styles.nav_list}
                linkClassName={styles['nav_item-link']}
                activeClassName={styles['nav_item-link-active']}
            />
        </nav>
    )
}