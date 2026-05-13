import { Logo } from "@/shared/ui";
import styles from './Header.module.scss';
import { BurgerMenu } from "@/components";


export const Header = () => {
    return(
        <header className={styles.header}>
            <Logo/>
            <BurgerMenu/>
        </header>
    )
}