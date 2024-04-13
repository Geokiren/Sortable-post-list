/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#F6F6F6',
        secondary: '#6357B1',
        'post-title': '#E8E7F3',
        'text-primary': '#808080',
        'action-title': '#747474',
        'primary-button': '#25FF90',
        'primary-button-text': '#416554'
      }
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1.5rem',
        sm: '3rem'
      }
    },
    screens: {
      sm: '640px',
      md: '768px',
      '2md': '900px',
      lg: '1024px',
      '2lg': '1152px',
      xl: '1280px',
      '2xl': '1366px',
      '3xl': '1536px',
      '4xl': '1920px',
      '5xl': '2560px'
    }
  },
  plugins: []
};
