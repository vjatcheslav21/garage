import { useState } from "react"
import styles from './BurgerMenu.module.scss';
import { cn } from "@/shared/lib/clsx";

export const BurgerMenu = () => {

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    const closeMenu = () => {
        setIsOpen(false)
    }

     return (
        <div className={styles['burger_container']}>

            <button 
                className={cn(
                    styles.burger_btn, 
                    isOpen && styles.open
                )} 
                onClick={toggleMenu}
                aria-label="Открыть меню"
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
                <li><a href="#home" onClick={closeMenu}>Главная</a></li>
                <li><a href="#about" onClick={closeMenu}></a>Авто</li>
                <li><a href="#contact" onClick={closeMenu}>Контакты</a></li>
                <li><a href="#services" onClick={closeMenu}>Тема</a></li>
                </ul>
            </nav>
        </div>
  );
}