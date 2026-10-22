import { useAppDispatch, useAppSelector } from "@/storage/hooks/hooks";
import { setDimension } from "@/storage/slices/userSlice";
import { InputRadio } from "@/shared/ui/Input";

export const ToggleDimension = () => {
    const dimension = useAppSelector(state => state.user.selectDimension);
    const dispatch = useAppDispatch();

    const handleDimensionChange = (newValue: 'mileage' | 'date') => {
        dispatch(setDimension(newValue))
    }

    return (
        <>
            <InputRadio value={dimension} onChange={handleDimensionChange}/>
        </>
    )
}