import clsx from "clsx";
import { twMerge } from "tailwind-merge";


export function Style (...classNames: (string | undefined | false | Record<string, boolean>)[]): string {
    
    return twMerge(clsx(...classNames))
}