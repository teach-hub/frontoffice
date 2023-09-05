import { useState } from 'react';

const useLocalStorage = (keyName: string, defaultValue: object | null) => {
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
      console.log('Failed parsing JSON value in local storage, returning default value');
      return defaultValue;
    }
  });

  const setValue = (newValue: string) => {
    try {
      window.localStorage.setItem(keyName, JSON.stringify(newValue));
    } catch {
      console.log('Failed setting JSON value in local storage');
    }
    setStoredValue(newValue);
  };

  return [storedValue, setValue];
};

export default useLocalStorage;
