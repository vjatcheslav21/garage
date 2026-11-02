import { NavLink } from 'react-router-dom';
import styles from './NavList.module.scss';
import { cn } from '@/shared/lib/clsx';

interface NavListProps {
    onLinkClick?: () => void;
    className?: string;
    linkClassName?: string;
    activeClassName?: string;
}

const navItems = [
    { to: '/main', label: 'Главная' },
    { to: '/car', label: 'Авто' },
    { to: '/profile', label: 'Профиль' },
];

export const NavList = ({ 
    onLinkClick, 
    className, 
    linkClassName, 
    activeClassName 
}: NavListProps) => {
    return (
        <ul className={cn(styles.list, className)}>
            {navItems.map((item) => (
                <li key={item.to} className={styles.item}>
                    <NavLink
                        to={item.to}
                        onClick={onLinkClick}
                        className={({ isActive }) =>
                            isActive
                                ? cn(styles.link, linkClassName, activeClassName)
                                : cn(styles.link, linkClassName)
                        }
                    >
                        {item.label}
                    </NavLink>
                </li>
            ))}
        </ul>
    );
}