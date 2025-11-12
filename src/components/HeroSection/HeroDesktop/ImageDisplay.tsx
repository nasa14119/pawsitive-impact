import { GalleryBtn } from "@components/HeroSection/components/GalleryBtn";
import styles from "./styles.module.css";
import { useCurrent } from "@components/HeroSection/hooks/useCurrent";
function ImgGallery({ src }: { src: string[] }) {
  return (
    <article className="size-full relative grid place-content-center md:max-w-[500px] mx-auto">
      <picture
        className={`md:h-[60dvh] md:w-[36dvw] max-w-[300px] h-[70dvh] aspect-9/16 block rounded-4xl overflow-hidden -z-30 ${styles["main-img-gallery"]}`}
      >
        <img src={src[0]} alt="" className="size-full object-cover" />
      </picture>
      {/* Images Around */}
      <picture
        className={`bg-amber-300 absolute left-5 md:left-2 w-40 aspect-9/16 top-2 rounded-4xl -rotate-12 md:-rotate-6 -z-50 overflow-hidden ${styles["left-img-gallery"]}`}
      >
        <img className="size-full object-cover" src={src[1]} alt="" />
      </picture>
      <picture
        className={`bg-amber-300 absolute right-5 md:right-0 w-40 aspect-9/16 bottom-0 rounded-4xl rotate-12 -z-40 overflow-hidden ${styles["right-img-gallery"]}`}
      >
        <img src={src[2]} className="object-cover size-full" alt="" />
      </picture>
    </article>
  );
}
function ImgMain({ content }: { content: string }) {
  return (
    <article className="size-full relative flex justify-center items-center max-w-[500px] max-h-full overflow-scroll mx-auto py-5">
      <picture
        className={`w-4/5 h-full rounded-4xl overflow-hidden ${styles["main-img"]}`}
      >
        <img src={content} alt="" className="size-full object-cover" />
      </picture>
    </article>
  );
}
export function ImageDisplay() {
  const [imgs] = useCurrent();
  return (
    <main
      className="size-full relative grid grid-rows-[1fr_10%] gap-y-2"
      key={imgs.title}
    >
      {Array.isArray(imgs.src) ? (
        <ImgGallery src={imgs.src} />
      ) : (
        <ImgMain content={imgs.src} />
      )}
      <div className="size-full grid place-content-center">
        <GalleryBtn date={imgs.fecha} className="mb-0" />
      </div>
    </main>
  );
}
