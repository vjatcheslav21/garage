import { cn } from "@/shared/lib/clsx";
import { useRef, useState, type ReactNode } from "react";
import styles from './Dropdown.module.scss';
import { Button, Plus } from "@/shared/ui";
import { useClickOutside } from "@/storage/hooks";

interface DropdownProps {
    title: string;
    children: ReactNode;
    ariaLabelledBy: string;
    description?: string;
    descriptionIcon?: ReactNode;
    dateOrMileageIcon?: ReactNode;
    onSave: () => boolean; 
    onOpen?: () => void;   
}

export const Dropdown = ({
                            title, 
                            children, 
                            ariaLabelledBy,
                            description, 
                            descriptionIcon, 
                            dateOrMileageIcon,
                            onSave, 
                            onOpen
                        }: DropdownProps) => {

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    useClickOutside(dropdownRef, () => setIsOpen(false));

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
                {(descriptionIcon || dateOrMileageIcon) 
                    ?
                    <div className={styles['dropdown_menu-wrapper']}>
                        <div className={styles['dropdown_menu-icons']}>
                            <div>{descriptionIcon}</div>
                            <div>{dateOrMileageIcon}</div>
                        </div>
                        <Button 
                        ariaLabelledby={'сохранить'} 
                        variant="save"
                        child={'Сохранить'} 
                        type={'button'}
                        onClick={handleSave}
                    /> 
                    </div>
                    : 
                    <Button 
                        className={styles['dropdown_menu-btn']}
                        ariaLabelledby={'сохранить'} 
                        variant="save"
                        child={'Сохранить'} 
                        type={'button'}
                        onClick={handleSave}
                    /> 
                }
             </div>
        </div>
    )
}