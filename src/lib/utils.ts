import { ExternalUrls, Image } from "@spotify/web-api-ts-sdk";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface albumType {
  id: string;
  name: string;
  images: Image[];
  release_date: string;
  external_urls: ExternalUrls;
}
