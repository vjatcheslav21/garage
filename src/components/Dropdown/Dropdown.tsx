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
    controlledIsOpen?: boolean;
    onSave: () => boolean; 
    onOpen?: () => void;   
    onCloseDropdown?: () => void;
    hideSaveButton?: boolean;
}

export const Dropdown = ({
                            title, 
                            children, 
                            ariaLabelledBy,
                            description, 
                            descriptionIcon, 
                            dateOrMileageIcon,
                            controlledIsOpen,
                            onSave, 
                            onOpen,
                            onCloseDropdown,
                            hideSaveButton
                        }: DropdownProps) => {

    const [internalIsOpen, setInternalIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const isControlled = controlledIsOpen !== undefined;
    const isOpen = isControlled ? controlledIsOpen : internalIsOpen;
    
    useClickOutside(dropdownRef, () => {
        if (isControlled) {
            onCloseDropdown?.();
        } else {
            setInternalIsOpen(false);
        }
    });

    const toggle = () => {
        if (isControlled) {
            if (isOpen) {
                onCloseDropdown?.();
            } else {
                onOpen?.();
            }
            return; 
        }
        const willOpen = !internalIsOpen;
        setInternalIsOpen(willOpen);
        if (willOpen && onOpen) {
            onOpen();
        }
    }

    const handleSave = () => {
        const isSuccessful = onSave();
        if (isSuccessful) {
            if (isControlled) {
                onCloseDropdown?.();
            } else {
                setInternalIsOpen(false);
            }
        }
    }

    const renderSaveButton = () => {
        if (hideSaveButton) return null;
        return (descriptionIcon || dateOrMileageIcon) 
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
                {renderSaveButton()}
             </div>
        </div>
    )
}