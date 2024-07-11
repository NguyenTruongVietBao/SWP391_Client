/** @type {import('tailwindcss').Config} */


module.exports={
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          'mathcha': '#E8FFD9',
          'mathcha-green': '#59B379',
          'mathcha-orange': '#FFC067'
        },
        width: {
          '128': '32rem',
          '156': '40rem',
          '170': '50rem',
        },
        backgroundImage: {
          'login-wallpaper': "url('/assets/wallpaper-login.png')",
          'admin-wallpaper': "url('/assets/admin-wallpaper.png')"
        },
        fontFamily: { 
          "mathcha-font-1": ['Exo 2', 'sans-serif'] ,
          "mathcha-font-2": ['Plus Jakarta Sans', 'sans-serif'] ,
          "mathcha-font-3": ['Pacifico', 'cursive'] ,
          "mathcha-font-4": ['Kanit', 'sans-serif'] ,
        }
      },
    },
    plugins: [],
  }
