
import { cn } from '@/shared/lib/clsx';
import styles from './Input.module.scss';

export type VariantInput = 'classic' | 'inline' | 'slider' | 'inline-slider' | 'disabled';
export interface InputProps {
    className?: string;
    value: string;          
    onBlur?:() => void;   
    onChange: (value: string) => void;  
    placeholder?: string;
    type?: string;
    autoFocus?: boolean;
    id?: string;
    variant?: VariantInput;
}

export const Input = ({className, value, onBlur, onChange, placeholder, type="text", id, variant}: InputProps) => {
    return (
        <div className={cn(styles.input_wrapper, className)}>
            <input 
                className={cn(styles.input, 
                    variant === 'inline' && styles.inline,
                    variant === 'slider' && styles.slider,
                    variant === 'inline-slider' && styles['inline-slider'],
                    variant === 'disabled' && styles.disabled
                )}  
                type={type}
                value={value}
                id={id}
                disabled={variant === 'disabled'}
                onBlur={onBlur}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={(e) => {
                    if(e.key === 'Enter') {
                        
                    }
                }}
                placeholder={placeholder} />
        </div>
    )
}