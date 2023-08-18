import { Optional } from 'types';

export const getValueOfNextIndex = <T,>(array: T[], currentValue: T): Optional<T> => {
  const index = array.indexOf(currentValue);
  return index >= 0 && index < array.length - 1 ? array[index + 1] : undefined;
};

export const getValueOfPreviousIndex = <T,>(array: T[], currentValue: T): Optional<T> => {
  const index = array.indexOf(currentValue);
  return index > 0 ? array[index - 1] : undefined;
};
