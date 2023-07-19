export const removeAccentsAndSpecialCharacters = (input: string): string => {
  // Replace accents with their non-accented counterpart
  const normalizedString = input.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  // Remove special characters and spaces using a regular expression
  return normalizedString.replace(/[^\w]/gi, '');
};
