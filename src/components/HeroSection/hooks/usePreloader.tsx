import { useEffect } from "react";
import data from "../GalleryHome/data.json";
export const usePreloader = () => {
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
