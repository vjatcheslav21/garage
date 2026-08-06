import styles from './Main.module.scss';
import { Mileage, Tasks } from '@/components';
import { useLocalStorage } from '@/storage/hooks/useLocalStorage';



export const Main = () => {
    
    const [currentMileage, setCurrentMileage] = useLocalStorage<number>('carMileage', 20000);

    const handleMileageChange = (newMileage: number) => {
      setCurrentMileage(newMileage);
    }

    return(
        <main> 
            <section className={styles.center}>
                {/* <Intro name={'Salva'}/> */}
                

                <Mileage mileage={currentMileage} onUpdate={handleMileageChange}/>
                {/* <section id="next-steps"></section> */}
                <Tasks currentMileage={currentMileage}/>
                
            </section>
        </main>
    )
}