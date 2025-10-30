import { parse, format, isAfter } from "@formkit/tempo";
import { useRef } from "react";
import { tw } from "src/utils";
const DATE_FORMAT = "D/M/YY";
const date_future = (date: string | null): boolean => {
  if (!date) return false;
  const now = new Date();
  return isAfter(parse(date, DATE_FORMAT, "es"), now);
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
      <a href="#" className={className_ + " bg-accent text-white"}>
        Ver Imagenes
      </a>
    );
  const parse_str = parse(date, DATE_FORMAT);
  let day = format(parse_str, "dddd D", "es");
  let month = format(parse_str, "MMMM", "es");
  month = month[0].toUpperCase() + month.slice(1);
  return (
    <a
      className={
        className_ + " flex flex-col  bg-accent/20 pointer-events-none"
      }
    >
      <span className="first-letter:uppercase text-accent  text-lg">{`${day} de ${month}`}</span>
    </a>
  );
}
