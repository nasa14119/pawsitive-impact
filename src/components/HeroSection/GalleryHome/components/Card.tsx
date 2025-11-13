import type {
  ContentItem,
  StateDirections,
} from "@components/HeroSection/types";
import styles from "../animations.module.css";
import { GalleryBtn } from "@components/HeroSection/components/GalleryBtn";
type Props = {
  direction: StateDirections;
  content: ContentItem;
  isHide?: boolean;
};
export function Card({ direction, isHide = false, content }: Props) {
  const state =
    direction === "idle"
      ? "fade"
      : !isHide
      ? "fade-" + direction
      : "out-" + direction;
  const src = Array.isArray(content.src) ? content.src[0] : content.src;
  return (
    <div
      key={content.title}
      className={`absolute inset-y-0 grid grid-rows-[1fr_auto] grid-cols-[1fr] ${styles[state]} px-5`}
    >
      <img
        className="bg-neutral-950/20 row-[1_/-1] col-[1/1] object-cover size-full rounded-2xl [user-drag:none] select-none"
        draggable="false"
        src={src}
        alt=""
      />
      <div className="flex flex-col col-[1/1] row-[2/2] rounded-b-2xl backdrop-blur-xs pt-4 bg-linear-to-t from-neutral-900 to-transparent text-white mask-t-from-90%">
        <div className="grid place-content-center col-[1/1] size-full rounded-t-4xl row-[2/2]">
          <h2 className="text-center">{content.title}</h2>
        </div>
        <p className="p-5 text-center text-xs ">{content.description}</p>
        <GalleryBtn date={content.fecha} className="mb-2" />
      </div>
    </div>
  );
}
