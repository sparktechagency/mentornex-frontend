export const getImageUrl = (src: string) => {
      if (src?.startsWith('https://')) {
            return src;
      } else {
            return `${process.env.NEXT_PUBLIC_API_URL}${src}`;
      }
};
