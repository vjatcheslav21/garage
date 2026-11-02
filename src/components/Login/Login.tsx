import type { UserLogin } from "@/shared/types/types";
import { Button, ErrorMessage, Input, InputPassword } from "@/shared/ui";
import { useAppDispatch, useAppSelector } from "@/storage/hooks/hooks";
import { fetchUser } from "@/storage/thunks/thunks";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from './Login.module.scss';
import { validateEmail } from "@/shared/lib";
import { fetchTasksApi } from "@/storage/utils/taskApi";
import { loadCarsForCurrentUser } from "@/storage/slices/carSlice";

export const Login = () => {
    const [loginData, setLoginData] = useState<UserLogin>({email: '', password: ''});
    const errorMessage = useAppSelector(state => state.user.errorMessage);
    const requestStatus = useAppSelector(state => state.user.requestStatus);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const loginResult = validateEmail(loginData.email);
        if (loginResult.error) {
            setError(loginResult.error)
            return;
        }
        setError(null);
        dispatch(fetchUser(loginData));
    }

    useEffect(() => {
        if (requestStatus === 'Success') {
            dispatch(fetchTasksApi.util.resetApiState());
            dispatch(loadCarsForCurrentUser());
            navigate('/main', { replace: true });
        }
    }, [requestStatus])


    return(
        <form className={styles['login_form']} onSubmit={handleSubmit}>
            <Input 
                value={loginData.email} 
                onChange={(value) => setLoginData({...loginData, email: value})}
                placeholder="Введите email"
                />
            <InputPassword
                value={loginData.password} 
                onChange={(value) => setLoginData({...loginData, password: value})}
                placeholder="Введите пароль"
            />
            {errorMessage && <ErrorMessage error={errorMessage}/>}
            {error && <ErrorMessage error={error}/>}
            <Button 
                child={requestStatus !== 'Loading' ? "Отправить" : "Загрузка"} 
                ariaLabelledby={"кнопка 'Войти в аккаунт'"} 
                type={"submit"} 
                // className={styles['btn__form-login']}
                variant="light"
                disabled={requestStatus === 'Loading'}
                />
        </form>
    )
}