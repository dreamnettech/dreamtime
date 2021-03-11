const color = require('tinycolor2')

//
function lighten(col, amount = 5) {
  return color(col).lighten(amount).toString()
}

function darken(col, amount = 5) {
  return color(col).darken(amount).toString()
}

// Based on https://www.nordtheme.com/
const theme = {
  night: {
    light: '#4C566A', // UI elements like indent- and wrap guide marker
    default: '#434C5E', // selection- and text highlighting color
    dark: '#3B4252', // elevated, more prominent or focused UI elements
    darker: '#2E3440', // '#242933', // elements background
  },

  snow: {
    darker: darken('#D8DEE9', 20),
    dark: darken('#D8DEE9', 10),
    default: '#D8DEE9',
    light: '#E5E9F0',
    lighter: '#ECEFF4',
  },

  frost: {
    green: '#8FBCBB', // stand out and get more visual attention
    cyan: '#88C0D0', // primary UI elements with main usage purposes
    gray: '#81A1C1', // secondary UI elements that also require more visual attention than other elements
    blue: '#5E81AC', // tertiary UI elements that require more visual attention
  },

  aurora: {
    red: '#BF616A', // errors
    orange: '#D08770', // rarely used for UI elements
    yellow: '#EBCB8B', // warnings
    green: '#A3BE8C', // success
    pink: '#B48EAD', // rarely used for UI elements
  },
}

// See default config https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
module.exports = {
  theme: {
    screens: {
      xl: { max: '2000px' },
      lg: { max: '1800px' },
      md: { max: '1400px' },
      sm: { max: '1200px' },
    },
    extend: {
      // Tailwind v2
      spacing: {
        0.5: '0.125rem',
        1.5: '0.375rem',
        2.5: '0.625rem',
        3.5: '0.875rem',
        7: '1.75rem',
        9: '2.25rem',
        11: '2.75rem',
        14: '3.5rem',
        28: '7rem',
        36: '9rem',
        44: '11rem',
        52: '13rem',
        60: '15rem',
        72: '18rem',
        80: '20rem',
        96: '24rem',
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      fontFamily: {
        sans: [
          'Rubik',
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'system-ui',
          'Arial',
          'sans-serif',
        ],
        title: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'system-ui',
          'Arial',
          'sans-serif',
        ],
        serif: [
          'Georgia',
          'Cambria',
          '"Times New Roman"',
          'Times',
          'serif',
        ],
      },
      // https://javisperez.github.io/tailwindcolorshades/
      colors: {
        // Polar Night

        night: theme.night,

        background: darken(theme.night.darker),

        menus: {
          light: lighten(theme.night.darker, 3),
          default: theme.night.darker,
          dark: darken(theme.night.darker, 3),
        },

        input: {
          light: lighten(theme.night.dark),
          default: theme.night.dark,
          dark: darken(theme.night.dark),
        },

        button: {
          light: lighten(theme.night.dark),
          default: theme.night.dark,
          dark: darken(theme.night.dark),
        },

        // Snow Storm

        snow: theme.snow,

        // Frost

        frost: theme.frost,

        blue: {
          light: lighten(theme.frost.blue),
          default: theme.frost.blue,
          dark: darken(theme.frost.blue),
        },

        // Aurora

        aurora: theme.aurora,

        danger: {
          light: lighten(theme.aurora.red),
          default: theme.aurora.red,
          dark: darken(theme.aurora.red),
        },

        success: {
          light: lighten(theme.aurora.green),
          default: theme.aurora.green,
          dark: darken(theme.aurora.green),
        },

        warning: {
          light: lighten(theme.aurora.yellow),
          default: theme.aurora.yellow,
          dark: darken(theme.aurora.yellow),
        },

        //

        dark: {
          100: '#65676A',
          200: '#505255',
          300: '#3A3D40',
          400: '#25272B',
          500: '#0f1216',
          600: '#0E1014',
          700: '#0C0F12',
          800: '#0B0D10',
          900: '#0A0C0E',
        },

        navbar: {
          100: '#E6E6E7',
          200: '#C1C1C3',
          300: '#9B9C9E',
          400: '#515156',
          500: '#06070D',
          600: '#05060C',
          700: '#040408',
          800: '#030306',
          900: '#020204',
        },

        primary: {
          100: '#E5A667',
          200: '#E19A51',
          300: '#DD8D3C',
          400: '#DA8126',
          500: '#de9041',

          light: '#e29d57',
          default: '#de9041',
          dark: '#da832b',

          600: '#C36A0F',
          700: '#AF5F0E',
          800: '#9C550C',
          900: '#894A0B',
        },
      },

    },
  },
  variants: {},
  plugins: [
    require('tailwindcss-alpha')({
      modules: {
        borderColor: {
          process: true,
        },
      },
      alpha: {
        10: 0.1,
        20: 0.2,
        30: 0.3,
        40: 0.4,
        50: 0.5,
        60: 0.6,
        70: 0.7,
        80: 0.8,
        90: 0.9,
      },
    }),
  ],
  purge: {
    // https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
    content: [
      './components/**/*.{vue,js}',
      './layouts/**/*.vue',
      './pages/**/*.vue',
      './plugins/**/*.{js,ts}',
      './nuxt.config.{js,ts}',
    ],
  },
  corePlugins: {
    container: false,
  },
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
    defaultLineHeights: true,
    standardFontWeights: true,
  },
}
