import { useState } from "react";

export const useLocalStorage = (keyName, defaultValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = window.localStorage.getItem(keyName);
      if (!value) {
        window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
        return defaultValue;
      }
      const item = JSON.parse(value);
      const now = new Date();
      if (now.getTime() > item.expiry) {
        localStorage.removeItem(keyName);
        return defaultValue;
      }
      return JSON.parse(value);
    } catch (err) {
      return defaultValue;
    }
  });
  const setValue = (newValue, ttl) => {
    const item = newValue
      ? {
          value: newValue,
          expiry: new Date().getTime() + ttl,
        }
      : null;
    try {
      window.localStorage.setItem(keyName, JSON.stringify(item));
    } catch (err) {}
    setStoredValue(item);
  };

  return [storedValue, setValue];
};
