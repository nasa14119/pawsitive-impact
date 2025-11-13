import { Card } from "./components/Card";
import { useControls } from "@components/HeroSection/GalleryHome/hooks/useControls";
import { useCallback, useRef, useState } from "react";
import type {
  ContentItem,
  StateDirections,
} from "@components/HeroSection/types";
import { tw } from "src/utils";
import { useData } from "@components/HeroSection/hooks/useData";
import { usePhoneOnly } from "@components/HeroSection/hooks/usePhoneOnly";
import { useCurrent } from "@components/HeroSection/hooks/useCurrent";
import { useDataStore } from "@components/HeroSection/store";
import { NextBtn, PrevBtn } from "@components/HeroSection/components/Controls";
export function GalleryHome({ ...rest }) {
  const data = useData();
  if (!data || data.length <= 0) return null;
  return <Display {...rest} />;
}
type Props = {
  className?: string;
};
function Display({ className }: Props) {
  const [current, index] = useCurrent();
  const dataStore = useDataStore((s) => s.data);
  const [direction, setDirecction] = useState<StateDirections>("idle");
  const [prev, setPrev] = useState<ContentItem | null>(null);
  const container = useRef<HTMLDivElement>(null);
  const handleNext = useCallback(() => {
    if (index === dataStore.length - 1) {
      setPrev(null);
      return;
    }
    setDirecction("right");
    setPrev(dataStore[index]);
  }, [index]);
  const handlePrev = useCallback(() => {
    if (index === 0) {
      setPrev(null);
      return;
    }
    setDirecction("left");
    setPrev(dataStore[index]);
  }, [index]);
  useControls({
    ref: container,
    next: handleNext,
    prev: handlePrev,
  });
  usePhoneOnly((isDesktop: boolean) => {
    if (isDesktop) {
      setDirecction("idle");
      setPrev(null);
    }
  });
  return (
    <section
      key={current.title}
      ref={container}
      className={tw(
        className,
        "relative h-full w-full overflow-x-hidden select-none *:max-h-[70dvh]"
      )}
    >
      <NextBtn
        className="absolute right-1 top-1/2 -translate-y-1/2 bg-brand/80 focus:outline-1"
        onClick={handleNext}
      />
      <PrevBtn
        className="absolute left-1 top-1/2 -translate-y-1/2 p-3  bg-brand/80 focus:outline-1"
        onClick={handlePrev}
      />
      {prev && <Card content={prev} isHide direction={direction} />}
      <Card content={current} direction={direction} />
    </section>
  );
}
