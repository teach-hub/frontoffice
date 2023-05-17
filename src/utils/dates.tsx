import { DateTime } from 'luxon';

export const formatAsSimpleDateTime = (date: string): string => {
  return formatDateString(date, "yyyy-MM-dd | HH:mm 'HS'");
};

export const formatDateString = (date: string, format: string): string => {
  return DateTime.fromISO(date).toFormat(format);
};

export const formatDateAsLocaleIsoString = (date: string): string => {
  return DateTime.fromISO(date).toISO() ?? date;
};
