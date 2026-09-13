import { useState } from 'react';
import styles from '../Input/Input.module.scss';
// import { Eye, EyeOff } from 'lucide-react'; // или любая другая иконка
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
        className={styles['input']}
      />
      <button
        type="button"
        onClick={handleToggle}
        aria-label={visible ? "Скрыть пароль" : "Показать пароль"}
        className={styles['password_btn']}
      >
        {/* {visible ? <Eye size={20} /> : <EyeOff size={20} />} */}
        {visible ? "скрыть пароль" : "показать пароль"}
      </button>
    </div>
  );
}
