import { GalleryBtn } from "@components/GalleryHome/components/GalleryBtn";

type Props = {};
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
type ImagesProps = { src: string }[];
function ImgGallery({ content }: { content: ImagesProps }) {
  return (
    <article className="size-full relative grid place-content-center max-w-[500px] mx-auto">
      <picture className="bg-amber-300 absolute left-2 w-40 aspect-9/16 top-2 rounded-4xl -rotate-6 -z-50 overflow-hidden">
        <img className="size-full object-cover" src={content[0].src} alt="" />
      </picture>
      <picture className="bg-amber-300 absolute right-0 w-40 aspect-9/16 bottom-0 rounded-4xl rotate-12 -z-40 overflow-hidden">
        <img src={content[1].src} className="object-cover size-full" alt="" />
      </picture>
      <picture className="w-[36dvw] max-w-[300px] h-[50dvh] block bg-accent rounded-4xl overflow-hidden -z-30">
        <img src={content[2].src} alt="" className="size-full object-cover" />
      </picture>
    </article>
  );
}
export function ImageDisplay({}: Props) {
  return (
    <main className="size-full relative grid grid-rows-[1fr_10%] gap-y-2">
      <ImgGallery content={IMGS} />
      <div className="size-full grid place-content-center">
        <GalleryBtn date={"20/10/2025"} className="mb-0" />
      </div>
    </main>
  );
}
