import { IconProps, OnboardingActivity, PlanItem } from "@/types";
import MusculationIcon from "@/components/icons/Musculation";
import YogaIcon from "@/components/icons/Yoga";
import PilatesIcon from "@/components/icons/Pilates";
import CrossfitIcon from "@/components/icons/Crossfit";
import BoxingIcon from "@/components/icons/Boxing";
import FunctionalIcon from "@/components/icons/Functional";
import DanceIcon from "@/components/icons/Dance";
import RunIcon from "@/components/icons/Run";

export const COMUNAS = [
  "Santiago",
  "Providencia",
  "Las Condes",
  "Ñuñoa",
  "Vitacura",
  "Maipú",
  "La Florida",
  "San Miguel",
  "Independencia",
  "Recoleta",
  "Estación Central",
  "Pudahuel",
  "Peñalolén",
  "Macul",
  "Viña del Mar",
  "Valparaíso",
  "Antofagasta",
  "Concepción",
  "Temuco",
  "Puerto Montt",
];

export const CENTRO_TIPOS = [
  "Gimnasio",
  "Studio de fitness",
  "Studio de yoga",
  "Studio de pilates",
  "Academia de artes marciales",
  "Centro de CrossFit",
  "Centro deportivo",
  "Otro",
];

export const ACTIVITIES: OnboardingActivity[] = [
  { id: "musculacion", label: "Musculación", Icon: MusculationIcon },
  { id: "yoga", label: "Yoga", Icon: YogaIcon },
  { id: "pilates", label: "Pilates", Icon: PilatesIcon },
  { id: "crossfit", label: "CrossFit", Icon: CrossfitIcon },
  { id: "boxeo", label: "Boxeo", Icon: BoxingIcon },
  { id: "funcional", label: "Funcional", Icon: FunctionalIcon },
  { id: "danza", label: "Danza", Icon: DanceIcon },
  { id: "otro", label: "Otro", Icon: RunIcon },
];

export const CAPACIDADES = [
  "1 – 50 alumnos",
  "51 – 100 alumnos",
  "101 – 200 alumnos",
  "201 – 500 alumnos",
  "Más de 500 alumnos",
];

export const PLANS: PlanItem[] = [
  {
    id: "go_pro",
    name: "Go Pro",
    features: [
      "Hasta 55 clientes",
      "Incluye app de reserva y software de administración/gestión",
      "Recibe pagos online de tus clientes a través de la app",
      "Notificaciones Push programables y correos automatizados editables",
      "Integración básica con Zoom o Google Meet y plataforma VOD (Máximo 10 videos)",
      "Soporte en línea (Lun a Vier de 09:30 a 18:30 hrs)",
    ],
    priceAnual: 30000,
    priceMensual: 36000,
  },
  {
    id: "business",
    name: "Business",
    features: [
      "Todo lo incluido en el plan Go Pro",
      "Hasta 150 clientes",
      "Acceso a próximas funcionalidades",
    ],
    priceAnual: 55000,
    priceMensual: 66000,
  },
  {
    id: "business_pro",
    name: "Business Pro",
    features: [
      "Todo lo incluido en el plan Business",
      "Hasta 300 clientes",
      "Soporte en línea 24/7",
    ],
    priceAnual: 80000,
    priceMensual: 96000,
  },
];
