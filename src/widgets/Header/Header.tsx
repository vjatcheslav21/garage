import { Logo } from "@/shared/ui";
import styles from './Header.module.scss';
import { BurgerMenu, NavBar } from "@/components";
import { useMediaQuery } from "@/storage/hooks/useMediaQuery";
import { useAppSelector } from "@/storage/hooks/hooks";
import { useLocation } from "react-router-dom";

export const Header = () => {
    const isAuth = useAppSelector(state => state.user.isAuth);
    const cars = useAppSelector(state => state.cars.cars);
    const location = useLocation();

    const isOnIntroPage = location.pathname === '/main' && cars.length === 0;
    
    const isDesktop = useMediaQuery('(min-width: 1024px)');
    return(
        <header className={styles.header}>
            <Logo/>
                {isAuth && !isOnIntroPage &&
                    (isDesktop ? <NavBar/> : <BurgerMenu/>)
                }  
        </header>
    )
}