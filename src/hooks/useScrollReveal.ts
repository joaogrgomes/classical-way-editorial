import { useEffect } from "react";

export const useScrollReveal = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
          }
        });
      },
      { threshold: 0.08 }
    );

    document.querySelectorAll(".reveal:not(.in)").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);
};
