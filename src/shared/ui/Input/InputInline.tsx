import type { InputProps } from "@/shared/ui/Input/Input";
import styles from './Input.module.scss';

export const InputInline = ({value, onChange, placeholder}: InputProps) => {
    return(
        <>
        <input
            className={styles.inline}
            type="text"
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder={placeholder}
        />
        </>
    )
}