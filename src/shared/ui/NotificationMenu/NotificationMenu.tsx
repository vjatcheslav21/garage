import { useEffect, useRef, useState } from 'react';
import styles from './NotificationMenu.module.scss';
import { cn } from '@/shared/lib/clsx';

interface NotificationProps {
    showDot: boolean;
    onOpen: () => void;
}

export const NotificationMenu = ({showDot, onOpen}: NotificationProps) => {

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggle = () => {
        const willOpen = !isOpen;
        setIsOpen(willOpen)
        if (willOpen && onOpen) {
            onOpen();
        }
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className={styles.notification} ref={dropdownRef}>
            <div className={styles.notification_trigger} 
                onClick={toggle}>
                    Уведомления
                    {showDot 
                    ?
                    <span className={styles.notification_red_dot}/> 
                    : 
                    null }
            </div>
            <div className={cn(styles['notification_dropdown-menu'], isOpen && styles.open)}>
                <ul className={styles['notification_dropdown-list']}>
                    <li className={styles['notification_dropdown-item']}>Обновите пробег</li>
                </ul>
             </div>
        </div>
    )
}