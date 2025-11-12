import { useControlsFn } from "@components/HeroSection/hooks/useControlsFn";
import { useEffect, useRef, type RefObject } from "react";
type Props = {
  ref: RefObject<HTMLDivElement | null>;
  max?: number;
  prev?: () => void;
  next?: () => void;
};
export const useControls = ({ ref, prev, next }: Props): void => {
  const { next: nextStore, prev: prevStore } = useControlsFn();
  const val = useRef({ x: 0, y: 0 });
  const isClick = useRef(false);
  const handlePrev = () => {
    prevStore();
    prev && prev();
  };
  const handleNext = () => {
    nextStore();
    next && next();
  };
  useEffect(() => {
    if (!ref?.current) return;
    const handleStart = (e: TouchEvent) => {
      isClick.current = true;
      val.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    const handleStartMouse = (e: MouseEvent) => {
      isClick.current = true;
      val.current = { x: e.clientX, y: e.clientY };
    };
    const handleEnd = (e: TouchEvent) => {
      if (isClick.current) return;
      const endX = e.changedTouches[0].clientX;
      const endY = Math.abs(e.changedTouches[0].clientY - val.current.y);
      if (endY >= 20) {
        val.current = { x: 0, y: 0 };
        return;
      }
      if (val.current.x > endX) {
        handleNext();
      } else {
        handlePrev();
      }
      val.current = { x: 0, y: 0 };
    };
    const handleEndMouse = (e: MouseEvent) => {
      if (isClick.current) return;
      const endX = e.clientX;
      const endY = Math.abs(e.clientY - val.current.y);
      if (endY >= 10 || Math.abs(val.current.x - endX) < 10) {
        val.current = { x: 0, y: 0 };
        return;
      }
      if (val.current.x > endX) {
        handleNext();
      } else {
        handlePrev();
      }
      val.current = { x: 0, y: 0 };
    };
    const handleMove = () => {
      isClick.current = false;
    };
    ref.current.addEventListener("touchstart", handleStart);
    ref.current.addEventListener("touchmove", handleMove);
    ref.current.addEventListener("touchend", handleEnd);
    // Mouse
    ref.current.addEventListener("mousemove", handleMove);
    ref.current.addEventListener("mouseup", handleEndMouse);
    ref.current.addEventListener("mousedown", handleStartMouse);
    // Click
    ref.current.addEventListener("click", () => (isClick.current = true));
    return () => {
      ref?.current?.removeEventListener("touchstart", handleStart);
      ref?.current?.removeEventListener("touchmove", handleMove);
      ref?.current?.removeEventListener("touchend", handleEnd);
      ref?.current?.removeEventListener(
        "click",
        () => (isClick.current = true)
      );
      ref?.current?.removeEventListener("mousedown", handleStartMouse);
      ref?.current?.removeEventListener("mousemove", handleMove);
      ref?.current?.removeEventListener("mouseup", handleEndMouse);
    };
  }, [prevStore, nextStore]);
};
