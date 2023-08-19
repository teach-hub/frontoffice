import { DateTime } from 'luxon';

/**
 * Formatea una fecha en formato ISO a un string con el formato:
 * dd-MM-yyyy | HH:mm 'HS'
 * Ejemplo: 01-01-2021 | 12:00 HS
 *
 * @param date String de fecha en formato ISO
 * @returns String de fecha formateada
 */
export const formatAsSimpleDateTime = (date: string): string => {
  return formatDateString(date, "dd-MM-yyyy | HH:mm 'HS'");
};

export const formatAsSimpleDate = (date: string): string => {
  return formatDateString(date, 'dd-MM-yyyy');
};

export const formatDateString = (date: string, format: string): string => {
  return DateTime.fromISO(date).toFormat(format);
};

export const formatDateAsLocaleIsoString = (date: string): string => {
  return DateTime.fromISO(date).toISO() ?? date;
};
