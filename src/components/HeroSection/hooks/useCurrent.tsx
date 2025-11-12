import { useDataStore } from "@components/HeroSection/store";
import type { ContentItem } from "@components/HeroSection/types";

export const useCurrent = (): [ContentItem, number] => {
  const state = useDataStore();
  if (!state) throw Error("Something went wrong state not found");
  return [state.data[state.current_index], state.current_index];
};
