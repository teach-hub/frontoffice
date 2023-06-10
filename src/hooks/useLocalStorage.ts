import { useState } from 'react';

// TODO. Mover a default export

export const useLocalStorage = (keyName: string, defaultValue: object | null) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = window.localStorage.getItem(keyName);
      if (value) {
        return JSON.parse(value);
      } else {
        window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (err) {
      return defaultValue;
    }
  });

  const setValue = (newValue: string) => {
    try {
      window.localStorage.setItem(keyName, JSON.stringify(newValue));
      // eslint-disable-next-line no-empty
    } catch {}
    setStoredValue(newValue);
  };

  return [storedValue, setValue];
};
