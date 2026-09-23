import styles from './Main.module.scss';
import { Mileage, Tasks } from '@/components';
import { useAppDispatch, useAppSelector } from '@/storage/hooks/hooks';
import { editCar } from '@/storage/slices/carSlice';



export const MainPage = () => {
    const dispatch = useAppDispatch();
    const currentMileage = useAppSelector(state => state.cars.carSelected?.mileage || 0);

    const handleMileageChange = (newMileage: number) => {
      dispatch(editCar({mileage: newMileage}))
    }
    return(
        <main> 
            <section className={styles.center}>
                <Mileage mileage={currentMileage} onUpdate={handleMileageChange}/>
                {/* <section id="next-steps"></section> */}
                <Tasks currentMileage={currentMileage}/>
                
            </section>
        </main>
    )
}