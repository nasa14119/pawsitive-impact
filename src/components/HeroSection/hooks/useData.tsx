import { useEffect, useRef } from "react";
import type { ContentItem } from "../types.ts";
import data from "../data.json";
import { usePreloader } from "@components/HeroSection/hooks/usePreloader";
import { useDataStore } from "@components/HeroSection/store";
class DataProvider {
  static #instance: DataProvider;
  public data_fetch: ContentItem[] | null;
  public index = 3;
  private constructor() {
    this.data_fetch = null;
  }
  public static get instance(): DataProvider {
    if (!DataProvider.#instance) {
      DataProvider.#instance = new DataProvider();
    }
    return DataProvider.#instance;
  }
  public init(): void {
    this.data_fetch = data;
    useDataStore
      .getState()
      .setData({ data: this.data_fetch, current_index: this.index });
  }
}
export const useData = () => {
  const state = useDataStore();
  const data = useRef(DataProvider.instance);
  useEffect(() => {
    data.current.init();
  }, []);
  useEffect(() => {
    if (data.current.data_fetch === null) return;
    state.setData({ data: data.current.data_fetch });
  }, [data.current.data_fetch]);
  usePreloader(data.current.data_fetch);
  return state.data;
};
