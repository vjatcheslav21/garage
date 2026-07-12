import styles from './NavBar.module.scss';

export const NavBar = () => {
    return (
        <nav className={styles.nav}>
            <ul className={styles.nav_list}>
                <li className={styles.nav_item}>
                    <a className={styles['nav_item-link']} href="#">главная</a>
                </li>
                <li className={styles.nav_item}>
                    <a className={styles['nav_item-link']} href="#">не главная</a>
                </li>
                <li className={styles.nav_item}>
                    <a className={styles['nav_item-link']} href="#">почти главная</a>
                </li>
            </ul>
        </nav>
    )
}