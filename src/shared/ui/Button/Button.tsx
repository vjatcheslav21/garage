
import { cn } from '@/shared/lib/clsx';
import styles from './Button.module.scss';

interface ButtonProps {
    child: string;
    className?: string;
    ariaLabelledby: string;
    type: "submit" | "button";
    onClick?: () => void;
    disabled?: boolean;
}

export const Button = ({child, className, ariaLabelledby, type, onClick, disabled}: ButtonProps) => {
    return(
        <button 
            aria-labelledby={ariaLabelledby} 
            className={cn(styles.btn, className)}
            type={type}
            onClick={onClick}
            disabled={disabled}>
            {child}
        </button>
    )
}