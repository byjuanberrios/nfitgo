import BoxingIcon from "@/components/icons/Boxing";
import CrossfitIcon from "@/components/icons/Crossfit";
import DanceIcon from "@/components/icons/Dance";
import FunctionalIcon from "@/components/icons/Functional";
import MusculationIcon from "@/components/icons/Musculation";
import PilatesIcon from "@/components/icons/Pilates";
import RunIcon from "@/components/icons/Run";
import YogaIcon from "@/components/icons/Yoga";
import { CategoryItem } from "@/types";

export const categories: CategoryItem[] = [
  {
    id: 1,
    name: "Boxeo",
    description:
      "Entrenamiento de boxeo para mejorar la resistencia, fuerza y técnica",
    icon: BoxingIcon,
  },
  {
    id: 2,
    name: "CrossFit",
    description:
      "Movimientos cotidianos para preparar el cuerpo para las actividades diarias y deportivas",
    icon: CrossfitIcon,
  },
  {
    id: 3,
    name: "Dance",
    description:
      "Clases de baile para mejorar la coordinación, ritmo y expresión corporal",
    icon: DanceIcon,
  },
  {
    id: 4,
    name: "Funcional",
    description:
      "Ejercicios de entrenamiento funcional para mejorar la fuerza y movilidad general",
    icon: FunctionalIcon,
  },
  {
    id: 5,
    name: "Musculación",
    description:
      "Entrenamiento de musculación para aumentar la masa muscular y fuerza",
    icon: MusculationIcon,
  },
  {
    id: 6,
    name: "Pilates",
    description:
      "Ejercicios de pilates para fortalecer el core y mejorar la postura",
    icon: PilatesIcon,
  },
  {
    id: 7,
    name: "Running",
    description:
      "Clases de running para mejorar la técnica, velocidad y resistencia en la carrera",
    icon: RunIcon,
  },
  {
    id: 8,
    name: "Yoga",
    description:
      "Práctica de yoga para mejorar la flexibilidad, equilibrio y bienestar mental",
    icon: YogaIcon,
  },
];
