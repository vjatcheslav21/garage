import { useState } from "react"
import styles from './BurgerMenu.module.scss';
import { cn } from "@/shared/lib/clsx";
import { useAppDispatch, useAppSelector } from "@/storage/hooks/hooks";
import { userLogout } from "@/storage/slices/userSlice";
import { useNavigate } from "react-router-dom";

export const BurgerMenu = () => {
    const user = useAppSelector(state => state.user.user);
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    const closeMenu = () => {
        setIsOpen(false)
    }

    const logoutClick = () => {
        dispatch(userLogout());
        closeMenu()
        navigate('/login')
    }

     return (
        <div className={styles['burger_container']}>

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
                    <li className={styles['menu_list-item']}>
                        <a className={styles['menu_list-link']} 
                            href="#home" 
                            onClick={closeMenu}>
                                Главная
                        </a>
                        </li>
                    <li className={styles['menu_list-item']}>
                        <a className={styles['menu_list-link']} 
                            href="#about"
                            onClick={closeMenu}>
                            Авто
                         </a>
                    </li>
                    <li className={styles['menu_list-item']}>
                        <a className={styles['menu_list-link']} 
                            href="#contact" 
                            onClick={closeMenu}>
                            Контакты
                        </a>
                    </li>
                    <li className={styles['menu_list-item']}>
                        <a className={styles['menu_list-link']} 
                            href="#services" 
                            onClick={closeMenu}>
                            Тема
                        </a>
                    </li>
                    {user && 
                    <li className={styles['menu_list-item']}>
                        <a className={styles['menu_list-link']} 
                            href="#services" 
                            onClick={logoutClick}>
                            Выйти
                        </a>
                    </li>
                    }
                    
                </ul>
            </nav>
        </div>
  );
}