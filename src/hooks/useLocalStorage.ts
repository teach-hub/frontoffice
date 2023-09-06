import { useState } from 'react';

const useLocalStorage = (key: string, defaultValue?: unknown) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = window.localStorage.getItem(key);
      if (value) {
        return JSON.parse(value);
      } else {
        window.localStorage.setItem(key, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (err) {
      console.log('Failed parsing JSON value in local storage, returning default value');
      return defaultValue;
    }
  });

  const setValue = (newValue: string) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(newValue));
    } catch {
      console.log('Failed setting JSON value in local storage');
    }
    setStoredValue(newValue);
  };

  return [storedValue, setValue];
};

export const storeSetValue = (key: string, value: string) =>
  window.localStorage.setItem(key, value);
export const storeGetValue = (key: string) => window.localStorage.getItem(key);
export const storeRemoveValue = (key: string) => window.localStorage.removeItem(key);

export default useLocalStorage;
