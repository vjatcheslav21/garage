import { useAppDispatch, useAppSelector } from "@/storage/hooks/hooks";
import styles from './Profile.module.scss';
import { Button, Input, ToggleDimension, ToggleTheme } from "@/shared/ui";
import { useState } from "react";
import type { TUser } from "@/shared/types/types";
import { updateProfile, userLogout } from "@/storage/slices/userSlice";
import { Dropdown } from "@/components";
import { clearCarsState, loadCarsForCurrentUser } from "@/storage/slices/carSlice";
import { fetchTasksApi } from "@/storage/utils/taskApi";

export const Profile = () => {
    const user = useAppSelector(state => state.user.user);
    const [userData, setUserData] = useState<TUser>(user || {email: '', name: ''});
    const dispatch = useAppDispatch();

    // const handleOpen = () => {
    //     const updatedUser = {...user, ...userData};
    //     setUserData(updatedUser)
    // }
    const handleOpen = () => { if (user) setUserData(user); }
    // const handleSave = () => {
    //     const updatedUser = {...user, ...userData};
    //     dispatch(userLogin(updatedUser));
    //     localStorage.setItem('user', JSON.stringify(updatedUser));
    //     return true
    // }

    const handleSaveEmail = () => {
        dispatch(updateProfile({ name: user!.name, email: userData.email }));
        dispatch(loadCarsForCurrentUser());
        dispatch(fetchTasksApi.util.resetApiState());
        return true;
    }

    const handleSaveName = () => {
        dispatch(updateProfile({ email: user!.email, name: userData.name }));
        dispatch(loadCarsForCurrentUser());
        dispatch(fetchTasksApi.util.resetApiState());
        return true;
    }

    const logoutUser = () => {
        dispatch(userLogout());
        dispatch(clearCarsState());
        dispatch(fetchTasksApi.util.resetApiState());
    }

    return(
        <div className={styles['profile']}>
            <h2 className={styles['prodile_title']}>Ваши данные</h2>
            <div className={styles['profile__info']}>
                <div className={styles['profile__info_user']}>
                    <Dropdown 
                            title={`Ваш email: ${user?.email}`}
                            ariaLabelledBy="Кнопка 'изменить email'"
                            description="Изменить email"
                            onSave={handleSaveEmail}
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
                            onSave={handleSaveName}
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
                    <Dropdown 
                        title={`Настроить критерий ТО`}
                        ariaLabelledBy="Выбарть 'дата' или 'время'"
                        description="Как определять срок ТО"
                        onSave={() => true}
                        onOpen={handleOpen}                            >
                        <ToggleDimension/>
                    </Dropdown>
                </div> 
            </div> 
            <div className={styles.profile__settings}>
                <ToggleTheme/>
                <Button 
                    className={styles.profile__settings_btn}
                    child={"Выйти из аккаунта"} 
                    ariaLabelledby={"Кнопка 'выйти из аккаунта'"} 
                    type={"button"} 
                    variant="light"
                    onClick={logoutUser}
                    />  
            </div>     
        </div>
    )
}