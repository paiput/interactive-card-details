/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        bgMainMobile: 'url("/assets/images/bg-main-mobile.png")',
        bgMainDesktop: 'url("/assets/images/bg-main-desktop.png")',
      },
      colors: {
        lightGrayishViolet: 'var(--light-grayish-violet)',
        darkGrayishViolet: 'var(--dark-grayish-violet)',
        darkViolet: 'var(--very-dark-violet)',
      },
      fontFamily: {
        spaceGrotesk: 'var(--font-primary)',
      },
    },
  },
  plugins: [],
}
