import { useRef, type ReactNode } from 'react';
import styles from './TaskModal.module.scss';
import { BackIcon } from '@/shared/ui/icons';

interface TaskModalProp {
    children: ReactNode;
    onClose: () => void;
}

export const TaskModal = ({children, onClose}: TaskModalProp) => {

    const modalRef = useRef<HTMLDivElement>(null);
    //Это модальное окно на смартфонах, возможно это лишняя логика
    // useClickOutside(modalRef, onClose);
    // useClickEscape(onClose);

    return (
        <>
            <div className={styles.overlay}></div>
            <div className={styles.modal}  ref={modalRef}>
                <span className={styles['modal__close_btn']} onClick={onClose}><BackIcon/></span>
                {children}
            </div>
        </>
    )
}