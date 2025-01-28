export const getImageUrl = (src: string) => {
      if (src.startsWith('https://')) {
            return src;
      } else {
            return `http://localhost:3000${src}`;
      }
};
