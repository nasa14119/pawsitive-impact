import Arrow from "@assets/Arrow.jsx";
import { useNextFn, usePrevFn } from "@components/HeroSection/store";
import { useRef, type HTMLAttributes, type MouseEventHandler } from "react";
import { tw } from "src/utils";
type Props = { className?: string } & HTMLAttributes<HTMLButtonElement>;
function Btn({
  className,
  onClick,
  ...rest
}: Props & HTMLAttributes<HTMLButtonElement>) {
  const btn = useRef<HTMLButtonElement>(null);
  return (
    <button
      ref={btn}
      onClick={(e) => {
        setTimeout(() => {
          btn.current?.blur();
        }, 100);
        onClick && onClick(e);
      }}
      className={tw(
        "size-10 text-white p-5 rounded-full bg-brand grid place-content-center z-10 focus:outline-2 focus:outline-brand/80 transition-all duration-200 ease-linear",
        className
      )}
      {...rest}
    >
      <Arrow className="size-8" />
    </button>
  );
}
export function NextBtn({ className, onClick, ...rest }: Props) {
  const next = useNextFn();
  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    onClick && onClick(e);
    next();
  };
  return (
    <Btn
      className={tw("rotate-180", className)}
      onClick={handleClick}
      {...rest}
    />
  );
}
export function PrevBtn({ className, onClick, ...rest }: Props) {
  const prev = usePrevFn();
  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    onClick && onClick(e);
    prev();
  };
  return <Btn className={tw("", className)} onClick={handleClick} {...rest} />;
}
