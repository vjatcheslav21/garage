
import { cn } from '@/shared/lib/clsx';
import styles from './Button.module.scss';
import type { ReactNode } from 'react';

type VariantButton = 'save' | 'cancel' | 'checkbox' | 'default';
interface ButtonProps {
    child: ReactNode;
    className?: string;
    ariaLabelledby: string;
    type: "submit" | "button";
    variant?: VariantButton;
    onClick?: () => void;
    disabled?: boolean;
}

export const Button = ({child, className, ariaLabelledby, type, variant, onClick, disabled}: ButtonProps) => {
    return(
        <button 
            aria-labelledby={ariaLabelledby} 
            className={cn(styles.btn, className,
                variant === 'save' && styles.btn_save, 
                variant === 'cancel' && styles.btn_cancel,
                variant === 'checkbox' && styles.btn_checkbox)}
            type={type}
            onClick={onClick}
            disabled={disabled}>
            {child}
        </button>
    )
}