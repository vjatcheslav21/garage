
import { Login, SignUp } from "@/components";
import styles from './AuthPage.module.scss';
import { Link } from "react-router-dom";

interface AuthPageProps {
    initialTab: string;
}

export const AuthPage = ({initialTab}: AuthPageProps) => {

    return (
        <div className={styles.auth}>
            <div className={styles.auth_wrapper}>
                <h2 className={styles.auth_title}>Гараж — твой личный <br></br> планировщик ТО для авто</h2>
                {initialTab === 'login' ? 
                    <Login/>
                    :
                    <SignUp/>    
                }
                
            </div>
            {initialTab === 'login' ? 
                <p className={styles.auth_p}>Нет аккаунта? <br></br>
                    <Link to='/signup'>Зарегистрироваться</Link>
                </p> 
                : 
                <p className={styles.auth_p}>Есть аккаунт? <br></br>
                    <Link to='/login'>Авторизоваться</Link>
                </p>
            }           
        </div>
    )
}