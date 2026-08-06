import { Logo } from "@/shared/ui";
import styles from './Header.module.scss';
import { BurgerMenu, NavBar } from "@/components";
import { useMediaQuery } from "@/storage/hooks/useMediaQuery";


export const Header = () => {
    const isDesktop = useMediaQuery('(min-width: 1024px)');
    return(
        <header className={styles.header}>
            <Logo/>
            {isDesktop ? <NavBar/> : <BurgerMenu/>}
        </header>
    )
}