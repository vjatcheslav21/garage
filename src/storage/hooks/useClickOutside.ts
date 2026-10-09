import { useEffect, type RefObject } from "react";


export const useClickOutside = <T extends HTMLElement>
                                (ref: RefObject<T | null>, 
                                callback:() => void) => {
    useEffect(() => {
        const listener = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                callback();
            }
        };
        document.addEventListener("mousedown", listener);
        return () => {
            document.removeEventListener("mousedown", listener);
        };
    },[ref, callback])
}