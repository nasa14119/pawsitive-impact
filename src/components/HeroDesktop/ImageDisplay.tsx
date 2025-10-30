import { GalleryBtn } from "@components/GalleryHome/components/GalleryBtn";
import styles from "./styles.module.css";
type Img = { src: string };
type ImagesProps = Img[];
type Props = { imgs: Img | Img[]; date?: string };
function ImgGallery({ content }: { content: ImagesProps }) {
  return (
    <article className="size-full relative grid place-content-center md:max-w-[500px] mx-auto">
      <picture
        className={`md:h-[60dvh] md:w-[36dvw] max-w-[300px] h-[70dvh] aspect-9/16 block rounded-4xl overflow-hidden -z-30 ${styles["main-img-gallery"]}`}
      >
        <img src={content[0].src} alt="" className="size-full object-cover" />
      </picture>
      {/* Images Around */}
      <picture
        className={`bg-amber-300 absolute left-5 md:left-2 w-40 aspect-9/16 top-2 rounded-4xl -rotate-12 md:-rotate-6 -z-50 overflow-hidden ${styles["left-img-gallery"]}`}
      >
        <img className="size-full object-cover" src={content[1].src} alt="" />
      </picture>
      <picture
        className={`bg-amber-300 absolute right-5 md:right-0 w-40 aspect-9/16 bottom-0 rounded-4xl rotate-12 -z-40 overflow-hidden ${styles["right-img-gallery"]}`}
      >
        <img src={content[2].src} className="object-cover size-full" alt="" />
      </picture>
    </article>
  );
}
function ImgMain({ content }: { content: Img }) {
  return (
    <article className="size-full relative flex justify-center items-center max-w-[500px] max-h-full overflow-scroll mx-auto py-5">
      <picture
        className={`w-4/5 h-full rounded-4xl overflow-hidden ${styles["main-img"]}`}
      >
        <img src={content.src} alt="" className="size-full object-cover" />
      </picture>
    </article>
  );
}
export function ImageDisplay({ date, imgs }: Props) {
  if (!date && !imgs) return null;
  return (
    <main className="size-full relative grid grid-rows-[1fr_10%] gap-y-2">
      {Array.isArray(imgs) ? (
        <ImgGallery content={imgs} />
      ) : (
        <ImgMain content={imgs} />
      )}
      <div className="size-full grid place-content-center">
        <GalleryBtn date={date} className="mb-0" />
      </div>
    </main>
  );
}
