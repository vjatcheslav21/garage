import { useRef, useState } from "react"
import styles from './BurgerMenu.module.scss';
import { cn } from "@/shared/lib/clsx";
import { Link} from "react-router-dom";
import { useClickEscape, useClickOutside } from "@/storage/hooks";

export const BurgerMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    useClickOutside(menuRef, () => setIsOpen(false));

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    const closeMenu = () => {
        setIsOpen(false)
    }
    useClickEscape(closeMenu);

     return (
        <div className={styles['burger_container']} ref={menuRef}>
            <button 
                className={cn(
                    styles.burger_btn, 
                    isOpen && styles.open
                )} 
                onClick={toggleMenu}
                aria-label="Открыть меню навигации"
            >
                <span></span>
                <span></span>
                <span></span>
            </button>
            <nav 
                className={cn(
                    styles.menu_nav, 
                    isOpen && styles.open
                )}>
                <ul className={styles['menu_list']}>
                    <li className={styles.nav_item} onClick={closeMenu}>
                        <Link to="/main" className={styles['menu_list-link']}>Главная</Link>
                    </li>
                    <li className={styles.nav_item} onClick={closeMenu}>
                        <Link to="/profile" className={styles['menu_list-link']}>Профиль</Link>
                    </li>
                    <li className={styles.nav_item} onClick={closeMenu}>
                        <Link to="/car" className={styles['menu_list-link']}>Авто</Link>
                    </li>
                </ul>
            </nav>
        </div>
  );
}