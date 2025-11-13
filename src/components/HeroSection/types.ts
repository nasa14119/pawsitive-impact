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
export interface DataStore {
  current_index: number;
  data: ContentItem[];
  setData: (data: Partial<DataStore>) => void;
  setIndex: (new_index: number) => void;
}
