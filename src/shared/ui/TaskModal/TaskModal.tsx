import { useRef, type ReactNode } from 'react';
import styles from './TaskModal.module.scss';
import { useClickOutside } from '@/storage/hooks/useClickOutside';
import { useClickEscape } from '@/storage/hooks/useClickEscape';

interface TaskModalProp {
    children: ReactNode;
    onClose: () => void;
}

export const TaskModal = ({children, onClose}: TaskModalProp) => {

    const modalRef = useRef<HTMLDivElement>(null);
    useClickOutside(modalRef, onClose);
    useClickEscape(onClose);

    return (
        <>
            <div className={styles.overlay}></div>
            <div className={styles.modal}  ref={modalRef}>
                <span className={styles['modal__close_btn']} onClick={onClose}>Закрыть</span>
                <div className={styles.modal__content}>
                    {children}
                </div>
            </div>
        </>
    )
}