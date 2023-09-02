export const isAllEmpty = (object: object): boolean =>
  Object.values(object).every(x => x === null || x === undefined || x === '');
