import { useEffect, useEffectEvent } from "react";

type Props = {
  callback: (isDesktop: boolean) => void;
};

export const usePhoneOnly = (callback: Props["callback"]): void => {
  const onResize = useEffectEvent(callback);
  useEffect(() => {
    const handler = (e: Event) => {
      const window_size = window.innerWidth;
      onResize(window_size >= 640);
    };
    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("resize", handler);
    };
  }, []);
  return;
};
