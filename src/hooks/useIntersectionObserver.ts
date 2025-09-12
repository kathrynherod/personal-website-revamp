import { type RefObject,useEffect, useState } from "react";

export const useIntersectionObserver = (
  ref: RefObject<HTMLElement | null>,
  options: IntersectionObserverInit,
): boolean => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const currentRef = ref.current;

    // Pass the root element from options to the observer constructor
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    observer.observe(currentRef);

    return () => {
      observer.unobserve(currentRef);
    };
  }, [ref, options]);

  return isIntersecting;
};
