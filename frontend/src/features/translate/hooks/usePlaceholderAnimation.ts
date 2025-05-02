import { useEffect, useState } from "react";

export const usePlaceholderAnimation = (
  placeholders: string[],
  interval = 3000,
  fadeDuration = 500
) => {
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setPlaceholderIndex(
          (prevIndex) => (prevIndex + 1) % placeholders.length
        );
        setFade(true);
      }, fadeDuration);
    }, interval);

    return () => clearInterval(intervalId);
  }, [placeholders, interval, fadeDuration]);

  return { placeholder: placeholders[placeholderIndex], fade };
};
