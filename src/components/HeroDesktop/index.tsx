import { usePreloader } from "@components/GalleryHome/hooks/usePreloader";
import { ImageDisplay } from "@components/HeroDesktop/ImageDisplay";

type Props = {};

export function HeroDesktop({}: Props) {
  usePreloader();
  return (
    <section className="size-full p-2 grid md:grid-cols-[60%_1fr] lg:grid-cols-2 grid-rows-[100%] gap-2 max-w-screen overflow-scroll  ">
      <ImageDisplay />
    </section>
  );
}
