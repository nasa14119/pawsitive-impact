import { useData } from "@components/HeroSection/hooks/useData";
import { useEffect } from "react";
export const usePreloader = () => {
  const data = useData();
  useEffect(() => {
    const images = data.map((iteration) => {
      return new Promise((res) => {
        const img = new Image();
        img.src = iteration.src;
        img.onload = res;
      });
    });
    Promise.all(images);
  }, []);
};
