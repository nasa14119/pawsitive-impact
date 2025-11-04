import { usePreloader } from "@components/HeroSection/hooks/usePreloader";
import { ImageDisplay } from "@components/HeroSection/HeroDesktop/ImageDisplay";
import { useIndexStore } from "@components/HeroSection/store";
import { useData } from "@components/HeroSection/hooks/useData";
const IMGS = [
  {
    src: "https://fastly.picsum.photos/id/319/1000/1200.webp?hmac=AhzQW7COlSft7sylIh1T_2JrwNTOgSmLG_kMML5khTE",
  },
  {
    src: "https://fastly.picsum.photos/id/58/1000/1200.webp?hmac=WoBhTEWdZuAoJDlTzLUdE1tiM7hIVh5xFiKzj2c6Dew",
  },
  {
    src: "https://fastly.picsum.photos/id/890/1000/1200.webp?hmac=km8U2KFVhAboPg02LjIm0XUpG8Gbe0uuSViyf8tqZUY",
  },
];
type Props = {};

export function HeroDesktop({}: Props) {
  usePreloader();
  const { index, next, prev } = useIndexStore();
  const data = useData();
  return (
    <section className="size-full p-2 grid md:grid-cols-[60%_1fr] lg:grid-cols-2 grid-rows-[100%] gap-2 max-w-screen overflow-scroll  group">
      <button className="absolute right-20" onClick={() => prev()}>
        prev
      </button>
      <button className="absolute right-5" onClick={() => next()}>
        next
      </button>
      <ImageDisplay key={index} imgs={data[index]} date="20/1/26" />
    </section>
  );
}
