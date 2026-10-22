import { CarSlider, Mileage } from '@/components';
import styles from './CarPage.module.scss';
import { useAppDispatch, useAppSelector } from '@/storage/hooks';
import { editCar } from '@/storage/slices/carSlice';

export const CarPage = () => {
    const dispatch = useAppDispatch();
    const currentMileage = useAppSelector(state => state.cars.carSelected?.mileage || 0);

    const handleMileageChange = (newMileage: number) => {
      dispatch(editCar({mileage: newMileage}))
    }
    return(
        <main> 
            <section className={styles.car_page}>
                <CarSlider/>
                <Mileage mileage={currentMileage} onUpdate={handleMileageChange}/>
            </section>
        </main>
    )
}