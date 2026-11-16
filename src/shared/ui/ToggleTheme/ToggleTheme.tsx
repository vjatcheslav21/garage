import { useAppDispatch, useAppSelector } from "@/storage/hooks/hooks";
import { toggleTheme } from "@/storage/slices/userSlice";
import styles from './ToggleTheme.module.scss';

export const ToggleTheme = () => {
    const theme = useAppSelector(state => state.user.themeColor);
    const dispatch = useAppDispatch();

    const handleChange = () => {
        const next = theme === 'dark' ? 'light' : 'dark';
        dispatch(toggleTheme(next));
    }

    return (
        <>
            <span 
                className={styles.theme}
                onClick={handleChange}>
                Тема: {(theme === 'light' ? 'светлая' : 'темная')}
            </span>
        </>
    )
}