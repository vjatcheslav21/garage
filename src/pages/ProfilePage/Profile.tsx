import { useAppDispatch, useAppSelector } from "@/storage/hooks/hooks";
import styles from './Profile.module.scss';
import { Button, Input } from "@/shared/ui";
import { useState } from "react";
import type { TUser } from "@/shared/types/types";
import { userLogin, userLogout } from "@/storage/slices/userSlice";
import { Dropdown } from "@/components";

export const Profile = () => {
    const user = useAppSelector(state => state.user.user);
    const car = useAppSelector(state => state.cars.carSelected);
    const [userData, setUserData] = useState<TUser>(user || {email: '', name: ''});
    const dispatch = useAppDispatch();

    const handleOpen = () => {
        const updatedUser = {...user, ...userData};
        setUserData(updatedUser)
    }

    const handleSave = () => {
        const updatedUser = {...user, ...userData};
        dispatch(userLogin(updatedUser));
        localStorage.setItem('user', JSON.stringify(updatedUser));
        return true
    }

    const logoutUser = () => {
        dispatch(userLogout());
    }

    return(
        <div className={styles['profile']}>
            <h2 className={styles['prodile_title']}>Данные профиля</h2>
            <div className={styles['profile__info']}>
                <div className={styles['profile__info_car']}>
                    <span className={styles['title']}>Ваш автомобиль: {car?.name}</span>
                </div>
                <div className={styles['profile__info_user']}>
                    <Dropdown 
                            title={`Ваш email: ${user?.email}`}
                            ariaLabelledBy="Кнопка 'изменить email'"
                            description="Изменить email"
                            onSave={handleSave}
                            onOpen={handleOpen}
                            >
                            <Input
                                value={userData.email}
                                onChange={(value) => setUserData({...userData, email: value})}
                                type="string"
                                placeholder="Укажите email"
                                />
                        {/* {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>} */}
                    </Dropdown>
                    <Dropdown 
                            title={`Ваше имя: ${user?.name}`}
                            ariaLabelledBy="Кнопка 'изменить имя'"
                            description="Изменить имя"
                            onSave={handleSave}
                            onOpen={handleOpen} 
                            >
                            <Input
                                value={userData.name}
                                onChange={(value) => setUserData({...userData, name: value})}
                                type="string"
                                placeholder="Укажите name"
                                />
                        {/* {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>} */}
                    </Dropdown>
                </div> 
            </div> 
            <Button 
                child={"Выйти из аккаунта"} 
                ariaLabelledby={"Кнопка 'выйти из аккаунта'"} 
                type={"button"} 
                onClick={logoutUser}
                />        
        </div>
    )
}