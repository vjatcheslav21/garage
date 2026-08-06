import type { RootState } from "@/storage/store";
import type store from "@/storage/store";
import { useDispatch, useSelector } from "react-redux";

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = <T,>(selector: (state: RootState) => T):T => useSelector<RootState, T>(selector);