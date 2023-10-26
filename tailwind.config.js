/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/components/**/*.{js,ts,jsx,tsx}', './src/pages/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      height: {
        100: '25rem',
        108: '27rem',
        116: '29rem',
        136: '34rem',
        192: '48rem',
      },
      colors: {
        'nav-stripe': '#537684',
        body: '#F9B213',
        'cuckoo-brown': '#6D121E',
        'cuckoo-yellow': '#F9B213',
        'mercado-orange': '#F9A82D',
        'cuckoo-lightblue': '#91b8cc',
        vermilion: '#FA5F4E',
        'cuckoo-green':'#0a7e83',
        'navy-blue': '#0F1546',
      },
      fontFamily: {
        // montserrat: ['Montserrat'],
        YanoneKaffeesatz: ['Yanone Kaffeesatz'],
        marcellus: ['Marcellus'],
      },
    },
  },
  plugins: [],
};
