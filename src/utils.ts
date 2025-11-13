import { twMerge } from "tailwind-merge";
import type { ClassValue } from "clsx";
import clsx from "clsx";
export const tw = (...styles: ClassValue[]) => twMerge(clsx(styles));
