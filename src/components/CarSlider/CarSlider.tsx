import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useAppDispatch, useAppSelector } from "@/storage/hooks";
import { selectCar } from "@/storage/slices/carSlice";
import { cn } from "@/shared/lib";
import styles from "./CarSlider.module.scss";
import { useState, useRef, useEffect } from "react";
import { Dropdown } from "@/components/Dropdown";
import { AddCar } from "@/components/AddCar";
import { fetchCar } from "@/storage/thunks/thunks";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";

export const CarSlider = () => {
    const [forceOpen, setForceOpen] = useState(false);
    const cars = useAppSelector(state => state.cars.cars);
    const carSelected = useAppSelector(state => state.cars.carSelected);
    const dispatch = useAppDispatch();
    const swiperRef = useRef<SwiperType | null>(null);

    const handleSelectCar = (carId: string, index: number) => {
        dispatch(selectCar(carId));
        if (swiperRef.current) {
            swiperRef.current.slideTo(index);
        }
    };

    useEffect(() => {
        if(carSelected && swiperRef.current) {
            const index = cars.findIndex(c => c.id === carSelected.id);
            if (index !== -1) {
                swiperRef.current.slideTo(index);
            }
        }
    },[carSelected, cars]);
    
    return (
        <div className={styles.wrapper}>
            <h2 className={styles.car_title}>Ваши авто</h2>
            <Swiper
                modules={[Navigation]}
                navigation
                spaceBetween={'15px'}
                slidesPerView={'auto'}
                centeredSlidesBounds={true}
                centerInsufficientSlides={true}
                centeredSlides
                onSwiper={(swiper) => { swiperRef.current = swiper; }}
                breakpoints={{
                    0: { slidesPerView: 'auto' },
                    768: { slidesPerView: 'auto' }
                }}
            >
                {cars.map((car, index) => (
                    <SwiperSlide 
                        key={car.id}
                        onClick={() => handleSelectCar(car.id, index)}
                    >
                        <div className={cn(
                            styles.slide,
                            car.id === carSelected?.id && styles.slide_active
                        )}>
                            <h4>{car.name}</h4>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className={styles.add_car_wrapper}>
                <Dropdown
                    title="Добавить авто"
                    ariaLabelledBy="Кнопка 'добавить авто'"
                    hideSaveButton
                    onSave={() => true}
                    controlledIsOpen={forceOpen}
                    onOpen={() => setForceOpen(true)}
                    onCloseDropdown={() => setForceOpen(false)}
                >
                    <AddCar 
                        btnText="Добавить" 
                        onSubmit={(data) => {
                            dispatch(fetchCar(data));
                            setForceOpen(false);
                        }} 
                    />
                </Dropdown>
            </div>
        </div>
    )
}