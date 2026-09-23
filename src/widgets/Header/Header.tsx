import { Logo } from "@/shared/ui";
import styles from './Header.module.scss';
import { BurgerMenu, NavBar } from "@/components";
import { useMediaQuery } from "@/storage/hooks/useMediaQuery";
import { useAppSelector } from "@/storage/hooks/hooks";
import { useEffect, useState } from "react";


export const Header = () => {
    const isAuth = useAppSelector(state => state.user.isAuth);
    const isDesktop = useMediaQuery('(min-width: 1024px)');
    const isCheckedMileage = useAppSelector(state => state.cars.isCheckedMileage);
    const [showDot, setShowDot] = useState(false);

    useEffect(() => {
        if (isCheckedMileage) {
            setShowDot(true);
        }
    }, [isCheckedMileage]);
    
    return(
        <header className={styles.header}>
            <Logo/>
                {isAuth &&
                    (isDesktop ? 
                        <NavBar 
                            showDot={showDot} 
                            onOpen={() => setShowDot(false)}/> 
                                : 
                        <BurgerMenu/> )
                }  
        </header>
    )
}