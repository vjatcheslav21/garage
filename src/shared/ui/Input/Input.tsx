
import styles from './Input.module.scss';

interface InputProps {
    className?: string;
    value: string;             
    onChange: (value: string) => void;       
    placeholder?: string;
    type?: string;
    autoFocus?: boolean;
}

export const Input = ({value, onChange, placeholder, type="text"}: InputProps) => {
    return (
        <div className={styles.input_wrapper}>
            <input 
                className={styles.input} 
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={(e) => {
                    if(e.key === 'Enter') {
                        
                    }
                }}
                placeholder={placeholder} />
        </div>
    )
}