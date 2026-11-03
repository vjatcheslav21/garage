import { CarSlider, Mileage } from '@/components';
import styles from './CarPage.module.scss';
import { useAppDispatch, useAppSelector } from '@/storage/hooks';
import { deleteCar, editCar } from '@/storage/slices/carSlice';
import { Button } from '@/shared/ui';

export const CarPage = () => {
    const dispatch = useAppDispatch();
    const currentMileage = useAppSelector(state => state.cars.carSelected?.mileage || 0);
    const carSelected = useAppSelector(state => state.cars.carSelected);

    const handleMileageChange = (newMileage: number) => {
      dispatch(editCar({mileage: newMileage}))
    }

    const handleDeleteCar = () => {
        if (carSelected) {
            dispatch(deleteCar({ id: carSelected.id }));
        }
    }
    
    return(
        <main> 
            <section className={styles.car_page}>
                <CarSlider/>
                <Mileage mileage={currentMileage} onUpdate={handleMileageChange}/>
                {carSelected && 
                    <Button 
                        child="🗑️ Удалить" 
                        ariaLabelledby='Удалить выбранный автомобиль'
                        type='button'
                        variant='light'
                        className={styles.btn_delete}
                        onClick={handleDeleteCar}/>
                }
            </section>
            
            <div className={styles.ticks}></div>
            <section className={styles.spacer}></section>
        </main>
    )
}