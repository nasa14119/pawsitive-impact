import type { DataStore } from "@components/HeroSection/types";
import { create } from "zustand";

export const useDataStore = create<DataStore>((set) => ({
  current_index: 0,
  data: [],
  setIndex: (i: number) => set(() => ({ current_index: i })),
  setData: (new_val: Partial<DataStore>) => set(() => ({ ...new_val })),
}));
export const useNextFn = () => {
  const state = useDataStore();
  if (!state) throw Error("Context not accesible");
  return () => {
    if (state.current_index >= state.data.length - 1) return;
    state.setIndex(state.current_index + 1);
  };
};
export const usePrevFn = () => {
  const state = useDataStore();
  if (!state) throw Error("Context not accesible");
  return () => {
    if (state.current_index === 0) return;
    state.setIndex(state.current_index - 1);
  };
};
