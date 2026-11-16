import { useEffect } from "react";


export const useClickEscape = (callback:() => void) => {
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            e.key === 'Escape' && callback();
        };
        document.addEventListener('keydown', handleEsc);
        return () => {
            document.removeEventListener('keydown', handleEsc);
        }
    },[callback])
};
