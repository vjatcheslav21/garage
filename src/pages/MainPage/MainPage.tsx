import styles from './Main.module.scss';
import { Tasks } from '@/components';
import { useAppSelector } from '@/storage/hooks/hooks';

export const MainPage = () => {
    const currentMileage = useAppSelector(state => state.cars.carSelected?.mileage || 0);
    const carSelected = useAppSelector(state => state.cars.carSelected?.name);
    return(
        <main> 
            <section className={styles.center}>
                <h3 className={styles.car_name}>Выбранный авто: {carSelected}</h3>
                <Tasks currentMileage={currentMileage}/>
            </section>
        </main>
    )
}