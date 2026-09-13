import { cn } from "@/shared/lib/clsx";
import { useEffect, useRef, useState, type ReactNode } from "react";
import styles from './Dropdown.module.scss';
import { Button, Plus } from "@/shared/ui";

interface DropdownProps {
    title: string;
    children: ReactNode;
    ariaLabelledBy: string;
    description?: string;
    onSave: () => boolean; 
    onOpen?: () => void;    
}

export const Dropdown = ({title, children, ariaLabelledBy, onSave, onOpen, description}: DropdownProps) => {

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggle = () => {
        const willOpen = !isOpen;
        setIsOpen(willOpen)
        if (willOpen && onOpen) {
            onOpen();
        }
    }

    const handleSave = () => {
        const isSuccessful = onSave();
        if (isSuccessful) {
            setIsOpen(false);
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
        <div className={cn(styles['dropdown_container'], isOpen && styles.active)} ref={dropdownRef}>
            <div className={styles['trigger_area']} onClick={toggle}>
                <span className={styles['title']}>{title}</span>
                <Plus
                    isOpen={isOpen} 
                    ariaLabelledBy={ariaLabelledBy} 
                />
            </div>
            <div className={cn(styles['dropdown_menu'], isOpen && styles.open)}>
                <p className={styles['dropdown_menu-descr']}>{description}</p>
                {children} 
                <Button 
                    ariaLabelledby={'сохранить'} 
                    className={styles['btn_save']} 
                    child={'cохранить'} 
                    type={'button'}
                    onClick={handleSave}
                />
             </div>
        </div>
    )
}