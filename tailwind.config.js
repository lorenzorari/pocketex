import colors from 'tailwindcss/colors';

const TYPES = [
  'bug',
  'dark',
  'dragon',
  'electric',
  'fairy',
  'fighting',
  'fire',
  'flying',
  'ghost',
  'grass',
  'ground',
  'ice',
  'normal',
  'poison',
  'psychic',
  'rock',
  'steel',
  'water',
];

/** @type {import('tailwindcss').Config} */
const config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        black: 'var(--color-black)',
        ...TYPES.reduce((acc, t) => {
          acc[t] = {
            1: `var(--color-${t}-1)`,
            2: `var(--color-${t}-2)`,
          };
          return acc;
        }, {}),
        evonode: {
          primary: colors.gray[100],
        },
      },
      keyframes: {
        levitate: {
          '0%, 100%': {
            transform: 'translateY(-6px)',
          },
          '50%': {
            transform: 'translateY(6px)',
          },
        },
        scaleUp: {
          '0%': {
            transform: 'scale(0)',
            opacity: '0',
          },
          '100%': {
            transform: 'scale(1)',
            opacity: '1',
          },
        },
        slideFromTop: {
          '0%': {
            transform: 'translateY(-100%)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: '1',
          },
        },
        fadeIn: {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(0)' },
          '25%': { transform: 'rotate(-10deg)' },
          '50%': { transform: 'rotate(10deg)' },
        },
      },
      spacing: {
        'evochain-col': 'var(--gap-evochain-col)',
        'evochain-col-mobile': 'var(--gap-evochain-col-mobile)',
        'evochain-row': 'var(--gap-evochain-row)',
        'evoconnector-thickness': 'var(--evoconnector-thickness)',
      },
      animation: {
        levitate: 'levitate 4s ease-in-out infinite',
        scaleUp: 'scaleUp 0.5s forwards',
        slideFromTop: 'slideFromTop 0.5s forwards',
        fadeIn: 'fadeIn 0.5s forwards',
        wiggle: 'wiggle .3s ease-in-out forwards',
      },
      screens: {
        '3xl': '1792px',
      },
    },
  },
  plugins: [],
};

export default config;