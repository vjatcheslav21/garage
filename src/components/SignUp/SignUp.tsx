import type { UserRegistration } from "@/shared/types/types";
import { Button, Input } from "@/shared/ui";
import { useAppDispatch, useAppSelector } from "@/storage/hooks/hooks";
import { registerUser } from "@/storage/thunks/thunks";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from './SignUp.module.scss';

export const SignUp = () => {

    const [registrationData, setRegistrationData] = useState<UserRegistration>({email: '', name: '', password: ''});
    const errorMessage = useAppSelector(state => state.user.errorMessage);
    const requestStatus = useAppSelector(state => state.user.requestStatus);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

        const handleSubmit = (e: React.FormEvent) => {
                e.preventDefault();
                dispatch(registerUser(registrationData));
        }
        
        useEffect(() => {
            if (requestStatus === 'Success') {
                navigate('/main', { replace: true })
            }
        }, [requestStatus])
    
        return(
            <form className={styles['form_sign-up']} onSubmit={handleSubmit}>
                {errorMessage ? <p>{errorMessage}</p> : null}
                <Input 
                    value={registrationData.email} 
                    onChange={(value) => setRegistrationData({...registrationData, email: value})}
                    placeholder="Введите email"
                    />
                <Input 
                    value={registrationData.name} 
                    onChange={(value) => setRegistrationData({...registrationData, name: value})}
                    placeholder="Придумайте имя"
                    />
                <Input 
                    value={registrationData.password} 
                    onChange={(value) => setRegistrationData({...registrationData, password: value})}
                    placeholder="Придумайте пароль"
                    />
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