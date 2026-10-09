import type { IconProp } from "@/shared/types/types"

export const DescrIcon = ({ width = 25, height = 22, color = 'currentColor', onClick}: IconProp)  => {
    return (
        <svg 
            width={width} 
            height={height} 
            viewBox="0 0 30 30" 
            fill={color} 
            xmlns="http://www.w3.org/2000/svg"
            stroke={color}
            onClick={onClick}
            >
            <path d="M3 17h12a1 1 0 0 1 .12 2H3a1 1 0 0 1-.12-2zh12zm0-4h18a1 1 0 0 1 .12 2H3a1 1 0 0 1-.12-2zh18zm0-4h18a1 1 0 0 1 .12 2H3a1 1 0 0 1-.12-2zh18zm0-4h18a1 1 0 0 1 .12 2H3a1 1 0 0 1-.12-2zh18z"/>
        </svg>
    )
}