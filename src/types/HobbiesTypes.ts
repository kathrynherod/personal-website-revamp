import type { ReactNode } from "react";

export type Photo = {
  caption: string;
  src: string;
};

export type Hobby = {
  description: string[];
  icon: ReactNode;
  photos?: Photo[];
  title: string;
};