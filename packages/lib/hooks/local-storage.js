import {useState} from 'react'

export function useLocalStorage(key, initialValue) {
  // The initialValue arg is only used if there is nothing in localStorage ...
  // ... otherwise we use the value in localStorage so state persist through a page refresh.
  // We pass a function to useState so localStorage lookup only happens once.
  // We wrap in try/catch in case localStorage is unavailable
  const [item, setInnerValue] = useState(() => {
    try {
      return window.localStorage.getItem(key)
        ? JSON.parse(window.localStorage.getItem(key))
        : initialValue;
    } catch (error) {
      // Return default value if JSON parsing fails
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = value => {
    setInnerValue(value);
    window.localStorage.setItem(key, JSON.stringify(item));
  };

  // Alternatively we could update localStorage inside useEffect ...
  // ... but this would run every render and it really only needs ...
  // ... to happen when the returned setValue function is called.
  /*
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(item));
  });
  */

  return [item, setValue];
}

export default useLocalStorage