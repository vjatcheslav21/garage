import type { UserLogin } from "@/shared/types/types";
import { Button, Input } from "@/shared/ui";
import { useAppDispatch, useAppSelector } from "@/storage/hooks/hooks";
import { fetchUser } from "@/storage/thunks/thunks";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from './Login.module.scss';
import { PasswordInput } from "@/shared/ui/PasswordInput/PasswordInput";

export const Login = () => {
    const [loginData, setLoginData] = useState<UserLogin>({email: '', password: ''});
    const errorMessage = useAppSelector(state => state.user.errorMessage);
    const requestStatus = useAppSelector(state => state.user.requestStatus);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(fetchUser(loginData));
    }

    useEffect(() => {
        if (requestStatus === 'Success') {
            navigate('/main', { replace: true })
        }
    }, [requestStatus])


    return(
        <form className={styles['login_form']} onSubmit={handleSubmit}>
            {errorMessage ? <p>{errorMessage}</p> : null}
            <Input 
                value={loginData.email} 
                onChange={(value) => setLoginData({...loginData, email: value})}
                placeholder="Введите email"
                />
            <PasswordInput
                value={loginData.password} 
                onChange={(value) => setLoginData({...loginData, password: value})}
                placeholder="Введите пароль"
            />
            <Button 
                child={requestStatus !== 'Loading' ? "Отправить" : "Загрузка"} 
                ariaLabelledby={"кнопка 'Войти в аккаунт'"} 
                type={"submit"} 
                className={styles['btn__form-login']}
                disabled={requestStatus === 'Loading'}
                />
        </form>
    )
}