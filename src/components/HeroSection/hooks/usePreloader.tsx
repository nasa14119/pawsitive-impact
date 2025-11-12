import type { ContentItem } from "@components/HeroSection/types";
import { useEffect } from "react";
export const usePreloader = (data: ContentItem[] | null) => {
  useEffect(() => {
    if (!data) return;
    const images = data.map((iteration) => {
      return new Promise((res) => {
        const img = new Image();
        img.src = Array.isArray(iteration.src)
          ? iteration.src[0]
          : iteration.src;
        img.onload = res;
      });
    });
    Promise.all(images);
  }, [data]);
};
