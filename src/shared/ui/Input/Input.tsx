
import { cn } from '@/shared/lib/clsx';
import styles from './Input.module.scss';

interface InputProps {
    className?: string;
    value: string;             
    onChange: (value: string) => void;       
    placeholder?: string;
    type?: string;
    autoFocus?: boolean;
    id?: string;
}

export const Input = ({className, value, onChange, placeholder, type="text", id}: InputProps) => {
    return (
        <div className={cn(styles.input_wrapper, className)}>
            <input 
                className={cn(styles.input)} 
                type={type}
                value={value}
                id={id}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={(e) => {
                    if(e.key === 'Enter') {
                        
                    }
                }}
                placeholder={placeholder} />
        </div>
    )
}