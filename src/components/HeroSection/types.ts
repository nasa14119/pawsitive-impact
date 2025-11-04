export type StateDirections = "idle" | "left" | "right";
export type ContentItem = {
  title: number;
  description: string;
  fecha?: string;
  src: string | string[];
};
export interface Content {
  i: number;
  data: ContentItem[];
  max: number;
}
type HandleChange = (prev: number) => void;
export interface Store {
  index: number;
  max: number;
  next: (onChange?: HandleChange) => void;
  prev: (onChange?: HandleChange) => void;
}
