import { useEffect, useState } from "react";

const useDebounce = (value, delay) => {
  const [debaunceValue, debounce] = useState(value);

  useEffect(() => {
    const update = setInterval(() => {
      debounce(value);
    }, delay);

    return () => {
      clearInterval(update);
    };
  }, [value, delay]);

  return debaunceValue;
};

export default useDebounce;
