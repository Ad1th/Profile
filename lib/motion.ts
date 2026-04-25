export const easings = {
  primary: [0.16, 1, 0.3, 1],
  snap: [0.34, 1.56, 0.64, 1],
};

export const stagger = {
  container: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
  item: {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        ease: easings.primary,
        duration: 0.8
      }
    },
  },
};
