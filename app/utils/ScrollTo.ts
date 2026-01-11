export const scrollToSection = (e: MouseEvent, id: string) => {
  e.preventDefault(); 
  
  if (window.lenis) {
    window.lenis.scrollTo(id, {
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  }
};