import styles from './Plus.module.scss';
import { cn } from '@/shared/lib/clsx';

interface PlusProps {
    onClick?:() => void;
    ariaLabelledBy: string;
    isOpen: boolean;
}

export const Plus = ({onClick, ariaLabelledBy, isOpen}: PlusProps) => {
    return(
        <button 
            className={cn(styles.button_plus, isOpen && styles.open)} 
            type="button" 
            onClick={onClick} 
            aria-labelledby={ariaLabelledBy}>
                <span>+</span>
        </button>
    )
}

