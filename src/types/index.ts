import * as React from "react";

export interface IconProps {
  width?: string | number;
  height?: string | number;
  className?: string;
}

export type CategoryItem = {
  id: number;
  name: string;
  description: string;
  icon: React.ComponentType<IconProps>;
};

export type ClassItem = {
  id: number;
  name: string;
  description: string;
  image: string;
  tags: string[];
  category: string;
  date: string;
  duration: number;
  commune: string;
  price: number;
  availableSpots: number;
  sportCentar: string;
  specialTags?: string[];
};
