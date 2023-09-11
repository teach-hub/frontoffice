export const storeSetValue = (key: string, value: string) =>
  window.localStorage.setItem(key, value);

export const storeGetValue = (key: string) => window.localStorage.getItem(key);

export const storeRemoveValue = (key: string) => window.localStorage.removeItem(key);
