import { useRef, useState } from "react"
import styles from './BurgerMenu.module.scss';
import { cn } from "@/shared/lib/clsx";
import { useClickEscape, useClickOutside } from "@/storage/hooks";
import { NavList } from "@/shared/ui";

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
                <NavList 
                    onLinkClick={closeMenu}
                    className={styles.menu_list}
                    linkClassName={styles['menu_list-link']}
                />
            </nav>
        </div>
  );
}