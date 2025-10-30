import { parse, format, isAfter } from "@formkit/tempo";
import { useRef } from "react";
import { tw } from "src/utils";
const date_future = (date: string | null): boolean => {
  if (!date) return false;
  const now = new Date();
  return isAfter(parse(date, "DD/MM/YYYY", "es"), now);
};
type Props = {
  date?: string | null;
  className?: string;
};
let className_ = "text-center py-2 w-fit mx-auto px-5 rounded-4xl mb-2";
export function GalleryBtn({ date = null, className = "" }: Props) {
  className_ = tw(className_, className);
  const isFuture = useRef<boolean>(date_future(date));
  if (date === null || !isFuture.current)
    return (
      <span className={className_ + " bg-accent text-white"}>Ver Imagenes</span>
    );
  const parse_str = parse(date, "DD/MM/YYYY");
  let day = format(parse_str, "dddd, DD", "es");
  let month = format(parse_str, "MMMM", "es");
  return (
    <span className={className_ + " bg-accent/40 text-white/50  flex flex-col"}>
      <span className="">Proximo evento</span>
      <span className="italic first-letter:uppercase">{`${day} de ${month}`}</span>
    </span>
  );
}
