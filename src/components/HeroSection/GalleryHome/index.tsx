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
import { useIndexStore } from "@components/HeroSection/store";
export function GalleryHome({ className }: { className?: string }) {
  usePreloader();
  const { index } = useIndexStore();
  const data = useData();
  const container = useRef<HTMLDivElement>(null);
  const [direction, setDirecction] = useState<StateDirections>("idle");
  const [prev, setPrev] = useState<ContentItem | null>(null);
  const [current, setCurrent] = useState<ContentItem>(data[index]);
  useControls({
    ref: container,
    next: (prev_index) => {
      setDirecction("right");
      setCurrent((curr) => {
        setPrev(
          prev_index + 1 === data.length - 1 ? data[data.length - 2] : curr
        );
        return data[prev_index + 1];
      });
    },
    prev: (prev_index) => {
      setDirecction("left");
      setCurrent((curr) => {
        setPrev(prev_index - 1 === 0 ? data[1] : curr);
        return data[prev_index - 1];
      });
    },
  });
  usePhoneOnly((isDesktop: boolean) => {
    if (isDesktop) {
      setDirecction("idle");
      setPrev(null);
      setCurrent(data[index]);
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
