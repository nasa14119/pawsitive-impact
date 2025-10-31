import { Card } from "./components/Card";
import { useControls } from "@components/HeroSection/GalleryHome/hooks/useControls";
import { useRef, useState } from "react";
import type {
  ContentItem,
  StateDirections,
} from "@components/HeroSection/types";
import { usePreloader } from "@components/HeroSection/hooks/usePreloader";
import { tw } from "src/utils";
import { useData } from "@components/HeroSection/hooks/useData";
import { usePhoneOnly } from "@components/HeroSection/hooks/usePhoneOnly";
export function GalleryHome({ className }: { className?: string }) {
  usePreloader();
  const data = useData();
  const container = useRef<HTMLDivElement>(null);
  const [direction, setDirecction] = useState<StateDirections>("idle");
  const [prev, setPrev] = useState<ContentItem | null>(null);
  const [current, setCurrent] = useState<ContentItem>(data[3]);
  useControls({
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
  usePhoneOnly((isDesktop: boolean) => {
    if (isDesktop) {
      setDirecction("idle");
      setPrev(null);
    }
  });
  return (
    <section
      ref={container}
      className={tw(
        className,
        "relative h-full w-full overflow-x-hidden select-none *:max-h-[70dvh]"
      )}
    >
      <Card content={current} direction={direction} />
      {prev && <Card content={prev} isHide direction={direction} />}
    </section>
  );
}
