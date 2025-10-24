import { Card } from "@components/GalleryHome/components/Card";
import { useControls } from "@components/GalleryHome/hooks/useControls";
import { useRef, useState } from "react";
import type {
  ContentItem,
  StateDirections,
} from "@components/GalleryHome/types";
import data from "./data.json";
import { usePreloader } from "@components/GalleryHome/hooks/usePreloader";
export function GalleryHome() {
  usePreloader();
  const container = useRef<HTMLDivElement>(null);
  const [direction, setDirecction] = useState<StateDirections>("idle");
  const [prev, setPrev] = useState<ContentItem | null>(null);
  const [current, setCurrent] = useState<ContentItem>(data[3]);
  const [i] = useControls({
    ref: container,
    next: (index) => {
      setDirecction("right");
      setCurrent((curr) => {
        setPrev(index === data.length - 1 ? data[data.length - 2] : curr);
        return data[index];
      });
    },
    prev: (index) => {
      setDirecction("left");
      setCurrent((curr) => {
        setPrev(index === 0 ? data[1] : curr);
        return data[index];
      });
    },
  });
  return (
    <section
      ref={container}
      className="relative h-3/4 w-full overflow-x-hidden select-none"
    >
      <Card content={current} direction={direction} />
      {prev && <Card content={prev} isHide direction={direction} />}
    </section>
  );
}
