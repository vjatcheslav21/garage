
export const validateMileage = (value: string, minMileage?: number): {
    value: number;
    error: string | null;
} => {
    if (!value.trim()) {
        return { value: 0, error: 'Введите пробег' };
    }
    
    if (!/^\d{1,7}$/.test(value)) {
        return { value: 0, error: 'Пробег: только цифры, максимум 7 символов' };
    }
    
    const numValue = parseInt(value, 10);
    
    if (minMileage !== undefined && numValue < minMileage) {
        return { value: 0, error: `Пробег не может быть меньше ${minMileage.toLocaleString('ru-RU')} км` };
    }
    
    return { value: numValue, error: null };
};

export const validateName = (value: string, maxLength = 25): {
    value: string;
    error: string | null;
} => {
    const trimmed = value.trim();
    
    if (!trimmed) {
        return { value: '', error: 'Поле с названием не может быть пустым' };
    }
    
    if (trimmed.length > maxLength) {
        return { value: trimmed, error: `Максимум ${maxLength} символов` };
    }
    
    return { value: trimmed, error: null };
};

export const validateEmail = (value: string): {
    value: string;
    error: string | null;
} => {
    const trimmed = value.trim();
    
    if (!trimmed) {
        return { value: '', error: 'Введите email' };
    }
    
    if (trimmed.length > 25) {
        return { value: trimmed, error: 'Максимум 25 символов' };
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
        return { value: trimmed, error: 'Неверный формат email' };
    }
    
    return { value: trimmed, error: null };
};