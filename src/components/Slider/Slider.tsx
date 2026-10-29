import { useEffect, useState } from "react";
import styles from './Slider.module.scss';
import { useAppDispatch, useAppSelector } from "@/storage/hooks/hooks";
import { useNavigate } from "react-router-dom";
import type { BasicCarInfo } from "@/shared/types/types";
import { fetchCar } from "@/storage/thunks/thunks";
import { Onboard } from "@/components/Slider/Slides/Onboard/Onboard";
import { HowToUse } from "@/components/Slider/Slides/HowToUse/HowToUse";
import { CreateCar } from "@/components/Slider/Slides/CreateCar/CreateCar";

export const Slider = () => {

    const [activeIndex, setActiveIndex] = useState(0);
    const userName = useAppSelector(state => state.user.user?.name);
    const [carData, setCarData] = useState<BasicCarInfo>({name: '', mileage: 0});
    const requestStatus = useAppSelector(state => state.cars.requestStatus);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
    if (requestStatus === 'Success') {
            navigate('/main', { replace: true })
        }
    }, [requestStatus]);

    const handleSubmit = () => {
         console.log('dispatch fetchCar вызван!');
        dispatch(fetchCar(carData));
    }
    
    const next = () => {
        setActiveIndex((prev) => (prev === 2 ? 2 : prev + 1));
    };

    return (
        <>
        <div className={styles.container}>
            <div className={styles.slides_track}>
                <div className={styles.slider}
                style={{
                    transform: `translateX(-${activeIndex * 100}%)`,
                    transition: 'transform 0.3s ease-in-out',
                }}
                >
                    <div className={styles.slide}>
                        <Onboard onClickNext={next} name={userName} />
                        </div>
                    <div className={styles.slide}>
                        <CreateCar 
                            onCreate={(data) => {
                                setCarData(data); 
                                next();           
                            }} 
                        />
                    </div>
                    <div className={styles.slide}>
                        <HowToUse onClickFinal={handleSubmit}/>
                    </div>
                </div>
            </div>
            <div className={styles.steps}>
                <span>Шаг {activeIndex + 1} / 3</span>
            </div>
        </div>
        </>
    )
}