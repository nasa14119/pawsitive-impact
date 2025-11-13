import { useDataStore } from "@components/HeroSection/store";

export const useControlsFn = () => {
  const state = useDataStore();
  if (!state) throw Error("Something went wrong state not accesible");
  const handlePrev = () => {
    const { current_index, setIndex } = state;
    if (current_index === 0) return;
    setIndex(current_index - 1);
  };
  return {
    prev: handlePrev,
    next: () => {
      const { current_index, setIndex, data } = state;
      if (current_index >= data.length - 1) return;
      setIndex(current_index + 1);
    },
  };
};
