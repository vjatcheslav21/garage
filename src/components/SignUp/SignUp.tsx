import type { UserRegistration } from "@/shared/types/types";
import { Button, ErrorMessage, Input, InputPassword } from "@/shared/ui";
import { useAppDispatch, useAppSelector } from "@/storage/hooks/hooks";
import { registerUser } from "@/storage/thunks/thunks";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from './SignUp.module.scss';
import { validateEmail } from "@/shared/lib";
import { clearError } from "@/storage/slices/userSlice";
import { fetchTasksApi } from "@/storage/utils/taskApi";
import { loadCarsForCurrentUser } from "@/storage/slices/carSlice";

export const SignUp = () => {

    const [registrationData, setRegistrationData] = useState<UserRegistration>({email: '', name: '', password: ''});
    let errorMessage = useAppSelector(state => state.user.errorMessage);
    const requestStatus = useAppSelector(state => state.user.requestStatus);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [localError, setLocalError] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const emailResult = validateEmail(registrationData.email);
        if (emailResult.error) {
            setLocalError(emailResult.error);
            return;
        }
        
        if (!registrationData.name.trim()) {
            setLocalError('Введите имя');
            return;
        }
        
        if (!registrationData.password) {
            setLocalError('Введите пароль');
            return;
        }
        setLocalError(null);
        dispatch(registerUser(registrationData));
    }
    useEffect(() => {
        return () => {
            dispatch(clearError());
        };
    }, []);
        
    useEffect(() => {
        if (requestStatus === 'Success') {
            dispatch(fetchTasksApi.util.resetApiState());
            dispatch(loadCarsForCurrentUser());
            navigate('/main', { replace: true });
        }
    }, [requestStatus]);

    const handleValueChange = (value: string, field: keyof UserRegistration) => {
        if (value.length < 20) {
            setRegistrationData(prev => ({...prev, [field]: value}))
        }
    }

    return(
        <form className={styles['form_sign-up']} onSubmit={handleSubmit}>
            <Input 
                value={registrationData.email} 
                onChange={value => handleValueChange(value, 'email')}
                placeholder="Введите email"
                />
            <Input 
                value={registrationData.name} 
                onChange={value => handleValueChange(value, 'name')}
                placeholder="Придумайте имя"
                />
            <InputPassword
                value={registrationData.password} 
                onChange={value => handleValueChange(value, 'password')}
                placeholder="Придумайте пароль"
            />            
            {localError && <ErrorMessage error={localError}/>}
            {errorMessage && <ErrorMessage error={errorMessage}/>}
            <Button 
                child={requestStatus !== 'Loading' ? "Отправить" : "Загрузка"} 
                ariaLabelledby={"кнопка 'Войти в аккаунт'"} 
                type={"submit"}
                className={styles['btn__form-sign-up']}
                disabled={requestStatus === 'Loading'}
                />
        </form>
    )
}