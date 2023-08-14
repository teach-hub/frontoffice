import { DateTime } from 'luxon';

// Date format: ISO string
// myDate = new Date()
// formatted = formatAsSimpleDate(myDate.toISOString());
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
