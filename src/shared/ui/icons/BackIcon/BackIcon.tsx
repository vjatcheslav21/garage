import type { IconProp } from "@/shared/types/types";
import styles from '../icons.module.scss';

export const BackIcon = ({ width = 30, height = 30, color = 'currentColor' }: IconProp) => {
    return (
        // <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        //     <defs><style>.cls-1{fill:#fff;opacity:0;}.cls-2{fill:#231f20;}</style></defs><title>arrow-ios-back</title><g id="Layer_2" data-name="Layer 2"><g id="arrow-ios-back"><g id="arrow-ios-back-2" data-name="arrow-ios-back"><rect class="cls-1" width="24" height="24" transform="translate(24 0) rotate(90)"/><path class="cls-2" d="M13.83,19a1,1,0,0,1-.78-.37l-4.83-6a1,1,0,0,1,0-1.27l5-6a1,1,0,0,1,1.54,1.28L10.29,12l4.32,5.36A1,1,0,0,1,13.83,19Z"/></g></g></g>
        // </svg>
        // <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <svg 
            className={styles.icon}
            width={width} 
            height={height} 
            viewBox="0 0 35 35" 
            fill={color} 
            xmlns="http://www.w3.org/2000/svg"
            stroke={color}>
            <g data-name="Layer 2" id="Layer_2"><path d="M31,16A15,15,0,1,1,16,1,15,15,0,0,1,31,16ZM3,16A13,13,0,1,0,16,3,13,13,0,0,0,3,16Z"/><path d="M19.87,10.41,14.29,16l5.58,5.59a1,1,0,0,1,0,1.41h0a1,1,0,0,1-1.41,0L12.1,16.64a.91.91,0,0,1,0-1.28L18.46,9a1,1,0,0,1,1.41,0h0A1,1,0,0,1,19.87,10.41Z"/></g>
        </svg>
    )
}