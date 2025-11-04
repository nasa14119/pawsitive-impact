import type { Store, Content } from "@components/HeroSection/types";
import { createStore } from "zustand";
import db from "./data.json";
import { useStore } from "zustand";
const INICIAL_INDEX = 3;
const store = createStore<Store>((set) => ({
  index: INICIAL_INDEX,
  max: db.length - 1,
  next: (onChange) =>
    set((state) => {
      if (state.index + 1 > state.max) return {};
      onChange && onChange(state.index);
      return { index: state.index + 1 };
    }),
  prev: (onChange) => {
    set((state) => {
      if (state.index - 1 < 0) return { ...state };
      onChange && onChange(state.index);
      return { index: state.index - 1 };
    });
  },
}));
export const useIndexStore = () => {
  const state = useStore(store);
  if (!state) throw Error("Error in store");
  return state;
};
