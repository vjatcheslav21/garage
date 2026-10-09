import { useAppDispatch, useAppSelector } from "@/storage/hooks/hooks";
import { setDimension } from "@/storage/slices/userSlice";
import styles from './ToggleDimension.module.scss';

export const ToggleDimension = () => {
    const dimension = useAppSelector(state => state.user.selectDimension);
    const dispatch = useAppDispatch();

    const handleChange = () => {
        const next = dimension === 'date' ? 'mileage' : 'date';
        dispatch(setDimension(next));
    }

    return (
        <>
            <span 
                className={styles.theme}
                onClick={handleChange}>
                Выберите измерение: {(dimension === 'date' ? 'дата' : 'пробег')}
            </span>
        </>
    )
}