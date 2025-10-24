import { parse, format } from "@formkit/tempo";

type Props = {
  date?: string | null;
};
const className = "text-center py-2 w-fit mx-auto px-5 rounded-4xl mb-2";
export function GalleryBtn({ date = null }: Props) {
  if (date === null)
    return <span className={className + " bg-red-800"}>Ver Imagenes</span>;
  const parse_str = parse(date, "DD/MM/YYYY");
  let day = format(parse_str, "dddd, DD", "es");
  let month = format(parse_str, "MMMM");
  return (
    <span
      className={
        className + " bg-red-800/40 text-white/50 italic flex flex-col"
      }
    >
      <span className="">Proximo evento</span>
      <span className="first-letter:uppercase">{`${day} de ${month}`}</span>
    </span>
  );
}
