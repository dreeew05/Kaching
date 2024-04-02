const defaultTheme = require('tailwindcss/defaultTheme');
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1440px',
      },

      /** color pallete **/
      colors: {
        transparent: 'transparent',
        green: '#18573A',
        white: '#FFFFFF',
        yellow: '#FFAD42',
        black: '#000000',
        gray: '#A3A3A3',
        darkblue: '#1E2432',
        darkgreen: '#2D3934',
      },

      button: {
        defaultProps: {
          variant: 'filled',
          size: 'md',
          color: 'blue',
          fullWidth: false,
          ripple: true,
          className: '',
        },
        valid: {
          variants: ['filled', 'outlined', 'gradient', 'text'],
          sizes: ['sm', 'md', 'lg'],
          colors: [
            'white',
            'blue-gray',
            'gray',
            'brown',
            'deep-orange',
            'orange',
            'amber',
            'yellow',
            'lime',
            'light-green',
            'green',
            'teal',
            'cyan',
            'light-blue',
            'blue',
            'indigo',
            'deep-purple',
            'purple',
            'pink',
            'red',
          ],
        },
        styles: {
          base: {
            initial: {
              verticalAlign: 'align-middle',
              userSelect: 'select-none',
              fontFamily: 'font-sans',
              fontWeight: 'font-bold',
              textAlign: 'text-center',
              textTransform: 'uppercase',
              transition: 'transition-all',
              disabled:
                'disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none',
            },
            fullWidth: {
              display: 'block',
              width: 'w-full',
            },
          },
          sizes: {
            sm: {
              fontSize: 'text-xs',
              py: 'py-2',
              px: 'px-4',
              borderRadius: 'rounded-lg',
            },
            md: {
              fontSize: 'text-xs',
              py: 'py-3',
              px: 'px-6',
              borderRadius: 'rounded-lg',
            },
            lg: {
              fontSize: 'text-sm',
              py: 'py-3.5',
              px: 'px-7',
              borderRadius: 'rounded-lg',
            },
          },
          variants: {
            filled: {
              white: {
                backgroud: 'bg-white',
                color: 'text-blue-gray-900',
                shadow: 'shadow-md shadow-blue-gray-500/10',
                hover:
                  'hover:shadow-lg hover:shadow-blue-gray-500/20',
                focus: 'focus:opacity-[0.85] focus:shadow-none',
                active: 'active:opacity-[0.85] active:shadow-none',
              },
              'blue-gray': {
                backgroud: 'bg-blue-gray-500',
                color: 'text-white',
                shadow: 'shadow-md shadow-blue-gray-500/20',
                hover:
                  'hover:shadow-lg hover:shadow-blue-gray-500/40',
                focus: 'focus:opacity-[0.85] focus:shadow-none',
                active: 'active:opacity-[0.85] active:shadow-none',
              },
              gray: {
                backgroud: 'bg-gray-500',
                color: 'text-white',
                shadow: 'shadow-md shadow-gray-500/20',
                hover: 'hover:shadow-lg hover:shadow-gray-500/40',
                focus: 'focus:opacity-[0.85] focus:shadow-none',
                active: 'active:opacity-[0.85] active:shadow-none',
              },
              brown: {
                backgroud: 'bg-brown-500',
                color: 'text-white',
                shadow: 'shadow-md shadow-brown-500/20',
                hover: 'hover:shadow-lg hover:shadow-brown-500/40',
                focus: 'focus:opacity-[0.85] focus:shadow-none',
                active: 'active:opacity-[0.85] active:shadow-none',
              },
              'deep-orange': {
                backgroud: 'bg-deep-orange-500',
                color: 'text-white',
                shadow: 'shadow-md shadow-deep-orange-500/20',
                hover:
                  'hover:shadow-lg hover:shadow-deep-orange-500/40',
                focus: 'focus:opacity-[0.85] focus:shadow-none',
                active: 'active:opacity-[0.85] active:shadow-none',
              },
              orange: {
                backgroud: 'bg-orange-500',
                color: 'text-white',
                shadow: 'shadow-md shadow-orange-500/20',
                hover: 'hover:shadow-lg hover:shadow-orange-500/40',
                focus: 'focus:opacity-[0.85] focus:shadow-none',
                active: 'active:opacity-[0.85] active:shadow-none',
              },
              amber: {
                backgroud: 'bg-amber-500',
                color: 'text-black',
                shadow: 'shadow-md shadow-amber-500/20',
                hover: 'hover:shadow-lg hover:shadow-amber-500/40',
                focus: 'focus:opacity-[0.85] focus:shadow-none',
                active: 'active:opacity-[0.85] active:shadow-none',
              },
              yellow: {
                backgroud: 'bg-yellow-500',
                color: 'text-black',
                shadow: 'shadow-md shadow-yellow-500/20',
                hover: 'hover:shadow-lg hover:shadow-yellow-500/40',
                focus: 'focus:opacity-[0.85] focus:shadow-none',
                active: 'active:opacity-[0.85] active:shadow-none',
              },
              lime: {
                backgroud: 'bg-lime-500',
                color: 'text-black',
                shadow: 'shadow-md shadow-lime-500/20',
                hover: 'hover:shadow-lg hover:shadow-lime-500/40',
                focus: 'focus:opacity-[0.85] focus:shadow-none',
                active: 'active:opacity-[0.85] active:shadow-none',
              },
              'light-green': {
                backgroud: 'bg-light-green-500',
                color: 'text-white',
                shadow: 'shadow-md shadow-light-green-500/20',
                hover:
                  'hover:shadow-lg hover:shadow-light-green-500/40',
                focus: 'focus:opacity-[0.85] focus:shadow-none',
                active: 'active:opacity-[0.85] active:shadow-none',
              },
              green: {
                backgroud: 'bg-green-500',
                color: 'text-white',
                shadow: 'shadow-md shadow-green-500/20',
                hover: 'hover:shadow-lg hover:shadow-green-500/40',
                focus: 'focus:opacity-[0.85] focus:shadow-none',
                active: 'active:opacity-[0.85] active:shadow-none',
              },
              teal: {
                backgroud: 'bg-teal-500',
                color: 'text-white',
                shadow: 'shadow-md shadow-teal-500/20',
                hover: 'hover:shadow-lg hover:shadow-teal-500/40',
                focus: 'focus:opacity-[0.85] focus:shadow-none',
                active: 'active:opacity-[0.85] active:shadow-none',
              },
              cyan: {
                backgroud: 'bg-cyan-500',
                color: 'text-white',
                shadow: 'shadow-md shadow-cyan-500/20',
                hover: 'hover:shadow-lg hover:shadow-cyan-500/40',
                focus: 'focus:opacity-[0.85] focus:shadow-none',
                active: 'active:opacity-[0.85] active:shadow-none',
              },
              'light-blue': {
                backgroud: 'bg-light-blue-500',
                color: 'text-white',
                shadow: 'shadow-md shadow-light-blue-500/20',
                hover:
                  'hover:shadow-lg hover:shadow-light-blue-500/40',
                focus: 'focus:opacity-[0.85] focus:shadow-none',
                active: 'active:opacity-[0.85] active:shadow-none',
              },
              blue: {
                backgroud: 'bg-blue-500',
                color: 'text-white',
                shadow: 'shadow-md shadow-blue-500/20',
                hover: 'hover:shadow-lg hover:shadow-blue-500/40',
                focus: 'focus:opacity-[0.85] focus:shadow-none',
                active: 'active:opacity-[0.85] active:shadow-none',
              },
              indigo: {
                backgroud: 'bg-indigo-500',
                color: 'text-white',
                shadow: 'shadow-md shadow-indigo-500/20',
                hover: 'hover:shadow-lg hover:shadow-indigo-500/40',
                focus: 'focus:opacity-[0.85] focus:shadow-none',
                active: 'active:opacity-[0.85] active:shadow-none',
              },
              'deep-purple': {
                backgroud: 'bg-deep-purple-500',
                color: 'text-white',
                shadow: 'shadow-md shadow-deep-purple-500/20',
                hover:
                  'hover:shadow-lg hover:shadow-deep-purple-500/40',
                focus: 'focus:opacity-[0.85] focus:shadow-none',
                active: 'active:opacity-[0.85] active:shadow-none',
              },
              purple: {
                backgroud: 'bg-purple-500',
                color: 'text-white',
                shadow: 'shadow-md shadow-purple-500/20',
                hover: 'hover:shadow-lg hover:shadow-purple-500/40',
                focus: 'focus:opacity-[0.85] focus:shadow-none',
                active: 'active:opacity-[0.85] active:shadow-none',
              },
              pink: {
                backgroud: 'bg-pink-500',
                color: 'text-white',
                shadow: 'shadow-md shadow-pink-500/20',
                hover: 'hover:shadow-lg hover:shadow-pink-500/40',
                focus: 'focus:opacity-[0.85] focus:shadow-none',
                active: 'active:opacity-[0.85] active:shadow-none',
              },
              red: {
                backgroud: 'bg-red-500',
                color: 'text-white',
                shadow: 'shadow-md shadow-red-500/20',
                hover: 'hover:shadow-lg hover:shadow-red-500/40',
                focus: 'focus:opacity-[0.85] focus:shadow-none',
                active: 'active:opacity-[0.85] active:shadow-none',
              },
            },
            gradient: {
              white: {
                backgroud: 'bg-white',
                color: 'text-blue-gray-900',
                shadow: 'shadow-md shadow-blue-gray-500/10',
                hover:
                  'hover:shadow-lg hover:shadow-blue-gray-500/20',
                focus: 'focus:opacity-[0.85] focus:shadow-none',
                active: 'active:opacity-[0.85] active:shadow-none',
              },
              'blue-gray': {
                backgroud:
                  'bg-gradient-to-tr from-blue-gray-600 to-blue-gray-400',
                color: 'text-white',
                shadow: 'shadow-md shadow-blue-gray-500/20',
                hover:
                  'hover:shadow-lg hover:shadow-blue-gray-500/40',
                active: 'active:opacity-[0.85]',
              },
              gray: {
                backgroud:
                  'bg-gradient-to-tr from-gray-600 to-gray-400',
                color: 'text-white',
                shadow: 'shadow-md shadow-gray-500/20',
                hover: 'hover:shadow-lg hover:shadow-gray-500/40',
                active: 'active:opacity-[0.85]',
              },
              brown: {
                backgroud:
                  'bg-gradient-to-tr from-brown-600 to-brown-400',
                color: 'text-white',
                shadow: 'shadow-md shadow-brown-500/20',
                hover: 'hover:shadow-lg hover:shadow-brown-500/40',
                active: 'active:opacity-[0.85]',
              },
              'deep-orange': {
                backgroud:
                  'bg-gradient-to-tr from-deep-orange-600 to-deep-orange-400',
                color: 'text-white',
                shadow: 'shadow-md shadow-deep-orange-500/20',
                hover:
                  'hover:shadow-lg hover:shadow-deep-orange-500/40',
                active: 'active:opacity-[0.85]',
              },
              orange: {
                backgroud:
                  'bg-gradient-to-tr from-orange-600 to-orange-400',
                color: 'text-white',
                shadow: 'shadow-md shadow-orange-500/20',
                hover: 'hover:shadow-lg hover:shadow-orange-500/40',
                active: 'active:opacity-[0.85]',
              },
              amber: {
                backgroud:
                  'bg-gradient-to-tr from-amber-600 to-amber-400',
                color: 'text-black',
                shadow: 'shadow-md shadow-amber-500/20',
                hover: 'hover:shadow-lg hover:shadow-amber-500/40',
                active: 'active:opacity-[0.85]',
              },
              yellow: {
                backgroud:
                  'bg-gradient-to-tr from-yellow-600 to-yellow-400',
                color: 'text-black',
                shadow: 'shadow-md shadow-yellow-500/20',
                hover: 'hover:shadow-lg hover:shadow-yellow-500/40',
                active: 'active:opacity-[0.85]',
              },
              lime: {
                backgroud:
                  'bg-gradient-to-tr from-lime-600 to-lime-400',
                color: 'text-black',
                shadow: 'shadow-md shadow-lime-500/20',
                hover: 'hover:shadow-lg hover:shadow-lime-500/40',
                active: 'active:opacity-[0.85]',
              },
              'light-green': {
                backgroud:
                  'bg-gradient-to-tr from-light-green-600 to-light-green-400',
                color: 'text-white',
                shadow: 'shadow-md shadow-light-green-500/20',
                hover:
                  'hover:shadow-lg hover:shadow-light-green-500/40',
                active: 'active:opacity-[0.85]',
              },
              green: {
                backgroud:
                  'bg-gradient-to-tr from-green-600 to-green-400',
                color: 'text-white',
                shadow: 'shadow-md shadow-green-500/20',
                hover: 'hover:shadow-lg hover:shadow-green-500/40',
                active: 'active:opacity-[0.85]',
              },
              teal: {
                backgroud:
                  'bg-gradient-to-tr from-teal-600 to-teal-400',
                color: 'text-white',
                shadow: 'shadow-md shadow-teal-500/20',
                hover: 'hover:shadow-lg hover:shadow-teal-500/40',
                active: 'active:opacity-[0.85]',
              },
              cyan: {
                backgroud:
                  'bg-gradient-to-tr from-cyan-600 to-cyan-400',
                color: 'text-white',
                shadow: 'shadow-md shadow-cyan-500/20',
                hover: 'hover:shadow-lg hover:shadow-cyan-500/40',
                active: 'active:opacity-[0.85]',
              },
              'light-blue': {
                backgroud:
                  'bg-gradient-to-tr from-light-blue-600 to-light-blue-400',
                color: 'text-white',
                shadow: 'shadow-md shadow-light-blue-500/20',
                hover:
                  'hover:shadow-lg hover:shadow-light-blue-500/40',
                active: 'active:opacity-[0.85]',
              },
              blue: {
                backgroud:
                  'bg-gradient-to-tr from-blue-600 to-blue-400',
                color: 'text-white',
                shadow: 'shadow-md shadow-blue-500/20',
                hover: 'hover:shadow-lg hover:shadow-blue-500/40',
                active: 'active:opacity-[0.85]',
              },
              indigo: {
                backgroud:
                  'bg-gradient-to-tr from-indigo-600 to-indigo-400',
                color: 'text-white',
                shadow: 'shadow-md shadow-indigo-500/20',
                hover: 'hover:shadow-lg hover:shadow-indigo-500/40',
                active: 'active:opacity-[0.85]',
              },
              'deep-purple': {
                backgroud:
                  'bg-gradient-to-tr from-deep-purple-600 to-deep-purple-400',
                color: 'text-white',
                shadow: 'shadow-md shadow-deep-purple-500/20',
                hover:
                  'hover:shadow-lg hover:shadow-deep-purple-500/40',
                active: 'active:opacity-[0.85]',
              },
              purple: {
                backgroud:
                  'bg-gradient-to-tr from-purple-600 to-purple-400',
                color: 'text-white',
                shadow: 'shadow-md shadow-purple-500/20',
                hover: 'hover:shadow-lg hover:shadow-purple-500/40',
                active: 'active:opacity-[0.85]',
              },
              pink: {
                backgroud:
                  'bg-gradient-to-tr from-pink-600 to-pink-400',
                color: 'text-white',
                shadow: 'shadow-md shadow-pink-500/20',
                hover: 'hover:shadow-lg hover:shadow-pink-500/40',
                active: 'active:opacity-[0.85]',
              },
              red: {
                backgroud:
                  'bg-gradient-to-tr from-red-600 to-red-400',
                color: 'text-white',
                shadow: 'shadow-md shadow-red-500/20',
                hover: 'hover:shadow-lg hover:shadow-red-500/40',
                active: 'active:opacity-[0.85]',
              },
            },
            outlined: {
              white: {
                border: 'border border-white',
                color: 'text-white',
                hover: 'hover:opacity-75',
                focus: 'focus:ring focus:ring-white/50',
                active: 'active:opacity-[0.85]',
              },
              'blue-gray': {
                border: 'border border-blue-gray-500',
                color: 'text-blue-gray-500',
                hover: 'hover:opacity-75',
                focus: 'focus:ring focus:ring-blue-gray-200',
                active: 'active:opacity-[0.85]',
              },
              gray: {
                border: 'border border-gray-500',
                color: 'text-gray-500',
                hover: 'hover:opacity-75',
                focus: 'focus:ring focus:ring-gray-200',
                active: 'active:opacity-[0.85]',
              },
              brown: {
                border: 'border border-brown-500',
                color: 'text-brown-500',
                hover: 'hover:opacity-75',
                focus: 'focus:ring focus:ring-brown-200',
                active: 'active:opacity-[0.85]',
              },
              'deep-orange': {
                border: 'border border-deep-orange-500',
                color: 'text-deep-orange-500',
                hover: 'hover:opacity-75',
                focus: 'focus:ring focus:ring-deep-orange-200',
                active: 'active:opacity-[0.85]',
              },
              orange: {
                border: 'border border-orange-500',
                color: 'text-orange-500',
                hover: 'hover:opacity-75',
                focus: 'focus:ring focus:ring-orange-200',
                active: 'active:opacity-[0.85]',
              },
              amber: {
                border: 'border border-amber-500',
                color: 'text-amber-500',
                hover: 'hover:opacity-75',
                focus: 'focus:ring focus:ring-amber-200',
                active: 'active:opacity-[0.85]',
              },
              yellow: {
                border: 'border border-yellow-500',
                color: 'text-yellow-500',
                hover: 'hover:opacity-75',
                focus: 'focus:ring focus:ring-yellow-200',
                active: 'active:opacity-[0.85]',
              },
              lime: {
                border: 'border border-lime-500',
                color: 'text-lime-500',
                hover: 'hover:opacity-75',
                focus: 'focus:ring focus:ring-lime-200',
                active: 'active:opacity-[0.85]',
              },
              'light-green': {
                border: 'border border-light-green-500',
                color: 'text-light-green-500',
                hover: 'hover:opacity-75',
                focus: 'focus:ring focus:ring-light-green-200',
                active: 'active:opacity-[0.85]',
              },
              green: {
                border: 'border border-green-500',
                color: 'text-green-500',
                hover: 'hover:opacity-75',
                focus: 'focus:ring focus:ring-green-200',
                active: 'active:opacity-[0.85]',
              },
              teal: {
                border: 'border border-teal-500',
                color: 'text-teal-500',
                hover: 'hover:opacity-75',
                focus: 'focus:ring focus:ring-teal-200',
                active: 'active:opacity-[0.85]',
              },
              cyan: {
                border: 'border border-cyan-500',
                color: 'text-cyan-500',
                hover: 'hover:opacity-75',
                focus: 'focus:ring focus:ring-cyan-200',
                active: 'active:opacity-[0.85]',
              },
              'light-blue': {
                border: 'border border-light-blue-500',
                color: 'text-light-blue-500',
                hover: 'hover:opacity-75',
                focus: 'focus:ring focus:ring-light-blue-200',
                active: 'active:opacity-[0.85]',
              },
              blue: {
                border: 'border border-blue-500',
                color: 'text-blue-500',
                hover: 'hover:opacity-75',
                focus: 'focus:ring focus:ring-blue-200',
                active: 'active:opacity-[0.85]',
              },
              indigo: {
                border: 'border border-indigo-500',
                color: 'text-indigo-500',
                hover: 'hover:opacity-75',
                focus: 'focus:ring focus:ring-indigo-200',
                active: 'active:opacity-[0.85]',
              },
              'deep-purple': {
                border: 'border border-deep-purple-500',
                color: 'text-deep-purple-500',
                hover: 'hover:opacity-75',
                focus: 'focus:ring focus:ring-deep-purple-200',
                active: 'active:opacity-[0.85]',
              },
              purple: {
                border: 'border border-purple-500',
                color: 'text-purple-500',
                hover: 'hover:opacity-75',
                focus: 'focus:ring focus:ring-purple-200',
                active: 'active:opacity-[0.85]',
              },
              pink: {
                border: 'border border-pink-500',
                color: 'text-pink-500',
                hover: 'hover:opacity-75',
                focus: 'focus:ring focus:ring-pink-200',
                active: 'active:opacity-[0.85]',
              },
              red: {
                border: 'border border-red-500',
                color: 'text-red-500',
                hover: 'hover:opacity-75',
                focus: 'focus:ring focus:ring-red-200',
                active: 'active:opacity-[0.85]',
              },
            },
            text: {
              white: {
                color: 'text-white',
                hover: 'hover:bg-white/10',
                active: 'active:bg-white/30',
              },
              'blue-gray': {
                color: 'text-blue-gray-500',
                hover: 'hover:bg-blue-gray-500/10',
                active: 'active:bg-blue-gray-500/30',
              },
              gray: {
                color: 'text-gray-500',
                hover: 'hover:bg-gray-500/10',
                active: 'active:bg-gray-500/30',
              },
              brown: {
                color: 'text-brown-500',
                hover: 'hover:bg-brown-500/10',
                active: 'active:bg-brown-500/30',
              },
              'deep-orange': {
                color: 'text-deep-orange-500',
                hover: 'hover:bg-deep-orange-500/10',
                active: 'active:bg-deep-orange-500/30',
              },
              orange: {
                color: 'text-orange-500',
                hover: 'hover:bg-orange-500/10',
                active: 'active:bg-orange-500/30',
              },
              amber: {
                color: 'text-amber-500',
                hover: 'hover:bg-amber-500/10',
                active: 'active:bg-amber-500/30',
              },
              yellow: {
                color: 'text-yellow-500',
                hover: 'hover:bg-yellow-500/10',
                active: 'active:bg-yellow-500/30',
              },
              lime: {
                color: 'text-lime-500',
                hover: 'hover:bg-lime-500/10',
                active: 'active:bg-lime-500/30',
              },
              'light-green': {
                color: 'text-light-green-500',
                hover: 'hover:bg-light-green-500/10',
                active: 'active:bg-light-green-500/30',
              },
              green: {
                color: 'text-green-500',
                hover: 'hover:bg-green-500/10',
                active: 'active:bg-green-500/30',
              },
              teal: {
                color: 'text-teal-500',
                hover: 'hover:bg-teal-500/10',
                active: 'active:bg-teal-500/30',
              },
              cyan: {
                color: 'text-cyan-500',
                hover: 'hover:bg-cyan-500/10',
                active: 'active:bg-cyan-500/30',
              },
              'light-blue': {
                color: 'text-light-blue-500',
                hover: 'hover:bg-light-blue-500/10',
                active: 'active:bg-light-blue-500/30',
              },
              blue: {
                color: 'text-blue-500',
                hover: 'hover:bg-blue-500/10',
                active: 'active:bg-blue-500/30',
              },
              indigo: {
                color: 'text-indigo-500',
                hover: 'hover:bg-indigo-500/10',
                active: 'active:bg-indigo-500/30',
              },
              'deep-purple': {
                color: 'text-deep-purple-500',
                hover: 'hover:bg-deep-purple-500/10',
                active: 'active:bg-deep-purple-500/30',
              },
              purple: {
                color: 'text-purple-500',
                hover: 'hover:bg-purple-500/10',
                active: 'active:bg-purple-500/30',
              },
              pink: {
                color: 'text-pink-500',
                hover: 'hover:bg-pink-500/10',
                active: 'active:bg-pink-500/30',
              },
              red: {
                color: 'text-red-500',
                hover: 'hover:bg-red-500/10',
                active: 'active:bg-red-500/30',
              },
            },
          },
        },
      },
    },
  },
  plugins: [],
};
