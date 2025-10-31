import {
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type RefObject,
  type SetStateAction,
} from "react";
import data from "../data.json";
type Props = {
  ref: RefObject<HTMLDivElement | null>;
  max?: number;
  prev?: (i: number) => void;
  next?: (i: number) => void;
};
const DEFAULT_START = 3;
const MAX = data.length - 1;
export const useControls = ({
  ref,
  prev,
  next,
  max = MAX,
}: Props): [number, Dispatch<SetStateAction<number>>] => {
  const [state, setState] = useState<number>(DEFAULT_START);
  const val = useRef({ x: 0, y: 0 });
  const isClick = useRef(false);
  const handlePrev = () => {
    setState((curr) => {
      const new_val = curr != 0 ? curr - 1 : 0;
      prev && prev(new_val);
      return new_val;
    });
  };
  const handleNext = () => {
    setState((prev) => {
      const new_val = prev != max ? prev + 1 : max;
      next && next(new_val);
      return new_val;
    });
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
      if (endY >= 10) {
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
  }, []);
  return [state, setState];
};
