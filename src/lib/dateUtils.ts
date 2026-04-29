const MONTHS = [
  "ENE",
  "FEB",
  "MAR",
  "ABR",
  "MAY",
  "JUN",
  "JUL",
  "AGO",
  "SEP",
  "OCT",
  "NOV",
  "DIC",
];

const FULL_MONTHS = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

const DAYS = [
  "Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado",
];

export function formatDate(dateString: string) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = MONTHS[date.getMonth()];
  return { day, month };
}

export function formatScheduleDate(dateString: string) {
  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return `${DAYS[date.getDay()]} ${day} de ${FULL_MONTHS[month - 1]}`;
}

export function formatScheduleDateLong(dateString: string) {
  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return `${DAYS[date.getDay()]} ${day} de ${FULL_MONTHS[month - 1]} de ${year}`;
}
