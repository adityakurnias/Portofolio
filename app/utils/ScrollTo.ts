import type Lenis from 'lenis';

export const scrollToSection = (e: MouseEvent, id: string) => {
  e.preventDefault(); 
  
  const lenis = window.lenis as Lenis | undefined;
  if (lenis && typeof lenis.scrollTo === 'function') {
    lenis.scrollTo(id, {
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  }
};