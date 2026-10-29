import { useState } from "react";
import { Input } from "@/shared/ui";
import { useAppDispatch } from "@/storage/hooks";
import { editCarName } from "@/storage/slices/carSlice";
import type { Car } from "@/shared/types/types";
import { validateName } from "@/shared/lib";

interface EditableCarNameProps {
    car: Car;
}

export const EditableCarName = ({ car }: EditableCarNameProps) => {
    const [editName, setEditName] = useState(car.name);
    const [error, setError] = useState<string | null>(null); 
    const dispatch = useAppDispatch();

    const handleNameChange = (value: string) => {
        if (value.length <= 20) {
            setEditName(value)
        }
    }

    const handleNameBlur = () => {
        if (editName.trim() && editName !== car.name) {
            dispatch(editCarName(editName.trim()));
        }
        const nameResult = validateName(editName);
        if (nameResult.error) {
            setError(nameResult.error);
            return;
        }
        setError(null);
    }

    return (
        <>
        {error 
        ? 
        <Input
            value={'Введите название'}
            onChange={handleNameChange}
            variant='inline-slider'
            onBlur={handleNameBlur}
            placeholder='Название авто'
            autoFocus/>
        :
            <Input 
                value={editName}
                onChange={handleNameChange}
                variant='inline-slider'
                onBlur={handleNameBlur}
                placeholder='Название авто'
                autoFocus/>
            }
        </>
    );
}