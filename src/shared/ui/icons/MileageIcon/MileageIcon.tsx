import type { IconProp } from "@/shared/types/types";
import styles from '../icons.module.scss';

export const MileageIcon = ({ width = 20, height = 22, color = 'currentColor', onClick}: IconProp) => {
    return(
        <svg
            className={styles.icon}
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox="0 0 25 25"
            fill="none"
            stroke={color}
            onClick={onClick}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            >
            <path d="M5.636 19.364a9 9 0 1 1 12.728 0" />
            <path d="M16 9l-4 4" />
        </svg>
    )
}