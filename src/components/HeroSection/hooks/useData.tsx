import { useRef } from "react";
import data from "../data.json";
export const useData = () => {
  const something = useRef(data);
  return something.current;
};
