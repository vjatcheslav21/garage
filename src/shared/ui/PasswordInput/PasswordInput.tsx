import { useState } from 'react';
import styles from '../Input/Input.module.scss';
import { EyeIcon } from '@/shared/ui/icons/EyeIcon';
import { EyeOffIcon } from '@/shared/ui/icons/EyeOffIcon';
import { cn } from '@/shared/lib/clsx';
interface PasswordInputProps {
    value?: string;
    onChange: (v: string) => void;
    placeholder?: string;
}

export const PasswordInput = ({ value, onChange, placeholder }: PasswordInputProps) => {
    
  const [visible, setVisible] = useState(false);

  const handleToggle = () => setVisible(!visible);

  return (
    <div className={styles.input_wrapper}>
      <input
        type={visible ? 'text' : 'password'}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete="current-password"
        className={cn(styles.input, styles.input_password)}
      />
      <button
        type="button"
        onClick={handleToggle}
        aria-label={visible ? "Скрыть пароль" : "Показать пароль"}
        className={styles.password_btn}
      >
        {visible ? <EyeIcon /> : <EyeOffIcon/>}
      </button>
    </div>
  );
}
