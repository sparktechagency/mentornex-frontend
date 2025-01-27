import type { Config } from 'tailwindcss';

const config: Config = {
      content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
      theme: {
            extend: {
                  colors: {
                        primary: {
                              DEFAULT: '#FF6F3C',
                              100: '#FFF1EC',
                              200: '#FFD2C3',
                              300: '#FFBDA5',
                              400: '#FF8C63',
                              500: '#FF6F3C',
                              600: '#E86537',
                              700: '#B54F2B',
                              800: '#8C3D21',
                              900: '#6B2F19',
                        },

                        title: '#333333',
                        paragraph: '#66789C',
                        subtitle: '#5C5C5C',
                  },
                  container: {
                        center: true,
                        padding: '1rem',
                        screens: {
                              sm: '640px',
                              md: '768px',
                              lg: '1024px',
                              xl: '1280px',
                              '2xl': '1440px',
                        },
                  },
            },
      },
      plugins: [],
};
export default config;
