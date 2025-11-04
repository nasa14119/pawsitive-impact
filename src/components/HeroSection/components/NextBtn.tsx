import Arrow from "@assets/Arrow.jsx";
import { useIndexStore } from "@components/HeroSection/store";
import type { HTMLAttributes } from "react";
import { tw } from "src/utils";
type Props = { className?: string };
function Btn({
  className,
  ...rest
}: Props & HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={tw(
        className,
        " size-10 text-white p-5 rounded-full bg-brand grid place-content-center z-10"
      )}
      {...rest}
    >
      <Arrow className="size-8" />
    </button>
  );
}
export function NextBtn({ className, ...rest }: Props) {
  const { next } = useIndexStore();
  return (
    <Btn
      className={tw("rotate-180", className)}
      onClick={() => {
        next();
      }}
      {...rest}
    />
  );
}
